$(document).ready(function() {
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
      console.log(e.date);
      to_input.data("DateTimePicker").minDate(e.date);
  });
  to_input.on("dp.change", function (e) {
      from_input.data("DateTimePicker").maxDate(e.date);
  });
});
