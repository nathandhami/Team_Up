$(document).ready(() => {
    $('#userToggleSideBar').on('click', (e) => {
            e.preventDefault();
            $('#wrapper-container').toggleClass('sidebarDisplayed');
     });


     $('.sidebarCloseBtn').on('click', (e) => {
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


