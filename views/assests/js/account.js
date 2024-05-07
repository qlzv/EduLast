const fileInput = document.getElementById('fileInput');
const profile_img = document.getElementById("profile_img");
const nav_profile_img = document.getElementById("Nav_Profile_Img")
fileInput.addEventListener('change', function (e) {
const formData = new FormData();
formData.append('image', fileInput.files[0]); 
fetch('/upload_img', {
method: 'POST',
body: formData,
}).then(response => response.json())
.then(data =>{
     profile_img.src = data.url
     nav_profile_img.src = data.url
    })
.catch(error => console.error('Error:', error));

});