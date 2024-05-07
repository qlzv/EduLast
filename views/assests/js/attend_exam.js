

var Quiz = function(quiz_name) {
this.quiz_name = quiz_name;

this.questions = [];
}

Quiz.prototype.add_question = function(question) {
var index_to_add_question = Math.floor(Math.random() * this.questions.length);
this.questions.splice(index_to_add_question, 0, question);
}

Quiz.prototype.render = function(container) {
var self = this;

$('#quiz-results').hide();
$('#quiz-name').text(this.quiz_name);

var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');


function change_question() {
self.questions[current_question_index].render(question_container);
$('#prev-question-button').prop('disabled', current_question_index === 0);
$('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);




}


var current_question_index = 0;
change_question();


$('#prev-question-button').click(function() {
if (current_question_index > 0) {
current_question_index--;
change_question();
}
});


$('#next-question-button').click(function() {
if (current_question_index < self.questions.length - 1) {
current_question_index++;
change_question();
}
});


$('#submit-button').click(function() {

var score = 0;
for (var i = 0; i < self.questions.length; i++) {
if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
score++;
}
}


var percentage = score / self.questions.length;
var message;
if (percentage === 1) {
message = 'Great job!'
} else if (percentage >= .75) {
message = 'You did alright.'
} else if (percentage >= .5) {
message = 'Better luck next time.'
} else {
message = 'Maybe you should try a little harder.'
}
$('#quiz-results-message').text(message);
$('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
$('#quiz-results').slideDown();
$('#quiz button').slideUp();
fetch('/submit_mark',{
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({exam_id:examId.id,mark:score,full_mark:self.questions.length})
})

setTimeout(function() {
window.location.href = "https://edu.repixel-agency.com/view_exams";
}, 2500); 
});


}


var Question = function(question_string, correct_choice, wrong_choices,Is_Image,name) {

this.question_string = question_string;
this.choices = [];
this.user_choice_index = null; 
this.Is_Image  = Is_Image
this.name  = name
this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);


var number_of_choices = wrong_choices.length + 1;
for (var i = 0; i < number_of_choices; i++) {
if (i === this.correct_choice_index) {
this.choices[i] = correct_choice;
} else {

var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
this.choices[i] = wrong_choices[wrong_choice_index];


wrong_choices.splice(wrong_choice_index, 1);
}
}
}
function ExtractText(textWithLink){
    // Extracting text using regular expression
    const textPattern = /(.*?)(https:\/\/\S+)(.*)/;
    const textMatch = textWithLink.match(textPattern);

    const text = textMatch ? (textMatch[1] + textMatch[3]).trim() : textWithLink.trim();

    // Extracting photo link using regular expression
    const photoPattern = /https:\/\/\S+/;
    const photoMatch = textWithLink.match(photoPattern);

    const photoLink = photoMatch ? photoMatch[0].trim() : null;

    return { text, photoLink };
}

Question.prototype.render = function(container) {

var self = this;


var question_string_h2;
if (container.children('h2').length === 0) {
question_string_h2 = $('<h2>').appendTo(container);
} else {
question_string_h2 = container.children('h2').first();
}
var formattedContent = `${this.question_string}`
if(formattedContent.includes("https")){
const { text, photoLink } = ExtractText(formattedContent);
question_string_h2.html(`<p>${text}</p><br><img src = "${photoLink}">`);
}else{
question_string_h2.html(`<p>${formattedContent}</p>`)
}


if (container.children('input[type=radio]').length > 0) {
container.children('input[type=radio]').each(function() {
var radio_button_id = $(this).attr('id');
$(this).remove();
container.children('label[for=' + radio_button_id + ']').remove();
});
}
for (var i = 0; i < this.choices.length; i++) {
var choice_radio_button = $('<input>')
.attr('id', 'choices-' + i)
.attr('type', 'radio')
.attr('name', 'choices')
.attr('value', 'choices-' + i)
.attr('checked', i === this.user_choice_index)
.appendTo(container);
var choice_label = $('<label>');
if (this.choices[i].includes("https")) {
    choice_label.html(`<img class = "img-fluid d-flex align-items-center justify-content-center" src = "${this.choices[i]}"/>`);
} else {
    choice_label.html(this.choices[i]);
}

choice_label.attr('for', 'choices-' + i).appendTo(container);
}


$('input[name=choices]').change(function(index) {
var selected_radio_button_value = $('input[name=choices]:checked').val();
self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
container.trigger('user-select-change');
});
}

$(document).ready(function() {
var quiz = new Quiz(examId.name);
for (var i = 0; i < examId.questions.length; i++) {
var question = new Question(examId.questions[i].question_string, examId.questions[i].choices.correct, examId.questions[i].choices.wrong,examId.questions[i].choices.Is_Image,examId.name);
quiz.add_question(question);
}
var quiz_container = $('#quiz');
quiz.render(quiz_container);
});