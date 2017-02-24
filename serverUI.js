//var jsonparams = require('./jsonParams');
var fs = require('fs');


//var objTCPSocket = new Object();
//var TCPListner = require('socket.io').listen(20001, { 'log colors': false, 'log level': 1 });
//objTCPSocket.Host = "127.0.0.1";
//objTCPSocket.Port = "5000";

var tcpclients = [];
var sockets = [];
var net = require('net');


simpleServer();


function simpleServer() {

var textChunk = '';
	console.log(" simpleServer");
	var server = net.createServer(function(socket) {
		socket.name = socket.remoteAddress + ":" + socket.remotePort 
		socket.write("Welcome " + socket.name + "\n");
		console.log(" Client verbunden:  " +socket.name );

		// Handle incoming messages from clients.
		socket.on('data', function(data){
			console.log(" nodeTCP < " + data);
			textChunk = data.toString('utf8');
			console.log(" nodeTCP > " + textChunk);
			socket.write(textChunk);
		});

		// Remove the client from the list when it leaves
  		socket.on('end', function () {
    		console.log("Client beendet " + socket.name + "\n");
  		});


	});

server.listen(5010, '127.0.0.1');
}

