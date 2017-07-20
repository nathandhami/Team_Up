$(() => {
  $(document).scroll(function () {
    const navBar = $("nav");
    navBar.toggleClass('scrolled', $(this).scrollTop() > navBar.height());
  });
});
