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
            },
          timeout: 3000,
          success: function(response) {
            if (response.status == '403') {
              console.log(response);
            } 
            else {
              console.log(response);
            }
            
            },
            error: function(response) {
              console.log(response);
            },
        });
  });

});

