$(document).ready(() => {
    $('#updateCheckbox').click( (e) => {
      $('#updatePassDiv').toggle('show');
    });

    $('#updateForm').validate({
        rules: {
            first_name: {
              required: true, 
              minlength: 2
            },
            last_name: {
              required: true, 
              minlength: 2
            },
            current_password: 'required',
            new_pass: {
              required: true, 
              minlength: 6
            },
            confirm_new_pass: {
              equalTo: '#new_pass'
            }
        },
        messages: {
            first_name: {
              required: "Please enter your first name.", 
              minlength: "First Name must have minimum 2 characters."
            },
            last_name: {
              required: "Please enter your last name.", 
              minlength: "Last Name must have minimum 2 characters."
            },
            current_password: "Please enter your current password",
            new_pass: {
              required: "Please enter your new password", 
              minlength: "Password must have minimum 6 characters."
            },
            confirm_new_pass: {
              equalTo: "Your passwords do not match."
            }
        },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: '/edit',
            data: $(form).serialize(),
            timeout: 3000,
            success: function(response) {
                if (response.status == '403') {
                    swal({
                      title: response.error,
                      text: response.text,
                      type: 'warning',
                      confirmButtonColor: '#DD6B55',
                      confirmButtonText: 'Okay',
                      closeOnConfirm: true,
                    });
                } else {
                    swal({
                      title: response.success,
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
          return false;
        },

    });

    $('#saveBtn').click( (e) => {
      $('#updateForm').submit();
    });
});
