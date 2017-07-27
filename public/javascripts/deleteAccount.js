$(document).ready(() => {
    $('#deleteForm').validate({
        rules: {
            userPass: 'required',
        },
        messages: {
            userPass: '<span style="color: indianred;">' +
                'Please enter your current password</span>',
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: '/auth/deleteUser',
            data: $(form).serialize(),
            timeout: 3000,
            success: function(response) {
                if (response.status == '403') {
                    $('#errorPara').text(response.error);
                    $('#errorDiv').show().delay(5000).fadeOut();
                } else {
                    $('#deleteAccountModal').hide();
                    swal({
                      title: response.success,
                      text: 'We are sorry to see you leave but ' +
                            'you can always come back.',
                      type: 'success',
                      confirmButtonColor: '#DD6B55',
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
          return false;
        },

    });

    $('#btnDelAccount').click( (e) => {
        $('#deleteForm').submit();
    });
});
