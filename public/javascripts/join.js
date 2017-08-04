$(document).ready(() => {

  $('.joinEventBtn').click( (e) => {
    let event_alias_id = $(e.target).children('input').val();
    console.log(event_alias_id);
    let csrf = $('#input_csrf').val();
        $.ajax({
          type: 'POST',
          url: '/join',
          data: {
              "_csrf": csrf,
              "eventAliasId": event_alias_id,
            },
          timeout: 3000,
          success: function(response) {
            if (response.status == '400') {
              swal({
                  title: response.msg,
                  text: response.text,
                  type: 'warning',
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'Okay',
                  closeOnConfirm: true,
              });
            } 
            else {
              swal({
                  title: response.msg,
                  text: response.text,
                  type: 'success',
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: 'Okay',
                  closeOnConfirm: false,
              },
              () => {
                window.location.href = response.redirect;
              });
            }
            
            },
            error: function(response) {
              console.log(response);
            },
        });
  });

});

