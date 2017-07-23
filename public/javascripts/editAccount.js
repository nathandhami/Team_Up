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
            first_name: 'required',
            last_name: 'required',
            current_password: 'required',
            new_pass: 'required',
            confirm_new_pass: 'required',
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: '/auth/editAccount',
            data: $(form).serialize(),
            timeout: 3000,
            success: function(response) {
                if (response.status == '403') {
                    alert('incorrect password');
                } else {
                    alert('correct password');
                    // swal({
                    //   title: response.success,
                    //   text: 'We are sorry to see you leave but ' +
                    //         'you can always come back.',
                    //   type: 'success',
                    //   confirmButtonColor: '#DD6B55',
                    //   confirmButtonText: 'Okay',
                    //   closeOnConfirm: false,
                    // },
                    // () => {
                    //   window.location.href = response.redirect;
                    // });
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
