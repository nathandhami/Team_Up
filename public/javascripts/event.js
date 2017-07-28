$(document).ready(() => {

  // Chat Client-Side Behaviour
  let socket = io();

  socket.on('connect', function() {
    socket.emit('new user', localUserData, localEventData);
  });
  
   console.log(localEventData.roomId);
  socket.on('updateChatUsers', (data) => {
    console.log(data);
    for (let user of data) {
      console.log(user);
    }
  });

  socket.on('sendChatHistory', (historyChatArr) => {
    let msgBody = $('.chatUI-msgBody');
    
    for ( i= (historyChatArr.length - 1); i >= 0; i--){
      // Fix later, security vulnerability
      msgBody.find('ul').append(generateMsg(historyChatArr[i].message,
        historyChatArr[i].name, historyChatArr[i].image, historyChatArr[i].date));
    }
  });

  /**
   * Returns a message in proper format for chat window *
   *
   * @param {String} content
   * @param {String} img
   * @param {String} timestamp
   * @return {String}
   */
  function generateMsg(content, name, img, timestamp) {
    var timeString  = calculateTimeSince(timestamp);
    let formattedMsg =
      '<li class="clearfix">'
      + '<span class="userImg pull-left">'
      + '<img class="img-circle"'
      + ' src=' + '"' + img + '"'
      + ' width="42"'
      + ' height="42"/></span><span class="userMsgBody clearfix">'
      + '<div class="header">'
      + '<strong>' + name + '</strong>'
      + '<small class="pull-right text-muted">'
      + '<span class="glyphicon glyphicon-time"></span>'
      + '<span id=timestamp>' + timeString + '</span>' + ' ago </small></div>'
      + '<p>' + content + '</p> </span></li>';
      console.log(calculateTimeSince(timestamp) + ' ago');

    console.log(formattedMsg);
    return formattedMsg;
  }

  function calculateTimeSince(timestamp) {
    var messageTimestamp = timestamp;
    var currentTimestamp = Date.now();
    var result = moment(currentTimestamp).diff(moment(messageTimestamp));
    return moment.duration(result).humanize();
  }

  $('form').submit(() => {
    let messageContent = $('#inputSendMsg').val();
    // Prepare data transfer
    let data = {
      message: messageContent,
      name: localUserData.name,
      image: localUserData.img
    };

    console.log(data);
    // Send data to server socket
    socket.emit('chat message', data);
    $('#inputSendMsg').val('');
    // Prevent form default behaviour,
    return false;
  });

  socket.on('chat message', (data) => {
    let msgBody = $('.chatUI-msgBody');

    // Fix later, security vulnerability
    msgBody.find('ul').append(generateMsg(data.message, data.name, data.image, data.date));
    // AutoScroll
    msgBody.scrollTop(msgBody.prop('scrollHeight'));
  });
  // END OF Chat Client-Side Behaviour

});


