$(document).ready(() => {

  $.ajax({
    type: 'GET',
    url: '/join',
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

