const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
var jsonResponse = JSON.parse(xhttp.response);
var hiddenval = jsonResponse.data.product_info.product_id;
$.get("formpage.ejs").then(function(template){
$("body").append(ejs.render(template,{jsonResponse:jsonResponse,hiddenval:hiddenval}))
$("#rateYo2").rateYo({
numStars:5,
ratedFill: "#ff3399",
starWidth: "83px",
spacing: "25px",   
fullStar: true
});       
})
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id="+sessionStorage.getItem("product_id")+"");
xhttp.send();

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

$.ajax({
type:"POST",
url:"https://test.dumyah.com/api/v1/review",
data:{
      product_id: productid,
      rating: number,
      review_textarea: textarea,
      //  files:formData,
      //  contentType: false,
      //  processData: false, 
      },
headers:{
      token:'491a6df9e65af0b0e9e410178cc147c51f6d602da7d1626ead554b0e817b52c9'
      }, 
    });
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

