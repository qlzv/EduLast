const passwordField = document.getElementById('password');
const retypePasswordField = document.getElementById('password-1');
const send  = document.getElementById("confirm");
send.addEventListener('click', () => {
const password = passwordField.value;
const retypePassword = retypePasswordField.value;

if (password === retypePassword) {
document.getElementById('password_form').submit();
} else {
iziToast.warning({
theme : 'dark',
position : 'topRight',
drag : false,
title: Language[GetLang() || "ar"].Error_Login_Msg,
titleColor : 'black',
message: Language[GetLang() || "ar"].Error_Login_Msg2,
messageColor : 'black',
iconColor : 'red',
rtl : (GetLang() || "ar") == 'ar'
});
}
});
