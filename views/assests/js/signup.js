document.addEventListener("DOMContentLoaded", (event) => {

const sorting = document.querySelector('.selectpicker');
const sortingchoices = new Choices(sorting, {
placeholder: true,
placeholderValue : "Search For Collage",
itemSelectText: '',
searchPlaceholderValue: "Search For Collage",
position : "top",
shouldSortItems : true,
delimiter: '',
searchFields: ['value','label'],
});

let sortingClass = sorting.getAttribute('class');
window.onload= function () {
sorting.parentElement.setAttribute('class', sortingClass);
}    

const hide_view_password = document.getElementById("password-icon");
const password_input = document.getElementById("password");
const signup_button = document.getElementById("signup_button");
const email_input = document.getElementById("email");
const form = document.getElementById("login_form");
const username = document.getElementById("username");
const major = document.getElementById("major");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const collage_name = document.getElementById("collage_name");
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

username.addEventListener('input',()=>{
if(username.value !== '' && username.value.length <= 8){
username.classList.add('is-valid')
username.classList.remove('is-invalid')
}else{
username.classList.add('is-invalid')
username.classList.remove('is-valid')
}
})

major.addEventListener('input',()=>{
if(major.value !== '' && major.value.length <= 24){
major.classList.add('is-valid')
major.classList.remove('is-invalid')
}else{
major.classList.add('is-invalid')
major.classList.remove('is-valid')
}
})

first_name.addEventListener('input',()=>{
if(first_name.value !== '' && first_name.value.length <= 12){
first_name.classList.add('is-valid')
first_name.classList.remove('is-invalid')
}else{
first_name.classList.add('is-invalid')
first_name.classList.remove('is-valid')
}
})

last_name.addEventListener('input',()=>{
if(last_name.value !== '' && last_name.value.length <= 12){
last_name.classList.add('is-valid')
last_name.classList.remove('is-invalid')
}else{
last_name.classList.add('is-invalid')
last_name.classList.remove('is-valid')
}
})


signup_button.addEventListener('click',()=>{
if(password_input.value.length >= 8 && validateEmail(email_input.value) && username.value !== '' && username.value.length <= 8 && major.value !== '' && major.value.length <= 24 && first_name.value !== '' && first_name.value.length <= 12 && last_name.value !== '' && last_name.value.length <= 12 && collage_name.value !== ''){
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