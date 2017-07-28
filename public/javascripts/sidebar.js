$(document).ready(() => {
    $('.status-menu li a').click( (e) => {
        let status = $(e.target).text();
        let csrf = $('#input_csrf').val();
        $.ajax({
            type: 'POST',
            url: '/auth/changeStatus',
            data: {
            	"_csrf": csrf,
            	"status": status,
            },
            timeout: 3000,
            success: function(response) {
                let temp = '[ Status: ' + status +' ] ';
                $('#statusBtn').text(temp);
                $('#statusBtn').append('<span class=\"caret\"></span>');
            },
            error: function(response) {
                console.log(response);
            },
          });
    });
});
