const express = require('express');
const path = require('path')
require('dotenv').config();
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('../db/db')
const Strategy = require('passport-local').Strategy
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const crypto = require('crypto')
const validator = require('validator')
const app = express();
const port = process.env.PORT || 3001;
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../views')));
app.set('trust proxy', 1)
app.use(session({
secret: process.env.SESSION_SECRET,
saveUninitialized: true,
resave:false,
store: new MemoryStore({
checkPeriod: 86400000, 
}),
cookie:{
maxAge : 1000*60 * 60 * 24 * 7,
secure:true,
httpOnly:true,
sameSite: true,
}
}))

app.use(passport.initialize())
app.use(passport.session())
const formParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.disable("x-powered-by");




app.use(rateLimit({
windowMs: 15 * 60 * 1000, 
max: process.env.MAX_REQUESTS 
}));

app.use(cookieParser());
const signin = require('./sign_in')
const signup = require('./sign_up');
const reset_password = require('./reset_password');
const email_to = require("./email")
const readAndProcessFile = require("./read_file")
const deleteEntryById = require('./delete_by_id')
const get_uni_by_id = require('./uni_handle')
const RedirectTo = [];
const Tokens = [];
const Emails = [];
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});

passport.use(new Strategy({
usernameField: 'email',
passwordField: 'password',
}, async (email, password, done) => {
signin(email, password, done)
}))

passport.serializeUser(async(user, done) => {
done(null, user)
})

passport.deserializeUser(async (id, done) => {
try {
const user = await db.Find2User(id.user_id)
done(null, user)
} catch (error) {
done(error)
}
})




app.get('/return_lang',async(req,res)=>{
try{
if(!req.isAuthenticated()) return res.status(200).send("undefined");
const user_data = req.user[0].language;
return res.status(200).send(user_data);
}catch(error){
console.error('An error occurred:', error.message)
}
})



app.get('/', async(req, res) => {
try{
res.render(path.join(__dirname, '../views/index'),{isAuthenticated : req.isAuthenticated()});
}catch(error){
console.error('An error occurred:', error.message)
}
});


app.get('/login', async (req, res) => {
if(req.isAuthenticated()){
return res.redirect('/')
}
try{
res.render(path.join(__dirname, '../views/login/login'),{error:false})
}catch(error){
console.error('An error occurred:', error.message)
}
})

app.post('/login',formParser, async(req, res, next) => {
passport.authenticate('local', (err, user, info) => {
if (err) {
return next(err);
}
if (!user) {
return res.render(path.join(__dirname, '../views/login/login'), { error: true });
}
req.logIn(user, (err) => {
if (err) {
return next(err);
}
const returnTo = RedirectTo[req.cookies.session] || '/';
return res.redirect(returnTo);
});
})(req, res, next);
});


app.get('/signup', async (req, res) => {
if(req.isAuthenticated()){
return res.redirect('/')
}
try{
res.render(path.join(__dirname, '../views/signup/signup'))
}catch(error){
console.error('An error occurred:', error.message)
}
})

app.post('/signup',formParser,async(req,res)=>{
if(req.isAuthenticated() || !req.body){
return res.status(400).json({msg:"Something Goes Wrong Try Again Later"})
}
if(typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.username === 'undefined'){
return res.status(400).json({msg:"Something Goes Wrong Try Again Later"})
}
try{
const isVaildEmail = validator.isEmail(req.body.email);
const IsEmailExist = await db.FindUserByEmail(req.body.email);
const IsPasswordValid = (req.body.password).length >= 8;
const IsUserNameExist = await db.FindUserByUsername(req.body.username);
const IsValidUserName = (req.body.username).length <= 8;
if(!isVaildEmail || IsEmailExist.length > 0 || !IsPasswordValid || IsUserNameExist.length > 0 || !IsValidUserName){
return res.status(400).json({msg:"Something Wrong Happen"})
}
const {email,password,username,first_name,last_name,major,collage} = req.body;
const uni_id = get_uni_by_id.RetuenUniverstyid(collage)
signup(email,password,username,first_name,last_name,major,collage,uni_id)  .then(async(response) => {
if(response.msg == 'success'){
await email_to(email,'New Account','https://shorturl.at/bfmVY','https://shorturl.at/lU348','You Created A New Account',`We have sent you this email in response to your request to Create ccount ${new Date()}`,`${email}`,'Feel Free To Contact Us').then(()=>{
return res.redirect('/login')
});
}else{
return res.redirect('/signup')
}
})
}catch(error){
console.error('An error occurred:', error.message)
}
})


