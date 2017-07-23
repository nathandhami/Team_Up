$(document).ready(() => {
    $('#updateCheckbox').click( (e) => {
      $('#updatePassDiv').toggle('show');
    });

    $('#updateForm').validate({
        rules: {
            first_name: 'required',
            last_name: 'required',
            current_password: 'required',
            new_pass: 'required',
            confirm_new_pass: 'required',
        },
        messages: {
            userPass: '<span style="color: indianred;' +
                ' padding-left: 5px">' +
                '  Please enter your current password</span>',
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: '/auth/editAccount',
            data: $(form).serialize(),
            timeout: 3000,
            success: function(response) {
                if (response.status == '403') {
                    $('#errorPara').text(response.error);
                    $('#errorDiv').show().delay(5000).fadeOut();
                } else {
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

    $('#saveBtn').click( (e) => {
      $('#updateForm').submit();
    });
});
