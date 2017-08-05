$(document).ready(() => {
	$('.editEventBtn').click( (e) => {
		console.log("hello");
		let event = $(e.target).children('input').val();
		event = JSON.parse(event);
		console.log(event.teamupName);
		$('#teamupName').val(event.teamupName);
	});
});


