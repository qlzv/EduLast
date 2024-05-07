const mysql = require('mysql');
require('dotenv').config();
const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
connectionLimit: 10, 
});

class DbQueries {
constructor() {
this.checkDatabaseConnection();
}
checkDatabaseConnection() {
pool.getConnection((err, connection) => {
if (err) {
console.error('Error connecting to the database');
} else {
console.log('\x1b[36m','Connected to the database','\x1b[0m');
connection.release();
}
});
}
async executeQuery(sql, params) {
return new Promise((resolve, reject) => {
pool.escape(sql)
pool.query(sql, params, (error, results) => {
if (error) {
console.error('Error executing query:', error);
reject(error);
} else {
resolve(results);
}
});
});
}

async ReturnDate() {
return new Date().toLocaleDateString('en-US');
}

async FindUserByEmail(email) {
const sql = 'SELECT user_id AS userdata FROM users WHERE email = ?';
const params = [email];
return this.executeQuery(sql, params);
}

async CheckIsAdmin(user_id){
const sql = `SELECT * FROM admin_users WHERE user_id = ?`
const params = [user_id];
return this.executeQuery(sql,params);
}

async ResetPassword(email,password){
const sql = `UPDATE users SET password = ? WHERE email = ?`;
const params = [password,email];
return this.executeQuery(sql,params);
}

async FindUserByUsername(username) {
const sql = 'SELECT * FROM users WHERE username = ?';
const params = [username];
return this.executeQuery(sql, params);
}

async FindUser(id) {
const sql = 'SELECT * FROM users WHERE user_id = ?';
const params = [id];
return this.executeQuery(sql, params);
}

async Find2User(id) {
const sql = 'SELECT `user_id`, `username`, `email`, `first_name`, `last_name`, `collage_name`, `profile_img`, `role`, `language`, `user_avarge`, `major`, `created_at` FROM `users` WHERE  `user_id`=?';
const params = [id];
return this.executeQuery(sql, params);
}
async RegisterUser(email, username, firstname, lastname, major, password ,collage_name,uni_id) {
const sql =
'INSERT INTO users (email,password,username,first_name,last_name,major,collage_name,collage_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
const params = [email, password, username, firstname, lastname,major,collage_name,uni_id];
return this.executeQuery(sql, params);
}


async GetUserData(user_id){
const sql = `SELECT email,first_name,last_name,username,collage_name,collage_id,profile_img,major,language,role,created_at FROM users WHERE user_id = ?`
const params = [user_id];
return this.executeQuery(sql,params)  
}

async GetAccountAge(user_id){
const sql = `SELECT created_at AS time, TIMESTAMPDIFF(YEAR, created_at, NOW()) AS years_since_creation FROM users WHERE user_id = ?`;
const params = [user_id];
return this.executeQuery(sql,params)
}

async GetExamCount(user_id){
const sql = `SELECT COUNT(*) AS exams_count FROM user_exams WHERE user_id = ?`;
const params = [user_id];
return this.executeQuery(sql,params);
}

async GetExamStatus(user_id){
    const sql = `SELECT
    user_id,
    COUNT(CASE WHEN user_grade >= full_grade * 0.5 THEN 1 END) AS passed_exams,
    COUNT(CASE WHEN user_grade < full_grade * 0.5 THEN 1 END) AS failed_exams,
    AVG(user_grade) AS average_grade
FROM
    user_exams WHERE user_id = ?`;
    const params = [user_id];
    return this.executeQuery(sql,params)
}

async UpdateUserPhoto(user_id,img){
const sql = `UPDATE users SET profile_img = ? WHERE user_id = ?`;
const params = [img,user_id];
return this.executeQuery(sql,params)
}

async UpdateUserInfo(first_name,last_name,username,user_id){
const sql = `UPDATE users SET first_name = ?, last_name = ?, username = ? WHERE user_id = ?`;
const params = [first_name,last_name,username,user_id];
return this.executeQuery(sql,params);
}

async UpdateUserLanguage(user_id,language){
const sql = `UPDATE users SET language = ? WHERE user_id = ?`;
const params = [language,user_id];
return this.executeQuery(sql,params)
}

async FindExamById(exam_id,user_id){
const sql = `SELECT exam_id, user_grade, full_grade, taken_at FROM user_exams WHERE user_id = ? AND exam_id = ?`
const params = [user_id,exam_id];
return this.executeQuery(sql,params);
}

async UserAddSubmitExam(exam_id,user_id,user_grade,full_grade){
const sql ='INSERT INTO user_exams (exam_id,user_id,user_grade,full_grade) VALUES (?, ?, ?, ?)';
const params = [exam_id,user_id,user_grade,full_grade];
return this.executeQuery(sql, params);
}

async UserUpdateExam(user_id,exam_id,user_grade){
const sql = `UPDATE user_exams SET user_grade = ? WHERE user_id = ? AND exam_id = ?`;
const params = [user_grade,user_id,exam_id];
return this.executeQuery(sql,params);
}


async GetUserCount(){
const sql = `SELECT COUNT(*) AS total_users FROM users`;
return this.executeQuery(sql);
}


async GetUserCountLastMonth(){
const sql = `SELECT COUNT(*) AS total_users FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`;
return this.executeQuery(sql);
}

async GetAdminCount(){
const sql = `SELECT COUNT(*) AS total_admin FROM admin_users`;
return this.executeQuery(sql);
}

async GetAdmins(){
const sql = 'SELECT admin_users.*, users.created_at,users.first_name,users.last_name,users.email FROM admin_users ' + 'JOIN users ON admin_users.user_id = users.user_id ' ;
return this.executeQuery(sql);     
}

async TopUniversties(){
const sql = `SELECT collage_name, COUNT(*) AS count_collage FROM users GROUP BY collage_name ORDER BY count_collage DESC LIMIT 5`;
return this.executeQuery(sql)
}

async InsertAdmin(user_id){
const sql = `INSERT INTO admin_users (user_id) VALUES(?)`;
const params = [user_id];
return this.executeQuery(sql,params);
}

async DeleteAdmin(user_id){
const sql = `DELETE FROM admin_users WHERE user_id = ?`;
const params = [user_id];
return this.executeQuery(sql,params);
}

}

module.exports = new DbQueries();
