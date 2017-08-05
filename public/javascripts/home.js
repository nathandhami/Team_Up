$(document).ready(() => {
	$('.editEventBtn').click( (e) => {
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
	});


	$('#editEventSaveBtn').click( (e) => {
		$('#updateEventForm').submit();
	});

	$('#eventDelBtn').click( (e) => {
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
              console.log(response);
            },
        });
	});
});


