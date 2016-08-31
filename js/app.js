$jQuery(document).ready(function($) {

  var socket = io('ws://'+ location.host +':3000/');

  $('form').submit(function(){
    socket.emit('messageFromClient', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('messageToClient', function(response){
    var fecha = (new Date()).toLocaleString();
    $('#messages').append( $('<li title="'+fecha+'">').html('<span class="user">root</span>@<span class="host">'+response.user+'</span> <span class="hashbang">#</span> ' + response.message  ) );
    $(document).scrollTop($(document).height());
  });

});