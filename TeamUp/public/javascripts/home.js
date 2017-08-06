$(document).ready(() => {
	$('.editEventBtn').click( (e) => {
		e.preventDefault();
		let event = $(e.target).children('input').val();
		$('#input_eventModal').val(event);

		event = JSON.parse(event);

		let from_date = event.from.split('T')[0] + ' ' + event.from.split('T')[1].split('.')[0];
		let to_date = event.to.split('T')[0] + ' ' + event.to.split('T')[1].split('.')[0];

		$('#teamupName').val(event.teamupName);
		$('#from').val(from_date);
		$('#to').val(to_date);
		$('#sport').val(event.sport);
		$('#locationName').val(event.locationName);
		$('#locationAddress').val(event.locationAddress);

		$('#from').data("DateTimePicker").maxDate(moment(to_date));
		$('#to').data("DateTimePicker").minDate(moment(from_date));
	});

	$('.participantsBtn').click( (e) => {
		e.preventDefault();
		let event = $(e.target).children('input').val();
 
		event = JSON.parse(event);

		let parentNode = $('#listMembers');
		$('.userList').remove();

		for(let i = 0; i < event.users.length; i++){

			let image = event.users[i].image;

			parentNode.append('<li class="clearfix userList"> <img class="thumb-img" src="' + image + '"/> ' 
			+ event.users[i].firstname + ' ' + event.users[i].lastname + ' (' + event.users[i].email + ')' + "</li>");
		}

		 
	});



	$('#eventDelBtn').click( (e) => {
		swal({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!',
		  closeOnConfirm: false
		},
		() => {
			let csrf = $('#input_csrf').val();
			let event = $('#input_eventModal').val();

			event = JSON.parse(event);
	        $.ajax({
	          type: 'POST',
	          url: '/event/delete/' + event.aliasId,
	          data: {
	              "_csrf": csrf,
	          },
	          timeout: 3000,
	          success: function(response) {
	            if (response.status == '403') {
	              swal({
	                  title: response.msg,
	                  text: response.text,
	                  type: 'warning',
	                  confirmButtonColor: '#DD6B55',
	                  confirmButtonText: 'Okay',
	                  closeOnConfirm: true,
	              });
	            }
	            else {
	              swal({
	                  title: response.msg,
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
	              window.location.href = response.redirect;
	            },
	        });
	    });
			
	});

	$('.leaveEventBtn').click( (e) => {
		e.preventDefault();
		swal({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, I\'m sure.',
		  closeOnConfirm: false
		},
		() => {
			let csrf = $('#input_csrf').val();
			let eventAliasId = $(e.target).children('input').val();
			$.ajax({
	          type: 'POST',
	          url: '/event/leave/' + eventAliasId,
	          data: {
	              "_csrf": csrf,
	          },
	          timeout: 3000,
	          success: function(response) {
	            if (response.status == '403') {
	              swal({
	                  title: response.msg,
	                  text: response.text,
	                  type: 'warning',
	                  confirmButtonColor: '#DD6B55',
	                  confirmButtonText: 'Okay',
	                  closeOnConfirm: true,
	              });
	            }
	            else {
	              swal({
	                  title: response.msg,
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
	              window.location.href = response.redirect;
	            },
	        });
		});
	});


	$('#updateEventForm').validate({
        rules: {
            teamupName: {
              required: true, 
              minlength: 2
            },
            from: {
              required: true,
            },
            to: {
              required: true,
            },
        },
        messages: {
            teamupName: {
              required: "Please enter event name.", 
              minlength: "Event name must have minimum 2 characters."
            },
            from: "Please select date and time",
            to: "Please select date and time",
        },
        submitHandler: function(form) {
        	let event = $('#input_eventModal').val();
			event = JSON.parse(event);
          $.ajax({
	          type: 'POST',
	          url: '/event/edit/' + event.aliasId,
	          data: $(form).serialize(),
	          timeout: 3000,
	          success: function(response) {
	            if (response.status == '403') {
	              swal({
	                  title: response.msg,
	                  text: response.text,
	                  type: 'warning',
	                  confirmButtonColor: '#DD6B55',
	                  confirmButtonText: 'Okay',
	                  closeOnConfirm: true,
	              });
	            }
	            else {
	              swal({
	                  title: response.msg,
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
	              window.location.href = response.redirect;
	            },
	        });
          return false;
        },

    });

	$('#editEventSaveBtn').click( (e) => {
		$('updateEventForm').submit();
	});
});


