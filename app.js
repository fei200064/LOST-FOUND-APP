// placeholder
const dropArea=document.getElementById("drop-area");
const imageUpload=document.getElementById("image-upload");
const imageView=document.getElementById("img-view");

imageUpload.addEventListener("change",uploadImage1);
function uploadImage1(){
    let imgLink=URL.createObjectURL(imageUpload.files[0]);
    imageView.style.backgroundImage=`url(${imgLink})`;
    imageView.innerHTML = "";
}