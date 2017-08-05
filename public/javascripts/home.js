$(document).ready(() => {
	$('.editEventBtn').click( (e) => {
		let event = $(e.target).children('input').val();
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
});


