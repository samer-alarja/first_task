const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
var jsonResponse = JSON.parse(xhttp.response);
sessionStorage.setItem("product_id", jsonResponse.data.product_info.product_id);
$.get("mmainnpage1.ejs").then(function(template){
$(".left").append(ejs.render(template,{jsonResponse:jsonResponse}));
$("#rateYo2").rateYo({
    rating: jsonResponse.data.average_product_rating.reviews_avg,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "30px",
    spacing: "10px",
    readOnly: true,
});
}).then(function(){
  for (var i = 0 ; i < jsonResponse.data.rating_summary.length ; i++){
       var number_of_reviews = jsonResponse.data.rating_summary[i].number_of_reviews;
       var length = jsonResponse.data.rating_summary.length-i;
       var rating = jsonResponse.data.rating_summary[i].rating;
       funpagemain(i,number_of_reviews,length,rating)
  }
}).then(function(){

  setTimeout(function(){   
    $.get("mainbutton.ejs").then(function(template){
    $(".div-left").append(ejs.render(template,{}));
    }) },80);

})
 var leenn = jsonResponse.data.list_reviews.length -1;
 for (var i = 0; i < jsonResponse.data.list_reviews.length ; i++){
       var productid = jsonResponse.data.product_info.product_id;
       var name =jsonResponse.data.list_reviews[i].author;
       var date =jsonResponse.data.list_reviews[i].date_added;
       var text =jsonResponse.data.list_reviews[i].text;
       var rating=jsonResponse.data.list_reviews[i].rating;
       var verified_purchase=jsonResponse.data.list_reviews[i].verified_purchase;
       var sshow_helpful=jsonResponse.data.list_reviews[i].show_helpful;
       var helpful_count=jsonResponse.data.list_reviews[i].helpful_count;
       var reeview_id=jsonResponse.data.list_reviews[i].review_id;
      //  var image=jsonResponse.data.list_reviews[i].image;
       addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,/*image*/);
       funhr(i,leenn);
 }
}

//10730 63514 4436 23907
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id=63514");
xhttp.send();
function funpagemain(i,number_of_reviews,length,rating){
  setTimeout(function(){   
    $.get("mainbutton.ejs").then(function(template){
      $.get("mainpage222.ejs").then(function(template){
        $(".div-left").append(ejs.render(template,{i:i,number_of_reviews:number_of_reviews,length:length}))
        $("#rateYo1"+i+"").rateYo({
            rating:rating,
            numStars:5,
            ratedFill: "#ff3399",
            starWidth: "30px",
            spacing: "10px",
            readOnly: true
        })
      })
  }) 
  },
  52);
}

function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,/*image*/){
$.get("centerr.ejs").then(function(template){
$(".center-append").append(ejs.render(template,{i:i,name:name,date:date,text:text,rating:rating,verified_purchase:verified_purchase
    ,sshow_helpful:sshow_helpful,helpful_count:helpful_count,reeview_id:reeview_id,productid:productid})
)
if (sessionStorage.getItem('helpfulremove'+reeview_id+'') =="true" ){
 $('#helpfulremove'+i+''+reeview_id+'').hide();
 $('#helpfulshow'+i+''+reeview_id+'').show();
}
$("#rateYoo"+i+"").rateYo({
    rating: rating,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "25px",
    spacing: "5px",
    readOnly: true
}); 
      
if(verified_purchase == false ){
    $(".verified"+reeview_id+"").hide();
    $(".display"+reeview_id+"").hide();
}
})
}
function funimage(i){
  var ccurrentPage =2;
  var product = document.getElementById('productid'+i+'').value;
  sessionStorage.removeItem('imgproduct'); 
  sessionStorage.setItem("imgproduct", product);
  sessionStorage.removeItem('ccurrentPage'); 
  sessionStorage.setItem("ccurrentPage", ccurrentPage);
  sessionStorage.removeItem('i'); 
  sessionStorage.setItem("i", i);
  window.location.href = "imagepage.html";
  }


  function helpremovee(i ,reeview_id )
  {
  $('#helpfulremove'+i+''+reeview_id+'').hide();
  $('#helpfulshow'+i+''+reeview_id+'').show();
    $.ajax({
      type:"POST",
      url:"https://test.dumyah.com/api/v1/review/helpful",
      data:{
        review_id:reeview_id,
           },
      headers:{
              token:'ce79ff3bf61223024c5b8fca6584d5916df5aa4d577470439f0633b9a6e7b103'
           },
    });
    sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
  }
