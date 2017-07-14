$(document).ready(function() {
    $('#userToggleSideBar').on('click', function(e) {
            e.preventDefault();
            $('#wrapper-container').toggleClass('sidebarDisplayed');
     });


     $('.sidebarClose').on('click', function(e) {
            e.preventDefault();
            console.log('sas');
            $('#wrapper-container').toggleClass('sidebarDisplayed');
     });

/*
     if ($("#toggle-sidebar").css("display") == "none"){
                 console.log('yes')
                $('#wrapper.container').addClass('sidebarDisplayed');
            }
            */
});


