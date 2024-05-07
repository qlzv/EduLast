
const input_element = document.querySelector('.search-form input');
const elements = document.querySelectorAll('.course-name');
const not_found_element = document.getElementById('not-found');
const take_exam_button = document.querySelectorAll('.take-test');
input_element.addEventListener("input", (event) => {
let found = false;
elements.forEach(function(element) {
if (element.textContent.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
element.parentElement.parentElement.parentElement.style.display = "";
found = true;
} else {
element.parentElement.parentElement.parentElement.style.display = "none";
}
});
if (found) {
not_found_element.classList.remove('d-flex');
not_found_element.classList.add('d-none');
} else {
not_found_element.classList.remove('d-none');
not_found_element.classList.add('d-flex');
}
});



class Exams {
constructor(course_name){
this.course_name = course_name;
} 
async TakeExam () {
const url = 'http://127.0.0.1:5500/attend_exam/';
window.location.href = `${url}?course_name=${this.course_name}`;
};
async RetakeExam() {
// request to backend to get exam details and render it to retake it
}
}

take_exam_button.forEach(function (element) {
element.addEventListener('click',async function(){
const course_name = element.parentElement.childNodes[5].textContent.toLowerCase();
const button_text = element.textContent.toLowerCase().replace(" ", "").trim();
const Exam = new Exams(course_name);
switch (button_text) {
case "taketest":
await Exam.TakeExam();
break;
case "retaketest" :
await Exam.RetakeExam();
break;
default :

// to do
break;
}
});
});