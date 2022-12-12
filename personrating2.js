$.ajax({
    type:'GET',
    url:'https://test.dumyah.com/api/v1/review/purchases-list',
    headers:{
        token: 'ff3c99ec60c609ebff49a613da7a52961afc1e1a3f7da650299fda6a534e3e8f'
           },
success: function (response) {
    JSON.stringify(response)
    $.get("ppersonpage.ejs?v=5").then(function(template){
        $("body").append("<div class='master'><div id='main'>")
        $("#main").append("<h5>Review your purchases</h5><hr class='hr-header' width='65%' style='opacity: .1 ;'>")
for (var i = 0; i < response.data.purchases_list.length ; i++){
    var hiddenval = response.data.purchases_list[i].product_id;
    $("#main").append(ejs.render(template,{response:response,hiddenval:hiddenval,i:i}))
    $("#rateYo2"+i+"").rateYo({
           numStars:5,
           ratedFill:"#ff3399",
           starWidth:"55px",
           spacing:"0px",   
           fullStar:true,
           
    });  
    $("#rateYo3"+i+"").rateYo({
        numStars:5,
        ratedFill:"#ff3399",
        starWidth:"93px",
        spacing:"0px",   
        fullStar:true
 }); 
    $("#rateYo2"+i+"").rateYo().on("rateyo.set", function (e, data) {
      sessionStorage.removeItem('datarating');
      sessionStorage.setItem("datarating", data.rating);
    })
}})
$("body").append("</div></div>")
},
});
function funnctionbutton(i){
    var vari = document.getElementById('hiddden'+i+'').value;
    sessionStorage.removeItem('product_id'); 
    sessionStorage.setItem("product_id", vari);
    sessionStorage.removeItem('allow'); 
    sessionStorage.setItem("allow","true");
    window.location.href = "foormpage22.html?v=3";
}
function functionn(i){
    var datarating = sessionStorage.getItem("datarating");
    var productidd = document.getElementById('hiddden'+i+'').value;
    // $.ajax({
    //     type:"POST",
    //     url:"https://test.dumyah.com/api/v1/review",
    //     data:{
    //         rating_flag:1,
    //         product_id:productidd,
    //         rating:datarating,
    //         },
    //     headers:{
    //         token:'ff3c99ec60c609ebff49a613da7a52961afc1e1a3f7da650299fda6a534e3e8f'
    //         }, 
    //     });
// $('#merge'+i+'').hide();
// $('#rateYo2'+i+'').hide();
// $('#buttonhide'+i+'').hide();
$('#hide'+i+'').hide();
// $('#hrhide'+i+'').hide();
// alert("You have rated the product")
var vari = document.getElementById('hiddden'+i+'').value;
sessionStorage.removeItem('product_id'); 
sessionStorage.setItem("product_id", vari);
sessionStorage.removeItem('allow'); 
sessionStorage.setItem("allow","true");
window.location.href = "foormpage22.html?v=4";

}
   