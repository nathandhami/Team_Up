$(document).ready(() => {

  // Chat Client-Side Behaviour

  var socket = io();
  // Force socket.io to use only websock and never use HTTP polling
  // let socket = io({transports: ['websocket'], upgrade: false});
  let syncTimestampArr = [];
  let messageCount = 0;
  const timerInMs = 60000;

  // Updates timestamp at an interval for each message in chat
  syncTimestamps(timerInMs);

  // If user changes status
  $('.status-menu li a').click((e) => {
    let status = $(e.target).text();

    localUserData.status = status;
    // console.log(status);

    // Status Updating Logic
    socket.emit('userChangedStatus', localUserData);

  });


  socket.on('connect', function () {
    socket.emit('new user', localUserData, localEventData);
  });


  // This was recieved by all chatrooms and will only affect the user 
  // that changed it (through email)
  socket.on('updateStatusBroadcast', (user) => {

    if (localUserData.email == user.email) {
      let statusTitle = $('.profile-user-status > a');
      statusTitle.text(' [ Status: ' + user.status + ' ]');
      statusTitle.append($('<span class="caret"></span>'));
    }
    
      $('#event-participants').find('span').each(function( index ) {
        var text = $(this).data('email');
        // console.log (text);
       if (text == user.email){
         $(this).text(' (' + user.status + ')');
       }

    });

  });

  socket.on('updateChatUsers', (data) => {
    let eventParticipants = $('#event-participants');

    // Clear first
    $('.users').remove();

    for (let i = 0; i < data.length; i++) {
      let content = $('<li class="users user' + i + '">' + data[i].name + ' ' 
                        + '<span data-email="' + data[i].email + '" class="statuses status' + i + '">'
                        + '(' + data[i].status + ')' + '</span></li>');
      eventParticipants.append(content);
    }
  });

  socket.on('sendChatHistory', (historyChatArr) => {
    let msgBody = $('.chatUI-msgBody');

    for (i = (historyChatArr.length - 1); i >= 0; i--) {
      // Fix later, security vulnerability
      msgBody.find('ul').append(generateMsg(historyChatArr[i].message,
        historyChatArr[i].name, historyChatArr[i].image, historyChatArr[i].date));
    }
  });

  $('form').submit(() => {
    let messageContent = $('#inputSendMsg').val();

    // Prepare data transfer
    let data = {
      message: messageContent,
      name: localUserData.name,
      image: localUserData.img,
      date: Date.now(),
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

  /**
   * Returns a message in proper format for chat window
   *
   * @param {String} content
   * @param {String} img
   * @param {String} timestamp
   * @return {String}
   */
  function generateMsg(content, name, img, timestamp) {
    let timeString = calculateTimeSince(timestamp);

    // Insert message timestamp for resync later on
    syncTimestampArr.push(timestamp);

    let formattedMsg =
      '<li class="clearfix">'
      + '<span class="userImg pull-left">'
      + '<img class="img-circle"'
      + ' src=' + '"' + img + '"'
      + ' width="42"'
      + ' height="42"/></span><span class="userMsgBody clearfix">'
      + '<div class="header">'
      + '<strong>' + name + '</strong>'
      + '<small class="pull-right text-muted timestamp-default">'
      + '<span class="glyphicon glyphicon-time"></span>'
      + '<span class="timestamp' + messageCount + '"' + '>' + timeString + '</span>' + ' ago </small></div>'
      + '<p>' + content + '</p> </span></li>';

    // Track the number of messages sent in the chat
    messageCount++;

    return formattedMsg;
  }

  /**
   * Calculate duration of two dates and return a readable string
   * Using moment.js to calculate this
   */
  function calculateTimeSince(timestamp) {
    let messageTimestamp = timestamp;
    let currentTimestamp = Date.now();
    let result = moment(currentTimestamp).diff(moment(messageTimestamp));

    return moment.duration(result).humanize();
  }

  /**
   * Updates the timestamp for each message currently displayed in the chat
   * at speciifed parameter interval rate (in milliseconds)
   *
   */
  function syncTimestamps(intervalRate) {
    setInterval(function () {
      let arrSize = syncTimestampArr.length;

      for (i = 0; i < arrSize; i++) {
        let className = '.timestamp' + i;
        let newTimeString = calculateTimeSince(syncTimestampArr[i]);

        $(className).text(newTimeString);
      }
    }, intervalRate);
  }
  // END OF Chat Client-Side Behaviour

});


