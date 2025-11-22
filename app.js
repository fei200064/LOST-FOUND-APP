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

let map;
let marker;

//create map
function initMap(){
     const defaultLocation = { lat: 3.1390, lng: 101.6869 };//Kuala lumpur =default location
     map=new google.maps.Map(document.getElementById("map"),{
        center:defaultLocation,
        zoom:12
     });
     //add marker
    marker=new google.maps.Marker({
      map:map, //tell the marker which map it should display on
      draggable:true ,// allow marker to be reposition by user 
      position: defaultLocation
    });

    //add Autocomplete to the input
    const input=document.getElementById("location");
    const autocomplete=new google.maps.places.Autocomplete(input, {
      
       fields:["formatted_address","geometry","name"], //The object inside the parentheses controls what data the service returns,geometry contain Location (precise lat and lng)
       componentRestrictions:{country:"my"} //restrict country region to Malaysia
    })

    autocomplete.addListener("place_changed",()=>{
       const place=autocomplete.getPlace() //update latest place
       console.log(place);
         if(!place.geometry){
           alert("No available details about the Place")
           return;
        }
        //Update map
          map.setCenter(place.geometry.location);
          map.setZoom(16);
        //Update marker
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
        //Update lat and lng
          document.getElementById("lat").value=place.geometry.location.lat();
         document.getElementById("lng").value=place.geometry.location.lng();
     })
    marker.addListener("dragend", () => {
       const pos = marker.getPosition();
       document.getElementById("lat").value = pos.lat();
       document.getElementById("lng").value = pos.lng();
       map.setCenter(pos); // Keep the map centered on the marker
    });

}

window.initMap = initMap;
