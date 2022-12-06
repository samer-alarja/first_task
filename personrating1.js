$.ajax({
    type:'GET',
    url:'https://test.dumyah.com/api/v1/review/purchases-list',
    headers:{
        token: '1b33deba3db817619b316c6b42c8d8e3ce8add6dff549ddb80cd3ca59603c22c'
           },
success: function (response) {
    JSON.stringify(response)
    $.get("ppersonpage.ejs").then(function(template){
for (var i = 0; i < response.data.purchases_list.length ; i++){
    var hiddenval = response.data.purchases_list[i].product_id;
    $("body").append(ejs.render(template,{response:response,hiddenval:hiddenval,i:i}))
    $("#rateYo2"+i+"").rateYo({
           numStars:5,
           ratedFill:"#ff3399",
           starWidth:"83px",
           spacing:"25px",   
           fullStar:true
    });  
    $("#rateYo2"+i+"").rateYo().on("rateyo.set", function (e, data) {
      sessionStorage.removeItem('datarating');
      sessionStorage.setItem("datarating", data.rating);
    })

}})
 },
});
function funnctionbutton(i){
    var vari = document.getElementById('hiddden'+i+'').value;
    sessionStorage.removeItem('product_id'); 
    sessionStorage.setItem("product_id", vari);
    window.location.href = "formpage.html";
}
function functionn(i){
    var datarating = sessionStorage.getItem("datarating");
    var productidd = document.getElementById('hiddden'+i+'').value;
    $.ajax({
        type:"POST",
        url:"https://test.dumyah.com/api/v1/review",
        data:{
            rating_flag:1,
            product_id:productidd,
            rating:datarating,
            },
        headers:{
            token:'82e8931d5d723a4a505ac73a7e84ff77b2e0983cd36c8bf02404c6b8006b87a0'
            }, 
        });
$('#merge'+i+'').hide();
$('#rateYo2'+i+'').hide();
$('#buttonhide'+i+'').hide();
$('#hrhide'+i+'').hide();
alert("You have rated the product")
}
   