function funhr(i,leenn)
{

  if (leenn == i)
  {
    // $(".hr"+leenn+"").css("opacity", "0.001");
    $(".center-append").after("<div id='linkdiv'>Load More</div>");
  }



   







//load more page
var currentPage = 2;
$('#linkdiv').on('click', function() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    var jsonResponse = JSON.parse(xhttp.response);
    currentPage++;
    var leenn = jsonResponse.data.list_reviews.length -1;
 for (var i = 0; i < jsonResponse.data.list_reviews.length ; i++){
    var name =jsonResponse.data.list_reviews[i].author;
    var date =jsonResponse.data.list_reviews[i].date_added;
    var text =jsonResponse.data.list_reviews[i].text;
    var rating=jsonResponse.data.list_reviews[i].rating;
    var verified_purchase=jsonResponse.data.list_reviews[i].verified_purchase;
    var sshow_helpful=jsonResponse.data.list_reviews[i].show_helpful;
    var helpful_count=jsonResponse.data.list_reviews[i].helpful_count;
    var reeview_id=jsonResponse.data.list_reviews[i].review_id;
    var productid = jsonResponse.data.product_info.product_id;


    addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid);
    fuunhr(i,leenn);
}
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id=63514&current_page="+ currentPage +""); 
xhttp.send();
     

function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid){
    $.get("loadcenter.ejs").then(function(template){
    $(".center-append").append(ejs.render(template,{i:i,name:name,date:date,text:text,rating:rating,verified_purchase:verified_purchase
        ,sshow_helpful:sshow_helpful,helpful_count:helpful_count,reeview_id:reeview_id,productid:productid,currentPage:currentPage})
      )
    }).then(function(){
    if (sessionStorage.getItem('helpfulremove'+reeview_id+'') == "true"){
        $('#helpfulremove'+i+''+reeview_id+'').hide();
        $('#helpfulshow'+i+''+reeview_id+'').show();
       }
    $("#rateYoo"+i+""+ currentPage +"").rateYo({
        rating: rating,
        numStars:5,
        ratedFill: "#ff3399",
        starWidth: "25px",
        spacing: "5px",
        readOnly: true
    })
}).then(function(){
    if(verified_purchase == false ){
        $(".verified"+reeview_id+"").hide();
        $("#display"+reeview_id+"").hide();
        $(".display"+reeview_id+"").hide();
    }
})
}

function fuunhr(i,leenn)
{

  if (leenn == i)
  {
    $( "hr" ).last().css("opacity", "0.00001");
    // $(".hr"+leenn+"").css("opacity", "0.00001");
  }
}



})
}//funtop funhr
function funimagee(i,ccurrentPage){
  var productt = document.getElementById('productid'+i+''+ccurrentPage+'').value;
  sessionStorage.removeItem('imgproduct'); 
  sessionStorage.setItem("imgproduct", productt);
  sessionStorage.removeItem('ccurrentPage'); 
  sessionStorage.setItem("ccurrentPage", ccurrentPage);
  sessionStorage.removeItem('i'); 
  sessionStorage.setItem("i", i);
  window.location.href = "imagepage.html";
}

function helpremove(i,reeview_id )
{
$('#helpfulremove'+i+''+reeview_id+'').hide();
$('#helpfulshow'+i+''+reeview_id+'').show();
  $.ajax({
    type:"POST",
    url:"https://test.dumyah.com/api/v1/review/helpful",
    data:{
      review_id:reeview_id,
         },
    headers:{
            token:'ce79ff3bf61223024c5b8fca6584d5916df5aa4d577470439f0633b9a6e7b103'
         },
  });
  sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
}
