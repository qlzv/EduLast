const input_element = document.querySelector('.search-form input');
const elements = document.querySelectorAll('.course-name');
const not_found_element = document.getElementById('not-found');
const categories_button = document.querySelectorAll('.category_button');
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

categories_button.forEach(function(element){
element.addEventListener('click',function (event) { 
const course_name = element.parentElement.childNodes[3].textContent.toLowerCase().replace(/\(\d+\)/, '').trim()
const url = 'http://127.0.0.1:5500/exams/';
window.location.href = `${url}?course_name=${course_name}`;
})
})
