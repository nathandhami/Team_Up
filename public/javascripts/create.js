$(document).ready(() => {
  let sportElement = $('#sport');
  $('#soccer').on('click', () => {
    sportElement.val('Soccer');
  });
  $('#basketball').on('click', () => {
    sportElement.val('Basketball');
  });
  $('#volleyball').on('click', () => {
    sportElement.val('Volleyball');
  });
  $('#baseball').on('click', () => {
    sportElement.val('Baseball');
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