app.get('/account',async(req,res)=>{
if(!req.isAuthenticated() ){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
const UserData = await db.GetUserData(req.user[0].user_id);
const AccountAge = await db.GetAccountAge(req.user[0].user_id);
const ExamCount = await db.GetExamCount(req.user[0].user_id);
const ExamStatus = await db.GetExamStatus(req.user[0].user_id);
res.render(path.join(__dirname, '../views/account/index'),{Userdata:UserData[0],age : AccountAge[0].years_since_creation,exam_count : ExamCount[0].exams_count,ExamStatus : ExamStatus[0]})
}catch(error){
console.error('An error occurred:', error.message)
}
})


app.get('/logout', async (req, res, next) => {
req.logout((err) => {
if(err){
next(err)
}
res.redirect('/')
})
})
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload_img',upload.single('image'),async(req,res)=>{
if(!req.isAuthenticated()){
return res.redirect('/')
}
try {
const stream = cloudinary.uploader.upload_stream(
{ resource_type: 'auto', folder: 'sample' },
async (error, result) => {
if (error) {
console.error('An error occurred:', error.message)
}
await db.UpdateUserPhoto(req.user[0].user_id,result.url);
return res.status(200).json(result);
}
);
stream.end(req.file.buffer);
} catch (error) {
console.error('Error uploading to Cloudinary:', error);
return res.status(500).json({msg:'Internal Server Error'});
}
})

