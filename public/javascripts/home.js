$(document).ready(() => {
    $('#toggle-sidebar').on('click', (e) => {
            e.preventDefault();
            $('#wrapper-container').toggleClass('sidebarDisplayed');
     });
/*
     if ($("#toggle-sidebar").css("display") == "none"){
                 console.log('yes')
                $('#wrapper.container').addClass('sidebarDisplayed');
            }
            */
});


