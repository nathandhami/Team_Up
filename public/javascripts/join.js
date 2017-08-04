$(document).ready(() => {

  $('.joinEventBtn').click( (e) => {
    let event = JSON.parse($('#input_event').val());
    console.log(event['aliasId']);
    let csrf = $('#input_csrf').val();
        $.ajax({
          type: 'POST',
          url: '/join',
          data: {
              "_csrf": csrf,
              "aliasId": event['aliasId'],
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

