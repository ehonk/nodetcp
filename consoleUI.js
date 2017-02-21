//var jsonparams = require('./jsonParams');
var fs = require('fs');


var objTCPSocket = new Object();
var TCPListner = require('socket.io').listen(20001, { 'log colors': false, 'log level': 1 });
var tcpclients = [];
var sockets = [];
var net = require('net');
objTCPSocket.Host = "127.0.0.1";
objTCPSocket.Port = "5000";

var globalclient;

consolemenu();
keystrokehandler();




function consolemenu() {

	console.log("###########################################");
	console.log("# TCP Socket Tester                       ");
	console.log("# 1. TCP bisher ");
	console.log("# 	");
	console.log("# 2. Open TCP ");
	console.log("# 3. Start Communication ");
	console.log("# 4. Close TCP ");
	console.log("# 	");
	console.log("# Getrennte Funktionen");
	console.log("# 5. Open TCP ");
	console.log("# 6. connect TCP ");
	console.log("# 7. Write & Read TCP ");
	console.log("# 8. Close TCP ");
	console.log("# 	");
	console.log("# 9. combined functions");
	console.log("# 	");
	console.log("# 	");
	console.log("###########################################");
}



function keystrokehandler() {

	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', function (chunk) {

		var eingabe = chunk;
		eingabe = eingabe.replace(/\n|\r/g, "");

		switch (eingabe) {
			case "0":
				getFileInformation();
				break;

			case "1":
				oldTCPHandler();
				break;

			case "2":
				TCP_OpenSocket();
				break;

			case "3":
				TCP_Communication();
				break;
			case "4":
				TCP_CloseSocket();
				break;

			case "5":
				TCP_OpenSocket();
				break;
			case "6":
				TCP_Connect();
				break;
			case "7":
				TCP_write();
				break;
			case "8":
				TCP_CloseSocket();
				break;
			case "9":
				TCP_IntelliWrite("Hello");
				break;
				
			default:
				console.log(" switch default");
		}
	});
}

function getStatusFromFlowmeter() {

	var tcpmessage = "{\"REQUEST\":\"STATUS\"}";
	var tcp_client = net.connect({ port: objTCPSocket.Port }, function () {
		tcp_client.write(tcpmessage);
		//		console.log("STATUS -> " + tcpmessage);
		console.log("< Info > [TCP] tcptoflowmeter::TCP_Status | REQUEST: " + tcpmessage);
	});

	tcp_client.on('data', function (data) {
		console.log("< Info > [TCP] tcptoflowmeter::TCP_Status | Incoming Status: " + data.toString());
		tcp_client.end();

		consolemenu();
	});

	tcp_client.on('error', function (error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
		tcp_client.destroy();

	});


}


function oldTCPHandler() {

	console.log("Start oldTCPHandler");
	var strMsg = 'Hello';

	client = new net.Socket();

	client.setTimeout(60000, function () {
		console.log({ data: "TimeOut: " + objTCPSocket.Host + ":" + objTCPSocket.Port });
		client.destroy();
	});

	client.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		client.write(strMsg);
		console.log("< Info > [TCP] client_connect | Sending " + strMsg);
	});

	client.on('data', function (data) {
		console.log("< Info > [TCP] client_connect | Receiving: " + data.toString());
		client.end();
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (error) {
		console.log('Connection error');
	});

}



function TCP_Communication() {

	console.log(" TCP_Communication");
	console.log(" TCP_Communication globalclient: " + globalclient);
	var strMsg = 'Hello';

	globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		globalclient.write(strMsg);
		console.log("< Info > [TCP] client_connect | Sending " + strMsg);
	});

	globalclient.on('data', function (data) {
		console.log("< Info > [TCP] client_connect | Receiving: " + data.toString());
		globalclient.end();
	});

	globalclient.on('error', function (error) {
		console.log('Connection error: ' + error);
	});


}

function TCP_OpenSocket() {

	console.log("TCP_OpenSocket::Start globalclient: " + globalclient);
	
	if (globalclient == undefined) {
		globalclient = new net.Socket();
		console.log("TCP_OpenSocket::new Socket globalclient: " + globalclient);
//		console.log(Object.getOwnPropertyNames(globalclient)); 
	} else {
		console.log("Socket bereits erstellt");
	}
}

function TCP_Connect() {
	console.log("TCP_Connect");

	globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		console.log("< Info > [TCP] TCP_Connect::client_connect ");
	});

	globalclient.on('error', function (error) {
		console.log("< Info > [TCP] TCP_Connect::Connection error: " + error);
	});

}

function TCP_write() {
	var strMsg = 'Hello';

	//globalclient.emit('some event', { for: 'everyone' });

	if (globalclient != undefined) {
		console.log(" globalclient is defined: " + globalclient);
		globalclient.write(strMsg, function () {
			console.log("< Info > [TCP] TCP_write::write | Sending: " + strMsg);
			globalclient.on('data', function (data) {
				console.log("< Info > [TCP] TCP_write::on | Receiving: " + data.toString());
			});
		});
	} else {
		console.log(" globalclient is undefined: " + globalclient);
	}

}

function TCP_CloseSocket() {
//	console.log("Close TCP_CloseSocket");

	globalclient.on('close', function () {
		console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
		process.exit();
	});

}

function TCP_IntelliWrite(strmsg) {
	
}


