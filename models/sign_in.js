const db = require('../db/db')
const bcrypt = require('bcrypt')
const validator = require('validator')
const signin = async (email, password, done) => {
try {
if(typeof email === 'undefined' || typeof password === 'undefined' || email === undefined || password === undefined){
console.log(`Login : User With Email : '${email}' Are Trying Sql Injection`)
return {done:done(null, false, ''),msg: "Sql Injection"}
};
if( validator.isEmail(email) === false){
console.log(`Login : Wrong Email Format : '${email}'`);
return {done:done(null, false, ''),msg: "Wrong Email Format"}
}
const getuseremail = await db.FindUserByEmail(email)
if(getuseremail.length === 0){
console.log(`Login : User With Email : '${email}' Was Not Found`)
return {done : done(null, false, ''),msg: "Email Was Not Found"}
}
const user = await db.FindUser(getuseremail[0].userdata)
const user2 = await db.Find2User(getuseremail[0].userdata)
const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
if (!isPasswordCorrect) {
console.log(`Login : User : '${email}' Wrong Password`)
return {done:done(null, false, ''),msg: "Wrong Password"}
}
console.log(`Login : Success Login From User : '${email}'`)
return {done:done(null, user2[0]),msg:"Login Success"}
} catch (error) {
console.log("Login : An Error Happen SignIn")
return {done:done(error),msg:"An Error Happen"}
}
}
module.exports = signin;