app.post('/upadte_profile',formParser,async(req,res)=>{
if(!req.isAuthenticated() || !req.body){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
if(typeof req.body.username === 'undefined' || typeof req.body.firstname === 'undefined' || typeof req.body.lastname === 'undefined'){
return res.status(204).json({msg:"Something Wrong Happen"})
}
try{
const IsValidUserName = await db.FindUserByUsername(req.body.username);
const UserNameLength = (req.body.username).length <= 8;
const FirstNameLength = (req.body.firstname).length <= 12;
const LastNameLength = (req.body.lastname).length <= 12;
if(!IsValidUserName || !UserNameLength || !FirstNameLength || !LastNameLength){
return res.status(204).json({msg:"Something Wrong Happen"})
}
const {firstname,lastname,username} = req.body;
await db.UpdateUserInfo(firstname,lastname,username,req.user[0].user_id);
return res.status(204).send()
}catch(error){
console.error('An error occurred:', error.message)
}
})


app.post('/update_lang',async(req,res)=>{
if(!req.isAuthenticated() || !req.body){
return res.redirect('/')
}
if(typeof req.body.language === 'undefined'){
return res.status(204).json({msg:"Something Wrong Happen"})
}
try{
await db.UpdateUserLanguage(req.user[0].user_id,req.body.language);
}catch(error){
console.error(error)
}
})



app.get('/view_exams',async(req,res)=>{
if(!req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
const results = await readAndProcessFile('./Test.json');
let data = [];
results.forEach((exam,index) => {
data.push(Object.keys(results[index]));
});


res.render(path.join(__dirname, '../views/view_exams/index'),{Exams:data,isAuthenticated : req.isAuthenticated()})
}catch(error){
console.error('An error occurred:', error.message)
}
})
app.get('/exams', async (req, res) => {
if (!req.isAuthenticated()) {
RedirectTo[req.cookies.session] = req.originalUrl;
return res.redirect('/login');
}

if (!req.query.section) {
console.log('Provide Query');
return res.redirect('/view_exams');
}

try {
const results = await readAndProcessFile('./Test.json');
const requestedSection = req.query.section.trim();
const UserData = await db.GetUserData(req.user[0].user_id);
const User_University = UserData[0].collage_id;

const filteredExams = results.flatMap(subject => 
subject && subject[requestedSection] ? subject[requestedSection].filter(exam => exam.for === User_University) : []
);

if (filteredExams.length === 0) {
console.log(`No exams for section ${requestedSection} found for the university.`);
return res.status(204).json(false);
}

const IsExamTaken = await Promise.all(filteredExams.map(exam => db.FindExamById(exam.id, req.user[0].user_id)));

res.render(path.join(__dirname, '../views/exams/index'), {
Exam: requestedSection,
Results: filteredExams,
IsExamTaken: IsExamTaken.some(result => result.length > 0),
TakenData: IsExamTaken,
isAuthenticated: req.isAuthenticated()
});

} catch (error) {
console.error('Error processing the file:', error);
}
});
async function searchById(filePath, id) {
id = parseInt(id);

try {
const data = await readAndProcessFile(filePath);

for (const subject of data) {
for (const item of subject[Object.keys(subject)[0]]) {
if (item.id === id) {
return item;
}
}
}

return null; 
} catch (error) {
console.error('Error searching by ID:', error);
throw error;
}
}



app.get('/attend_exam',async(req,res)=>{
if(!req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
if(req.query.exam_id){
try{

var exam_result = await searchById('./Test.json',req.query.exam_id)
if(!exam_result) res.redirect('/');
res.render(path.join(__dirname, '../views/attend_exam/index'),{data:exam_result})
}catch(error){
console.error('An error occurred:', error.message)
}
}else{
res.redirect('/')
}    
})


app.post('/submit_mark',async(req,res)=>{
if(!req.isAuthenticated())return res.status(400).json({msg:"Something Went Wrong"});
if(!req.body) return res.status(400).json({msg:"Something Went Wrong"});
if(typeof req.body.exam_id === 'undefined' || typeof req.body.mark === 'undefined')return res.status(400).json({msg:"Something Went Wrong"});
try{
const Check_Taken = await db.FindExamById(req.body.exam_id,req.user[0].user_id)
if(Check_Taken.length <= 0){
await db.UserAddSubmitExam(req.body.exam_id,req.user[0].user_id,req.body.mark,req.body.full_mark)
}else{
await db.UserUpdateExam(req.user[0].user_id,req.body.exam_id,req.body.mark)
}

}catch(error){
console.error('An error occurred:', error.message)
}
})

app.get('/admin',async(req,res)=>{
if(!req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
const IsAdmin = await db.CheckIsAdmin(req.user[0].user_id)
if(IsAdmin.length > 0){
const AdminData = {
name : req.user[0].username,
total_users : await db.GetUserCount(),
total_users_last : await db.GetUserCountLastMonth(),
total_exams : await readAndProcessFile('./Test.json'),
total_admin : await db.GetAdminCount(),
admins : await db.GetAdmins(),
top_universties : await db.TopUniversties(),
exams : await readAndProcessFile('./Test.json')
}
res.render(path.join(__dirname, '../views/admin/index'),{AdminData})
}else {
return res.redirect('/');
}
}catch(error){console.error('An error occurred:', error.message)}
})

app.post('/add_admin',async(req,res)=>{
if(!req.isAuthenticated() || !req.body) return res.status(400).json({msg:"Something Went Wrong req.body or auth"});
if(typeof req.body.email === 'undefined') return res.status(400).json({msg:"Something Went Wrong not defined"});
try{
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0) return res.status(400).json({msg:"Something Went Wrong not admin"});
const GetByEmail = await db.FindUserByEmail(req.body.email);
if(GetByEmail.length > 0){
const IsAdmin = await db.CheckIsAdmin(GetByEmail[0].userdata);
if(IsAdmin.length <= 0){
await db.InsertAdmin(GetByEmail[0].userdata).then(async()=>{
return res.status(200).json({data: await db.GetUserData(GetByEmail[0].userdata)})
})
}
}
}catch (error){
console.error('An error occurred:', error.message)
}
})


app.post('/delete_admin',async(req,res)=>{
if(!req.isAuthenticated()) return res.status(400).json({msg:"Something Went Wrong"});
if(!req.body) return res.status(400).json({msg:"Something Went Wrong"});
if(typeof req.body.id === 'undefined') return res.status(400).json({msg:"Something Went Wrong"});
try{
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0) return res.status(400).json({msg:"Something Went Wrong"});
const IsAdmin = await db.CheckIsAdmin(req.body.id);
if(IsAdmin.length > 0 && req.user[0].user_id == 11){
await db.DeleteAdmin(req.body.id).then(()=>{
return res.status(200).send();
})
}
}catch(error){
console.error('An error occurred:', error.message)
}
})






