document.addEventListener("DOMContentLoaded", function () {
var otpFields = document.querySelectorAll(".otp-form .otp-field");
var otpValueField = document.querySelector(".otp-form .otp-value");

otpFields.forEach(function (field, index) {
field.addEventListener("input", function (e) {
this.value = this.value.replace(/[^0-9]/g, "");
var otpValue = Array.from(otpFields)
.map(function (field) {
return field.value;
})
.filter(function (value) {
return value !== "";
})
.join("");
otpValueField.value = otpValue;
});

field.addEventListener("keyup", function (e) {
var key = e.keyCode || e.charCode;
if (
key === 8 ||
key === 46 ||
key === 37 ||
key === 40
) {
// Backspace or Delete or Left Arrow or Down Arrow
var previousField =
index > 0
? otpFields[index - 1]
: otpFields[otpFields.length - 1];
previousField.focus();
} else if (
key === 38 ||
key === 39 ||
field.value !== ""
) {
// Right Arrow or Top Arrow or Value not empty
var nextField =
index < otpFields.length - 1
? otpFields[index + 1]
: otpFields[0];
nextField.focus();
}
});

field.addEventListener("paste", function (e) {
e.preventDefault();
var pasteData = (
e.clipboardData || window.clipboardData
).getData("text");
var pasteDataSplitted = pasteData.split("");
pasteDataSplitted.forEach(function (value, index) {
if (otpFields[index]) {
otpFields[index].value = value;
}
});
});
});

// Set initial focus on the first input field
otpFields[0].focus();
});
