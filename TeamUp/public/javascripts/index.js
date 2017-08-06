$(() => {
  $('#register').hide();
  $('#loginNav').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('#registerNav').removeClass('active');
      $('#register').slideUp(500, () => {
        $('#login').slideDown(500); // show
      }); // hide
      // $('#login').animate({display, 'none'}, "slow");
      // $('#register').animate({display, 'initial'}, "slow");
    }
  });
  $('#registerNav').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('#loginNav').removeClass('active');
      $('#login').slideUp(500, () => {
        $('#register').slideDown(500); // show
      }); // hide
      // $('#register').css('display', 'none');
      // $('#login').css('display', 'inherit');
      // $('#register').hide(1000);
      // $('#register').animate({display, 'none'}, "slow");
      // $('#login').animate({display, 'initial'}, "slow");
    }
  });

  // const formSubmit = (form) => {
  //   $(form).submit((event) => {
  //     event.preventDefault();
  //     const form = $(this);
  //     $.ajax({
  //       url: form.attr('action'),
  //       type: form.attr('method'),
  //       data: form.serialize(),
  //       success: (res) => {
  //         $.html(res);
  //         console.log(res);
  //       },
  //     });
  //   });
  // };

  // formSubmit('#login');
  // formSubmit('#register');
});
