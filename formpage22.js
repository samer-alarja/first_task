$.ajax({
    type:"GET",
    url:"https://test.dumyah.com/api/v1/manager/review/check?product_id="+sessionStorage.getItem("product_id")+"",
    headers:{
            token:'4bf3a121690b8cc35e79c0b876e3ba8622aec563539ceb9de522e5ee2ef5addb'
         },
         success:function (jsonResponse) {
            var rating_num = jsonResponse.data.rating;
            const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
var jsonResponse = JSON.parse(xhttp.response);
var hiddenval = jsonResponse.data.product_info.product_id;
$.get("formpage2.ejs?v=13").then(function(template){
$("body").append(ejs.render(template,{jsonResponse:jsonResponse,hiddenval:hiddenval}))
$("#rateYo2").rateYo({
rating:rating_num,
numStars:5,
ratedFill: "#ff3399",
starWidth: "70px",
spacing: "0",   
fullStar: true
});     
$("#rateYo3").rateYo({
    rating:rating_num,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "80px",
    spacing: "0",   
    fullStar: true
    });   
})
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id="+sessionStorage.getItem("product_id")+"");
xhttp.send();
}
});
function runpost()
{
var productid= document.getElementById('hidden').value;
var rateYo = $("#rateYo2").rateYo();
var ratingval = rateYo.rateYo("rating");
var textarea= document.getElementById('textareaa').value;

var number = parseInt(ratingval);

// var formData = new FormData();
// var files = $('#firstimg')[0].files[0];
// if(files.length > 0 ){
// formData.append('files',files);
// }


// document.cookie="d-token=b926a516a76e825cd69b0975153b60e6a935479d5dfe42d3380a0b5f0d4fafda"; 

// Cookies.set("d-token", "b926a516a76e825cd69b0975153b60e6a935479d5dfe42d3380a0b5f0d4fafda",{ expires : 6});
// var myCookie = Cookies.get("d-token")

// $.ajax({
// type:"POST",
// url:"https://test.dumyah.com/api/v1/review",
// data:{
//       product_id: productid,
//       rating: number,
//       review_textarea: textarea,
//       //  files:formData,
//       //  contentType: false,
//       //  processData: false, 
//       },
// headers:{
//       token:'4c0e6f6d3734976eeb3d5e9cff9c813a91b92eb6f22d39c0c0d32239f29e81a3'
//       }, 
//     });
if(number == ""){
    alert("please write a rating");
}else if(textarea == ""){
    alert("please write a Your review about the product");
}else{
    alert("You have rated the product");
    window.location.href = "personrating.html";
}
}
function exi(count){
    $(".div_flex"+count+"").hide();
}
function fun(val) {
var myArray = val.value.split(" ");
var len=0;
for(i=0;i < myArray.length;i++ ){
   if(myArray[i] == ""){
    len = len;
   }else{
    len = len + 1;
   }
   if (len > 15){
    len = 15;
    $('#points').text(15 - (len));
   }else{
    $('#points').text(15 - (len));
   }
 }
};