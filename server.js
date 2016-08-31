var io = require('socket.io')();

io.on('connection', function(socket){
	console.log("En el Limbo", socket.client.id);
	socket.on('conectado',function(data){
		console.log(socket.client.id, " has connected");
		socket.broadcast.emit('conectted', data);
	});

	socket.on('messageFromClient',function(message){
		console.log("Message from remote port",socket.request.connection.remotePort," is:", message);
		var response = {message: message, user: socket.client.id};
		//socket.broadcast.emit('drawMessage', data);
		io.emit('messageToClient', response);
		//socket.volatile.emit('drawMessage', data);
	});

	socket.on('disconnect',function(){
		console.log("disconnect");
		//socket.broadcast.emit('disconnectted', user);
	});

});

io.listen(3000), {origins: '*:*'};