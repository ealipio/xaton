var io = require('socket.io')();

io.on('connection', function(socket){

	socket.on('conectado',function(data){
		console.log(socket.client.id, " has connected");
		socket.broadcast.emit('conectted', data);
	});

	socket.on('messageFromClient',function(message){
		console.log("Message from remote port",socket.request.connection.remotePort," is:", message);
		var response = {message: message, user: socket.client.id};
		io.emit('messageToClient', response);
	});

	socket.on('disconnect',function(){
		console.log(socket.client.id, " left the room");
	});

});

io.listen(3000), {origins: '*:*'};
console.log("Listening for port:3000");
