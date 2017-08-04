$(document).ready(function() {
  let sportElement = $("#sport");
  $('#soccer').on('click', () => {
    sportElement.val("Soccer");
  });
  $('#basketball').on('click', () => {
    sportElement.val("Basketball");
  });
  $('#volleyball').on('click', () => {
    sportElement.val("Volleyball");
  });
  $('#baseball').on('click', () => {
    sportElement.val("Baseball");
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
  from_input.on("dp.change", function (e) {
    to_input.data("DateTimePicker").minDate(e.date);
  });
  to_input.on("dp.change", function (e) {
    from_input.data("DateTimePicker").maxDate(e.date);
  });
});
