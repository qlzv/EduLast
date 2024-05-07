const db = require('../db/db')
const bcrypt = require('bcrypt')
const validator = require('validator')

const signup = async (email, password, user_name, f_name, l_name, major, collage,uni_id) => {
try {
if(typeof email === 'undefined' || typeof password === 'undefined' || typeof user_name === 'undefined' || typeof f_name === 'undefined' || typeof l_name === 'undefined' || typeof major === 'undefined' || typeof collage === 'undefined'){
console.log(`Signup : User With Email : '${email}' Are Trying Sql Injection`)
return { msg: 'Sql Injection' }
};
if( !validator.isEmail(email)){
console.log(`Signup : Wrong Email Format : '${email}'`);
return { msg: 'failed' ,why : "Wrong Email Format"}
};
const hashedPassword = await bcrypt.hash(password, 10);
await db.RegisterUser(email, user_name, f_name, l_name, major, hashedPassword, collage);
console.log(`Signup : Success Signup From User : '${email}'`)
return { msg: 'success' };
} catch (error) {
console.log(`Signup : Error Happen SignUp`)
return { msg: 'failed' };
}
};

module.exports = signup;