app.post('/delete_exam',async(req,res)=>{// !TODO Check IsAdmin
if(!req.isAuthenticated()) return res.status(400).json({msg:"Something Went Wrong"});
if(!req.body) return res.status(400).json({msg:"Something Went Wrong"});
if(typeof req.body.section === 'undefined' || typeof req.body.id === 'undefined')return res.status(400).json({msg:"Something Went Wrong"});
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0 || req.user[0].user_id !== 11) return res.status(400).json({msg:"Something Went Wrong"});
try{
await deleteEntryById(req.body.section,req.body.id)
res.status(200).json({msg:"Succc"});
}catch(error){
console.error('An error occurred:', error.message)
}

})


app.get('/get_sections',async(req,res)=>{// !TODO Check IsAdmin
if(!req.isAuthenticated()) return res.status(400).json({msg:"Something Went Wrong"});
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0) return res.status(400).json({msg:"Something Went Wrong"});
try{
const data  = await readAndProcessFile('./Test.json');
var data_array = [];
for(sub of data){
data_array.push(Object.keys(sub)[0])
}
res.status(200).json(data_array)
}catch(error){
console.error('An error occurred:', error.message)
}
})

app.post('/add_exam', async (req, res) => { // !TODO Check IsAdmin

if (!req.isAuthenticated()) {
return res.status(401).send('Unauthorized');

}
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0) return res.status(401).send('Unauthorized');
const exam_obj = {
id: Math.floor(100000 + Math.random() * 900000),
name: req.body.exam_data.exam_name,
for: get_uni_by_id.RetuenUniverstyid(req.body.exam_data.for_who),
questions:  req.body.questionGroups.map(responseQuestion => ({
question_string: responseQuestion.question_string,
Is_Image : responseQuestion.choices.answer.includes('https'),
choices: {
correct: responseQuestion.choices.answer,
wrong: responseQuestion.choices.wrong
},
}))
};

try{
const filePath = './Test.json';
const jsonData = fs.readFileSync(filePath, 'utf8');
let data = JSON.parse(jsonData);
const sectionIndex = data.findIndex(section => Object.keys(section)[0] === req.body.exam_data.exam_section
);
if (sectionIndex !== -1) {
data[sectionIndex][req.body.exam_data.exam_section
].push(exam_obj); 
} else {

console.error(`Section ${req.body.exam_data.exam_section
} not found.`);
}
const updatedJsonData = JSON.stringify(data, null, 2);
fs.writeFileSync('./Test.json', updatedJsonData, 'utf8');


res.status(200).send('Exam added successfully');
}catch(error){
console.error('An error occurred:', error.message)
}
});

app.get('/forget-password',async(req,res)=>{
if(req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
res.render(path.join(__dirname, '../views/forget-password/index'))
}catch(error){
console.error('An error occurred:', error.message)
}
})


function generateCode() {
return Math.floor(100000 + Math.random() * 900000);
}


const codes = new Map();

app.post('/forget_password',formParser, async (req, res) => {
if(!req.body || req.isAuthenticated()) return res.status(400).json({msg:"Something Went Wrong"});
if(!req.body.email || typeof req.body.email === 'undefined'){
console.log("Email is not provided")
return res.status(400).json({ error: 'Email is required' });
}
const GetByEmail = await db.FindUserByEmail(req.body.email);
if(GetByEmail.length > 0){
try{
const { email } = req.body;
if (!validator.isEmail(email)) {
return res.status(400).json({ error: 'Invalid email address' });
}
const code = generateCode();
const expirationTime = Date.now() + 5 * 60 * 1000;
codes.set(email, { code, expirationTime });
await email_to(email,'Your OTP Code','https://shorturl.at/bfmVY','https://shorturl.at/lU348','Your OTP Code',`We have sent you this email in response to your request to reset your password on ${new Date()}`,`${code}`,'Feel Free To Contact Us').then(()=>{
res.status(200).render(path.join(__dirname, '../views/valid_code/index'))
});
}catch(error){
console.error('An error occurred:', error.message)
}
}else{
return res.status(400).json({msg:"Something Went Wrong"});
}
});

