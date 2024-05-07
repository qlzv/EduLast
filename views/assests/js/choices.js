document.addEventListener('DOMContentLoaded', function () {
const sorting = document.querySelector('.selectpicker');
const commentSorting = document.querySelector('.selectpicker');
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

})


