  $.ajax({
    type:"GET",
    url:"https://test.dumyah.com/api/v1/reviews?product_id=23907",
    headers:{
            token:'16d25bfee220a24e4530d850a90ced87847fe676bb124bc42bf763d7e4ebf178'
         },
         success: function (jsonResponse) {

sessionStorage.setItem("product_id", jsonResponse.data.product_info.product_id);
$.get("mmainnpage1.ejs?v=10").then(function(template){
$(".left").append(ejs.render(template,{jsonResponse:jsonResponse}));
$("#rateYo2").rateYo({
    rating: jsonResponse.data.average_product_rating.reviews_avg,
    numStars:5,
    ratedFill: "#FF3F98",
    starWidth: "40px",
    spacing: "2px",
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
    $.get("mainbutton1.ejs?v=8").then(function(template){
      
    $(".div-left").append(ejs.render(template,{}));


    }) 
  },80);

}).then(function(){

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
       var coont2=jsonResponse.data.average_product_rating.num_of_reviews;
       var lenght=jsonResponse.data.list_reviews.length;
       var image=jsonResponse.data.list_reviews[i].image;
       addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,image);
       funhr(i,leenn,coont2,lenght,reeview_id);
 }
})
//10730 63514 4436 23907 10040 14364/rating
}
})
function funpagemain(i,number_of_reviews,length,rating){

  setTimeout(function(){   
  
      $.get("mainpage2222.ejs?v=6").then(function(template){
        $(".div-left").append(ejs.render(template,{i:i,number_of_reviews:number_of_reviews,length:length,rating:rating}))
        $("#rateYo1"+i+"").rateYo({
            rating:rating,
            numStars:5,
            ratedFill: "#ff3399",
            starWidth: "32px",
            spacing: "2px",
            readOnly: true
        })
      })
 
  },
  52);
}
function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,image){
setTimeout(function(){
$.get("centerr.ejs?v=11").then(function(template){
 var first_letter = name.charAt(0);
$(".center-append").append(ejs.render(template,{i:i,name:name,date:date,text:text,rating:rating,verified_purchase:verified_purchase
    ,sshow_helpful:sshow_helpful,helpful_count:helpful_count,reeview_id:reeview_id,productid:productid,first_letter:first_letter}))
if (sessionStorage.getItem('helpfulremove'+reeview_id+'') =="true" ){
 $('#helpfulremove'+i+''+reeview_id+'').hide();
 $('#helpfulshow'+i+''+reeview_id+'').show();
}

$("#rateYoo"+i+"").rateYo({
    rating: rating,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "25px",
    spacing: "0",
    readOnly: true
}); 
if(image){
  $('.img_origin'+ reeview_id +'').show();
  $('.image_alt'+ reeview_id +'').hide();
  
}else{
  $('.img_origin'+ reeview_id +'').hide();
  $('.image_alt'+ reeview_id +'').show();
}   


if(verified_purchase == false ){
    $("#verified"+ reeview_id +"").hide();
    $("#display"+reeview_id+"").hide();
}
if(sshow_helpful == false ){
  $(".helppp"+reeview_id+"").hide();
  $(".helpfulshow"+reeview_id+"").show();
}

})
},.2);

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
              token:'16d25bfee220a24e4530d850a90ced87847fe676bb124bc42bf763d7e4ebf178'
           },
           success: function (response) {
           
            $(".helpfulcount").text(response.data.helpful_count);
            }
    });

    sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
  }
function funhr(i,leenn,coont2,lenght,reeview_id)
{

  if (leenn == i)
  {


    $(".center-append").after("<div id='linkdiv'>Load More</div>");
    if ( coont2 == lenght ){
      $('#linkdiv').hide();
      $("#hr"+reeview_id+"").hide();
        setTimeout(function(){   
          $('hr:last').hide(); },
       

    15);
      
    }

  }






  // //load more page
var coont= 5;
 var currentPage = 2;

$('#linkdiv').on('click', function() {

  $.ajax({
    type:"GET",
    url:"https://test.dumyah.com/api/v1/reviews?product_id=23907&current_page="+ currentPage +"",
    headers:{
            token:'16d25bfee220a24e4530d850a90ced87847fe676bb124bc42bf763d7e4ebf178'
         },
         success: function (jsonResponse) {
          currentPage++;3

          coont = coont +jsonResponse.data.list_reviews.length;


          if (jsonResponse.data.average_product_rating.num_of_reviews ==  coont)
          {
            $('#linkdiv').hide();
            setTimeout(function(){  
              $('hr:last').hide();
            },
            12);
          }
          let array_length = jsonResponse.data.list_reviews.length;

          for (var i = 0; i < array_length ; i++){

             var name =jsonResponse.data.list_reviews[i].author;
             var date =jsonResponse.data.list_reviews[i].date_added;
             var text =jsonResponse.data.list_reviews[i].text;
             var rating=jsonResponse.data.list_reviews[i].rating;
             var verified_purchase=jsonResponse.data.list_reviews[i].verified_purchase;
             var sshow_helpful=jsonResponse.data.list_reviews[i].show_helpful;
             var helpful_count=jsonResponse.data.list_reviews[i].helpful_count;
             var reeview_id=jsonResponse.data.list_reviews[i].review_id;
             var productid = jsonResponse.data.product_info.product_id;
             var image=jsonResponse.data.list_reviews[i].image;
             addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,image);
         }
        
         function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,image){
          $.get("loadcenter1.ejs?v=8").then(function(template){
            var first_letter = name.charAt(0);
          $(".center-append").append(ejs.render(template,{i:i,name:name,date:date,text:text,rating:rating,verified_purchase:verified_purchase
              ,sshow_helpful:sshow_helpful,helpful_count:helpful_count,reeview_id:reeview_id,productid:productid,currentPage:currentPage,first_letter:first_letter,image:image}) )
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
              spacing: "0",
              readOnly: true
          })
      }).then(function(){
          if(verified_purchase == false ){
             $("#verified"+ reeview_id +"").hide();
            $("#display"+ reeview_id +"").hide();
          }
      }).then(function(){
        if(sshow_helpful == false ){
 
          $(".helppp"+reeview_id+"").hide();
          $(".helpfulshow"+reeview_id+"").show();
        }

        if(image){
          $('.img_origin'+ reeview_id +'').show();
          $('.image_alt'+ reeview_id +'').hide();
          
        }else{
          $('.img_origin'+ reeview_id +'').hide();
          $('.image_alt'+ reeview_id +'').show();
        }  
      })
      }
  }}) 
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
            token:'16d25bfee220a24e4530d850a90ced87847fe676bb124bc42bf763d7e4ebf178'
         },
         success: function (response) {
         
          $(".helpfulcounttt").text(response.data.helpful_count);
          }
  });
  sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
}

      