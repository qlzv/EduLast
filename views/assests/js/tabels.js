document.addEventListener('DOMContentLoaded', function () {

var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
tooltips.forEach(function (tooltip) {
new bootstrap.Tooltip(tooltip)
});


const add_button = document.getElementById("add_button");
const delete_admin_button = document.querySelectorAll("#delete_admin")
add_button.addEventListener("click",async function(e) {

Swal.fire({
title: Language[GetLang() ||"ar"].Admin_Dashboard_MangeAdmins_Add_Admin_Text,
html: `
<input type="text" id="email" class="swal2-input" placeholder="${Language[GetLang()||"ar"].Admin_Dashboard_MangeAdmins_Add_Admin_Email_Text}">`,
confirmButtonText: Language[GetLang()||"ar"].Admin_Dashboard_MangeAdmins_Add_Admin_Button,
focusConfirm: false,
didOpen: () => {
const popup = Swal.getPopup()
emailInput = popup.querySelector('#email')
emailInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
},
preConfirm: () => {
const email = emailInput.value
if (!email ) {
Swal.showValidationMessage(Language[GetLang()||"ar"].Admin_Dashboard_MangeAdmins_Add_Admin_Warning)
}
return { email }
},
}).then(async(res)=>{
if(res.value){
await fetch('/add_admin',{
method : "POST",
headers: {
'Content-Type': 'application/json'
},
body : JSON.stringify({email : res.value.email}),
})  .then(function (response) {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(function (responseJson) {

const dateObject = new Date(responseJson.data[0].created_at);
const formattedDate = Number(dateObject.getMonth() + 1) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear();
const data = `<tr>
<td>#</td>
<td>${responseJson.data[0].first_name + " " + responseJson.data[0].last_name}</td>
<td>${responseJson.data[0].email}</td>

<td>${formattedDate}</td>
<td>
<button id = "delete_admin" class="delete" data-toggle="tooltip" data-bs-toggle="tooltip" data-bs-title="Delete">
<i class="fa-solid fa-trash-can">&#xE254;</i>
</button> 
</td>
</tr>`
document.getElementById("table-data").insertAdjacentHTML("beforeend", data);
})
}
})
})


delete_admin_button.forEach(button=>{
button.addEventListener("click",(e)=>{
const id = Number(button.getAttribute("data-admin"))
fetch('/delete_admin',{
method :"POST",
headers: {
'Content-Type': 'application/json'
},
body : JSON.stringify({id : id}),
})  .then(function (response) {
if (!response.ok) {
return console.log('Network response was not ok');
}
button.parentElement.parentElement.remove();
})
})
})






function validateForms() {
const examNameInput = document.getElementById('exam_name');
const examSectionSelect = document.getElementById('exam_section');

if (!examNameInput.value.trim() || !examSectionSelect.value.trim()) {
return false;
}

const questions = document.querySelectorAll('.question');
for (const question of questions) {
const inputs = question.querySelectorAll('input');
for (const input of inputs) {
if (input.type !== 'button' && !input.value.trim()) {
return false;
}
}
}
return true;
}


const delete_exam_button = document.querySelectorAll("#delete_exam");
delete_exam_button.forEach(button => {
button.addEventListener("click", (e) => {
fetch("/delete_exam", {
method: "POST",
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ id: Number(button.getAttribute('data-exam')), section: button.getAttribute("data-section") }),
}).then(function (response) {
if (!response.ok) {
return console.log('Network response was not ok');
}
return response.json();
}).then(function (responseJson) {
bootstrap.Tooltip.getInstance(button).hide()
button.parentElement.parentElement.remove() 

})
});
});
});