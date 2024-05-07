const db = require('../db/db')
const bcrypt = require('bcrypt')
const validator = require('validator')
const reset = async (email,password) => {
try {
if(typeof email === 'undefined') {
console.log(`Reset Password : User With Email : '${email}' Are Trying Sql Injection`)
return { msg: 'Sql Injection' }
}
if( !validator.isEmail(email)){
console.log(`Reset Password : Wrong Email Format : '${email}'`);
return { msg: 'failed' ,why : "Wrong Email Format"}
};
const hashedPassword = await bcrypt.hash(password, 10);
await db.ResetPassword(email,hashedPassword);
return { msg: 'success' };
} catch (error) {
console.error(error);
return { msg: 'failed' };
}
};

module.exports = reset;