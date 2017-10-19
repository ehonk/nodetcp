var net = require('net'),
JsonSocket = require('json-socket');
var port = 9838; //The same port that the server is listening on
var host = '127.0.0.1';

var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);


socket.on('connect', function() { //Don't send until we're connected
    
});
socket.sendMessage({a: 5, b: 7});
socket.on('message', function(message) {
    console.log('The result is: '+message.result);
});
socket.sendMessage({a: 5, b: 7});
socket.on('message', function(message) {
    console.log('The result is: '+message.result);
});


/*
consolemenu();
keystrokehandler();


function consolemenu(){
	console.log("###########################################");
	console.log("# 1. Open TCP ");
	console.log("# 2. connect TCP ");
	console.log("# 3.tcpconnectAndSend ");
	console.log("# 4. only write TCP ");
	console.log("# 5. write and listen TCP");
	console.log("# 6. Close Connection ");
	console.log("# 7. Close TCP ");
	console.log("# 	");
	console.log("# 18. only write TCP Timer 1000ms ");

	console.log("###########################################");
}

function keystrokehandler() {
	
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	
	process.stdin.on('data', function (chunk) {
	// process.stdout.write('data: ' + chunk);
	
		var eingabe = chunk;
		eingabe = eingabe.replace(/\n|\r/g, "");
	
		switch (eingabe) {
		case "1":
			tcpconnect();
			break;
	
		case "2":
            tcpconnect();
			break;
		
		case "3":
			tcpconnectAndSend();
			break;
	
		case "4":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_OneFunction(tcpmessage);
			break;
	
		case "5":
			TCP_OpenSocket();
			break;
	
		case "6":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_Communication(tcpmessage);
			break;
	
		case "7":
			TCP_CloseSocket();
			break;

		case "0":
			consolemenu();

			break;
	
		default:
			console.log (" switch default");
		}
	
	
	});
	
	}

function tcpconnect(){
    console.log("< Info >  TCP_Connect");
    socket.connect(port, host);
}

function tcpconnect(){
    console.log("< Info >  TCP_Connect");
    socket.connect(port, host);
}

function tcpconnectAndSend(){
    console.log("< Info >  tcpconnectAndSend");
    socket.on('connect', function() { //Don't send until we're connected
    socket.sendMessage({a: 5, b: 7});
    socket.on('message', function(message) {
    console.log('The result is: '+message.result);
    });
});
}


*/