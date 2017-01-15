var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server from node \r\n');
	socket.pipe(socket);
});

server.listen(20000, '127.0.0.1');