$(document).ready(() => {
    $('.status-menu li a').click( (e) => {
        let status = $(e.target).text();
        console.log(getCookie('_csrf'));
        $.ajax({
            type: 'POST',
            url: '/auth/changeStatus',
            data: {"status": "status",
        			"_csrf": getCookie('_csrf')},
            headers: {
            	'X-CSRF-TOKEN': $('csrfToken'),
            },
            timeout: 3000,
            success: function(response) {
                if (response.status == '403') {
                    console.log(response);
                } else {
                    console.log(success);
                }
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
