$(document).ready(function(){
    $("#toggle-sidebar").on('click',function (e){
            e.preventDefault();
            $("#wrapper-container").toggleClass("sidebarDisplayed");

     });
/*
     if ($("#toggle-sidebar").css("display") == "none"){
                 console.log('yes')
                $('#wrapper.container').addClass('sidebarDisplayed');
            }
            */
})



