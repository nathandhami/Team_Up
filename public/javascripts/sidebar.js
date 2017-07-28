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
                let temp = '[ Status: ' + response.new_status +' ] ';
                $('#statusBtn').text(temp);
                $('#statusBtn').append('<span class=\"caret\"></span>');
            },
            error: function(response) {
                console.log(response);
            },
          });
    });

    function getCookie(c_name) {
        if(document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if(c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if(c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }
});
