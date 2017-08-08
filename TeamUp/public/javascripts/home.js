$(document).ready(() => {
	$('.editEventBtn').click( (e) => {
		e.preventDefault();
		let event = $(e.target).children('input').val();
		$('#input_eventModal').val(event);

		event = JSON.parse(event);

		let from_date = moment(event.from).format('MM/DD/YYYY HH:MM AM');
		from_date = from_date.substring(0, from_date.length - 1);
		let to_date = moment(event.to).format('MM/DD/YYYY HH:MM AM');
		to_date = to_date.substring(0, to_date.length - 1);

		$('#teamupName').val(event.teamupName);
		$('#from').val(from_date);
		$('#to').val(to_date);
		$('#maxPlayers').val(event.maxPlayers);
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
			let email = 'hidden';

			if(event.users[i].email != null){
				email = event.users[i].email
			}

			parentNode.append('<li class="clearfix userList"> <img class="thumb-img" src="' + image + '"/> ' 
			+ event.users[i].firstname + ' ' + event.users[i].lastname + ' (' + email + ')' + "</li>");
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
            maxPlayers: {
            	required: true,
            	max: 40,
            	min: 0,
            }
        },
        messages: {
            teamupName: {
              required: "Please enter event name.", 
              minlength: "Event name must have minimum 2 characters."
            },
            from: "Please select date and time",
            to: "Please select date and time",
            maxPlayers: {
              required: "Please enter the maximum player count.", 
              max: "Value should be between 0-40",
              min: "Value should be between 0-40",
            }
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


