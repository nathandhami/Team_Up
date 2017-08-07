$(document).ready(() => {
  let sportElement = $('#sport');
  $('#soccer').on('click', (e) => {
    e.preventDefault();
    $('.sport-clicked').removeClass('sport-clicked');
    $('#soccer').addClass('sport-clicked');
    sportElement.val('Soccer');
    sportElement.fadeTo(100, 0.1).fadeTo(200, 1.0);
  });
  $('#basketball').on('click', (e) => {
    e.preventDefault();
    $('.sport-clicked').removeClass('sport-clicked');
    $('#basketball').addClass('sport-clicked');
    sportElement.val('Basketball');
    sportElement.fadeTo(100, 0.1).fadeTo(200, 1.0);
  });
  $('#volleyball').on('click', (e) => {
    e.preventDefault();
    $('.sport-clicked').removeClass('sport-clicked');
    $('#volleyball').addClass('sport-clicked');
    sportElement.val('Volleyball');
    sportElement.fadeTo(100, 0.1).fadeTo(200, 1.0);
  });
  $('#baseball').on('click', (e) => {
    e.preventDefault();
    $('.sport-clicked').removeClass('sport-clicked');
    $('#baseball').addClass('sport-clicked');
    sportElement.val('Baseball');
    sportElement.fadeTo(100, 0.1).fadeTo(200, 1.0);
  });
  $('#other').on('click', (e) => {
    e.preventDefault();
    $('.sport-clicked').removeClass('sport-clicked');
    $('#other').addClass('sport-clicked');
    sportElement.val('');
    sportElement.fadeTo(100, 0.1).fadeTo(200, 1.0);
    sportElement.focus();
  });
  let from_input = $('#from');
  let to_input = $('#to');
  from_input.datetimepicker({
    minDate: moment()
  });
  to_input.datetimepicker({
    useCurrent: false,
    minDate: moment()
  });
  from_input.on('dp.change', (e) => {
    to_input.data('DateTimePicker').minDate(e.date);
  });
  to_input.on('dp.change', (e) => {
    from_input.data('DateTimePicker').maxDate(e.date);
  });
  let maxPlayers = $('#maxPlayers');
  maxPlayers.change(() => {
    let n = maxPlayers.val();
    if (!($.isNumeric(n) && (n > 0))) {
      maxPlayers.val(1);
    } else if ($.isNumeric(n) && (n > 40)) {
      maxPlayers.val(40);
    }
  });
  $('#submit').on('click', (e) => {
    if ($('#teamupName').val() && $('#from').val() && $('#to').val() && $('#sport').val() && $('#maxPlayers').val() && !$('#locationName').val()) {
      $('p#errorLocation').text('Please Select a Location using Google Maps! Thank you :)');
      $('html, body').animate({
        scrollTop: 0
      }, 2000);
      $('#pac-input').focus();
      e.preventDefault();
    }
  });
});
