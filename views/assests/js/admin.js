document.addEventListener("DOMContentLoaded", async(event) => {

const getDataResponse  = await fetch('/get_sections',{method:"GET"})
let Section_data;
if (getDataResponse.ok) {
const getData = await getDataResponse.json();
Section_data = getData
} else {
console.error('Failed to fetch data:', getDataResponse.status, getDataResponse.statusText);
}
document.getElementById("exam_section").innerHTML = Section_data.map(section => `<option value="${section}">${section}</option>`).join('')

const Uni_Response = await fetch('/uni',{method:"GET"})
let uni_data;
if(Uni_Response.ok){
const get_data = await Uni_Response.json();
uni_data = get_data
}else{
console.error('Failed to fetch data:', getDataResponse.status, getDataResponse.statusText);
}
document.getElementById("exam_for_which").innerHTML = uni_data.map(section => `<option value="${section}">${section}</option>`).join('')



let finsh_button = document.getElementById("finsh_button")
const add_choice_button = document.getElementById("add_choice");
const wrong_choices = document.getElementById("wrong_choices");
const add_question = document.getElementById("add_question");






add_choice_button.addEventListener("click",(event)=>{
event.preventDefault()
const choice_creation = document.createElement("input");

choice_creation.id = 'exam_choices'
choice_creation.setAttribute("type", "text");

choice_creation.setAttribute("placeholder", String.fromCharCode(65 + wrong_choices.children.length) + ')');

choice_creation.classList.add("w-75");
choice_creation.classList.add('mx-auto');
choice_creation.classList.add('form-control');
choice_creation.classList.add('mb-3');
wrong_choices.appendChild(choice_creation)
});

let num_question = 1;
add_question.addEventListener("click",(event)=>{
event.preventDefault()
num_question++;
const cloned_dev = `<div class="border-top border-bottom">
<label for="switch_question_images">
<h5 class="mt-3">Question Have Image ?</h5>
</label>
<div class="form-check form-switch mx-auto">
<input class="form-check-input" type="checkbox" role="switch" id="switch_question-${num_question}" />
</div>
</div>

<div class="border-top border-bottom">
<label for="switch_question_answer">
<h5 class="mt-3">Answers Have Images ?</h5>
</label>
<div class="form-check form-switch mx-auto">
<input class="form-check-input" type="checkbox" role="switch" id="swith_answer-${num_question}" />
</div>
</div>

<div class="exam_name mb-3 border-bottom" id="questions_container">
<div id = "question_handler-${num_question} question_name_question">
<label for="exam_question">
<h5 class="mt-3">Question #${num_question}</h5>
</label>
<input type="text" class="w-75 mx-auto form-control mb-3" id="exam_question-${num_question}" placeholder="Question">
</div>

<label for="exam_choices_answer">
<h5 class="mt-3">Choices</h5>
</label>
<div id = "all_handler">
<div id="choices_handler-${num_question}">
<div id = "wrong_choices-${num_question}">
<input type="text" class="w-75 mx-auto form-control mb-3" id="exam_choices" placeholder="A)">
<input type="text" class="w-75 mx-auto form-control mb-3" id="exam_choices" placeholder="B)">
<input type="text" class="w-75 mx-auto form-control mb-3" id="exam_choices" placeholder="C)">
</div>
<input type="text" class="w-75 mx-auto form-control mb-3" id="exams_choices_answer" placeholder="Answer">
</div>
</div>
<button class="btn btn-success mb-3" id = "add_choice-${num_question}">Add Choice</button>
</div>`;
document.querySelector('.questions_start').insertAdjacentHTML('beforeend', cloned_dev);


const add_choice = document.getElementById(`add_choice-${num_question}`);



add_choice.addEventListener('click',()=>{
const choice_creation = document.createElement("input");

const wrong_choices = document.getElementById(`wrong_choices-${num_question}`);
choice_creation.id = 'exam_choices'
choice_creation.setAttribute("type", "text");

choice_creation.setAttribute("placeholder", String.fromCharCode(65 + wrong_choices.children.length) + ')');

choice_creation.classList.add("w-75");
choice_creation.classList.add('mx-auto');
choice_creation.classList.add('form-control');
choice_creation.classList.add('mb-3');
wrong_choices.appendChild(choice_creation)
})
});

let isEmptyInputFound = false;

let new_finsh_button = finsh_button.cloneNode(true);
finsh_button.parentNode.replaceChild(new_finsh_button, finsh_button);
finsh_button = new_finsh_button;
finsh_button.addEventListener('click', (event) => {
event.preventDefault();
const Exam_Name = document.getElementById("exam_name").value;
const Exam_Section = document.getElementById("exam_section").value;
const Exam_For_Which = document.getElementById("exam_for_which").value;
if(Exam_Name === "" || Exam_Section === "" || Exam_For_Which === "") return iziToast.warning({
theme : 'dark',
position : 'topRight',
drag : false,
title: 'اشعار',
titleColor : 'black',
message: 'يرجى ملئ جميع الحقول',
messageColor : 'black',
iconColor : 'red',
rtl : true
});
const questionGroups = [];
const exam_data = {
exam_name: Exam_Name,
exam_section: Exam_Section,
for_who : Exam_For_Which
};

const all_handler = document.querySelectorAll("#all_handler");
all_handler.forEach((handle, index) => {

const currentGroup = {
question_string : "",
choices: {
answer : "",
wrong : []
}
};
handle.querySelectorAll("input[id^='exam_choices']").forEach((choiceInput) => {
if (choiceInput.value === "") {
isEmptyInputFound = true;
return iziToast.warning({
    theme : 'dark',
    position : 'topRight',
    drag : false,
    title: 'اشعار',
    titleColor : 'black',
    message: 'يرجى ملئ جميع الحقول',
    messageColor : 'black',
    iconColor : 'red',
    rtl : true
    });
}
currentGroup.choices.wrong.push(choiceInput.value);
currentGroup.question_string = choiceInput.parentElement.parentElement.parentElement.parentElement.querySelector("input").value
});

if (isEmptyInputFound) {
return; 
}
currentGroup.choices.answer = handle.querySelector("#exams_choices_answer").value;
questionGroups.push(currentGroup);
});

if(!isEmptyInputFound){
fetch('/add_exam',{
method : "POST",
headers :{
"Content-Type": "application/json",
},
body: JSON.stringify({ questionGroups, exam_data })
}).then(()=>{
iziToast.success({
theme : 'dark',
position : 'topRight',
drag : false,
title: 'اشعار',
titleColor : 'black',
message: 'تم اضافة الامتحان',
messageColor : 'black',
iconColor : 'red',
rtl : true
});
})
}
});


});