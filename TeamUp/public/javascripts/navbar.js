$(() => {

  $('#sidebar').on('click', (e) => {
    e.preventDefault();
    $('aside').toggleClass('sidebarDisplayed');
  });


  $('.sidebarCloseBtn').on('click', (e) => {
    e.preventDefault();
    $('aside').toggleClass('sidebarDisplayed');
  });

  $(window).resize(function () {
    var minWidth = 768;
    var container = $('aside');
    if (!container.hasClass('sidebarDisplayed') && $(window).width() > minWidth) {
      container.addClass('sidebarDisplayed');
    }
  });

});
