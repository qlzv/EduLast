const form = document.getElementById("form_contact");
form.addEventListener('submit', async (event) => {
event.preventDefault(); 

if (!form.checkValidity()) {
event.stopPropagation();
form.classList.add('was-validated');
return;
}

var name = document.querySelector('input[name="name"]').value;
var subject = document.querySelector('input[name="subject"]').value;
var message = document.querySelector('input[name="message"]').value;

var formData = new URLSearchParams();
formData.append('name', name);
formData.append('subject', subject);
formData.append('message', message);

fetch('/contact', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
},
body: formData.toString(),
})
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response;
})
.then(() =>{
iziToast.success({
theme : 'dark',
position : 'topRight',
drag : false,
title: Language[GetLang() || "ar"].Alert_Msg,
titleColor : 'black',
message: Language[GetLang() || "ar"].Alert_Msg_Msg_Send,
messageColor : 'black',
iconColor : 'red',
rtl : (GetLang() || "ar") == 'ar'
});
})
.catch(() => {
iziToast.warning({
theme : 'dark',
position : 'topRight',
drag : false,
title: Language[GetLang() || "ar"].Alert_Msg,
titleColor : 'black',
message: Language[GetLang() || "ar"].Alert_Msg_Error,
messageColor : 'black',
iconColor : 'red',
rtl : (GetLang() || "ar") == 'ar'
});
})
.finally(() => form.reset());
});