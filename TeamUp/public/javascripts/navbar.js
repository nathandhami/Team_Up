$(() => {
  $('#sidebar').on('click', (e) => {
    e.preventDefault();
    $('aside').toggleClass('sidebarDisplayed');
  });


  $('.sidebarCloseBtn').on('click', (e) => {
    e.preventDefault();
    $('aside').toggleClass('sidebarDisplayed');
  });

  $(window).resize(() => {
    let minWidth = 768;
    let container = $('aside');
    if (!container.hasClass('sidebarDisplayed') && $(window).width() > minWidth) {
      container.addClass('sidebarDisplayed');
    }
  });
});