app.post('/check_code', formParser, async (req, res) => {
if (!req.body || req.isAuthenticated()) return  res.status(400).json({ msg: "Something Went Wrong" });

try {
const { email, code } = req.body;

if (typeof email === 'undefined' || typeof code === 'undefined') {
return res.status(400).json({ msg: "Something Went Wrong" });
}

if (!validator.isEmail(email)) {
return res.status(400).json({ msg: "Something Went Wrong" });
}

if (codes.has(email)) {
const storedCode = codes.get(email);
const parsedCode = parseInt(code.join(""));

if (parsedCode === storedCode.code) {
if (Date.now() <= storedCode.expirationTime) {
crypto.randomBytes(16, function (err, buffer) {
const token = buffer.toString('hex') + email;
Tokens[req.cookies.session] = token;
Emails[req.cookies.session] = email;
return res.status(200).render(path.join(__dirname, '../views/reset_password/index'), { token: token, email: email });
});
} else {
res.status(400).json({ error: 'Code has expired' });
}
} else {
res.status(400).json({ error: 'Invalid code' });
}
} else {
res.status(400).json({ error: 'Email not found' });
}
} catch (error) {
console.error('An error occurred:', error.message)
res.status(500).json({ error: 'An error occurred' });
}
});



app.post('/reset_password',formParser,async(req,res)=>{
if(!req.body || req.isAuthenticated()) return  res.status(400).json({ msg: "Something Went Wrong" })
if (typeof req.body.token === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.password2 === 'undefined') {
return res.status(400).json({ msg: "Something Went Wrong" });
}
try{
const {token, password,password2} = req.body;
if(token == Tokens[req.cookies.session] && password == password2 && Emails[req.cookies.session]){

await reset_password(Emails[req.cookies.session],password).then(async(response)=>{
if(response.msg == 'success'){
res.redirect('/login');
await email_to(Emails[req.cookies.session],'Your Password Has Been Changed','https://shorturl.at/bfmVY','https://shorturl.at/lU348','Your Password Has Been Updated',`We have sent you this email Your Password Has Been Updated On : ${new Date()}`,`Support Team`,'Feel Free To Contact Us')
}
})
}else{
res.redirect("/")
}
}catch(error){
console.error(error)
}
})


app.get('/contact',async(req,res)=>{
if(!req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
res.status(200).render(path.join(__dirname, '../views/contact/index'),{isAuthenticated : req.isAuthenticated()})
}catch(error){
console.error(error)
}
})


app.post('/contact',formParser,async(req,res)=>{
if(!req.isAuthenticated() || !req.body){
return res.redirect('/');
}
if(typeof req.body.name === 'undefined' || typeof req.body.subject === 'undefined' || typeof req.body.message === 'undefined') return res.status(400).json({ msg: "Something Went Wrong" });
try{
const {name,subject,message} = req.body; // ! TODO : Style And Add Info To Message
await email_to('support@repixel-agency.com',`New Message From : ${name}`,'https://shorturl.at/bfmVY','https://shorturl.at/lU348',`${subject}`,`${message}`,`Support Team`,'Feel Free To Contact Us').then(()=>{
return res.status(204).json({msg:"Sucess"})
})
}catch(error){
console.error('An error occurred:', error.message)
return res.status(400).json({ msg: "Something Went Wrong" });
}
})

app.get('/about',async(req,res)=>{

try{
res.status(200).render(path.join(__dirname, '../views/about/index'),{isAuthenticated : req.isAuthenticated()})
}catch(error){
console.error(error)
}
})


app.get('/faqs',async(req,res)=>{
if(!req.isAuthenticated()){
RedirectTo[req.cookies.session]= req.originalUrl;
return res.redirect('/login');
}
try{
res.status(200).render(path.join(__dirname, '../views/faqs/index'),{isAuthenticated : req.isAuthenticated()})
}catch(error){
console.error(error)
}  
})




app.get('/uni',async(req,res)=>{
if(!req.isAuthenticated()) return res.status(400).json({msg:"Something Went Wrong"});
const IsUserAdmin = await db.CheckIsAdmin(req.user[0].user_id);
if(IsUserAdmin <= 0) return res.status(400).json({msg:"Something Went Wrong"});
try{
const universitiesArray = Object.keys(get_uni_by_id.Universities);
return res.status(200).json(universitiesArray)
}catch(error){
console.error(error)
return res.status(400)
}
})

app.use((req, res, next) => { 
try{
res.status(404).render(path.join(__dirname, '../views/404/index'),{isAuthenticated: req.isAuthenticated() })
}catch(error){
console.error('An error occurred:', error.message)
}
}) 

app.listen(port, async() => {
console.log('\x1b[36m',`We Are Listening On http://edu.repixel-agency.com:${port}`,'\x1b[0m');
});