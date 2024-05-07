document.addEventListener("DOMContentLoaded", (event) => {
const hide_view_password = document.getElementById("password-icon");
const password_input = document.getElementById("password");
const login_button = document.getElementById("login_button");
const email_input = document.getElementById("email");
const form = document.getElementById("login_form")
hide_view_password.addEventListener('click',()=>{
hide_view_password.classList.toggle('fa-eye');
hide_view_password.classList.toggle('fa-eye-slash');
password_input.type == 'password' ? password_input.type  = 'text' : password_input.type = 'password';
})
email_input.addEventListener('input',()=>{
if(validateEmail(email_input.value)){
email_input.classList.add('is-valid')
email_input.classList.remove("is-invalid")
}else{
email_input.classList.add("is-invalid")
email_input.classList.remove('is-valid')
}
})
password_input.addEventListener('input',()=>{
if(password_input.value !== '' && password_input.value.length >= 8){
password_input.classList.add('is-valid')
password_input.classList.remove('is-invalid')
}else{
password_input.classList.add('is-invalid')
password_input.classList.remove('is-valid')
}
})

login_button.addEventListener('click',()=>{
if(password_input.value !== '' && password_input.value.length >= 8 && validateEmail(email_input.value)){
form.submit()
}
})
});

const validateEmail = (email) => {
return String(email)
.toLowerCase()
.match(
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
};