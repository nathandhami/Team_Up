$(document).ready(() => {
  $('#userToggleSideBar').on('click', (e) => {
    e.preventDefault();
    $('#wrapper-container').toggleClass('sidebarDisplayed');
  });


  $('.sidebarCloseBtn').on('click', (e) => {
    e.preventDefault();
    $('#wrapper-container').toggleClass('sidebarDisplayed');
  });

  // Chat Client-Side Behaviour
  let socket = io();

  /**
   * Returns a message in proper format for chat window *
   *
   * @param {String} content
   * @param {String} img
   * @param {String} timestamp
   * @return {String}
   */
  function generateMsg(content, img, timestamp) {
    let formattedMsg =
    '<li class="clearfix">'
    + '<span class="userImg pull-left">'
    + '<img class="img-circle"'
    + ' src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/'
    + 'p/2/000/079/328/1630e0b.jpg" width="28"'
    + ' height="28"/></span><span class="userMsgBody clearfix">'
    + '<div class="header">'
    + '<strong>Brad</strong>'
    + '<small class="pull-right text-muted">'
    + '<span class="glyphicon glyphicon-time"></span>'
    + '5 mins ago </small></div>'
    + '<p>' + content + '</p> </span></li>';

    return formattedMsg;
  }

  $('form').submit(() => {
    socket.emit('chat message', $('#inputSendMsg').val());
    $('#inputSendMsg').val('');
    // Prevent form default behaviour, 
    return false;
  });

  socket.on('chat message', (msg) => {
    let msgBody = $('.chatUI-msgBody');
    // Fix later, security vulnerability
    msgBody.find('ul').append(generateMsg(msg));
    // AutoScroll
    msgBody.scrollTop(msgBody.prop('scrollHeight'));
  });
    // END OF Chat Client-Side Behaviour
});


