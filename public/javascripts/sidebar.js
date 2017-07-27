$(document).ready(() => {
    $('.status-menu li a').click( (e) => {
        let status = '[ Status: ' + $(e.target).text() + ' ]'
        $('#statusBtn').text(status);
    });
});
