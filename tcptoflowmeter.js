var net = require('net');



var objTCPSocket = new Object();
    objTCPSocket.Host="127.0.0.1";
    objTCPSocket.Port="20000";

TCP_Message();

function TCP_Message()
{
	var strData = "HELLO";

	var tcp_client = new net.Socket();
	//var tcp_client = net.connect({port:objTCPSocket.Port}, function(){		// net.connect erzeugt ein net.Socket Objekt automatisch
	tcp_client.connect( {port: objTCPSocket.Port, host: objTCPSocket.Host}, function() {
		tcp_client.write(strData);
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message | REQUEST: " + strData);
	});

	tcp_client.on('data', function(data){
		//res.contentType('json');
		//res.send({ data: data.toString() });
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message | Incoming: " + data.toString());
		tcp_client.end();
	});

	tcp_client.on('error', function(error) {

		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Message | error: " + error.toString());
		//res.contentType('json');
		//res.send({ data: error.toString() });
		tcp_client.destroy();

	});

}

/*
var client = new net.Socket();


client.connect(20000, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function(err) {
   console.log(err)
})
*/
/*


var http = require('http');
var url = require('url');
var util = require('util');
var express = require('express');

var objTCPSocket = new Object();
var TCPListner = require('socket.io').listen(20001,{'log colors':false, 'log level':1});
var tcpclients = [];
var sockets = [];
var net = require('net');

var listner2flowmeter;

var measValues = [];
var AIReqCount;

    objTCPSocket.Host="127.0.0.1";
    objTCPSocket.Port="20000";



//AJAX TCP Aufruf f�r Alles andere: Ben�tigt JSON FORMAT !
function TCP_Message(req,res)
{
	var strData = "HELLO";

//	console.log("TCP_Message: " + strData);


	var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
		tcp_client.write(strData);
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message | REQUEST: " + tcpmessage);
//		console.log("REQUEST -> " + tcpmessage);
	});

	tcp_client.on('data', function(data){
		res.contentType('json');

		res.send({ data: data.toString() });
//		console.log("REQUEST <- " + data.toString());
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message | Incoming: " + data.toString());
		tcp_client.end();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Message | error: " + error.toString());
//		console.log("TCP_Purge -> error : " + error.toString());
		res.contentType('json');
		res.send({ data: error.toString() });
		tcp_client.destroy();

	});

}

function TCP_Message_FromNodeJS(strData)
{


	console.log("[TCP] Node Message: " + strData);


	var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
		tcp_client.write(strData);
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message_FromNodeJS | REQUEST: " + strData);
//		console.log("TCP_Message -> " + strData);
	});

	tcp_client.on('data', function(data){
//		res.contentType('json');

//		res.send({ data: data.toString() });
//		console.log("[TCP] Incoming <- " + data.toString());
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Message_FromNodeJS | Incoming: " + data.toString());
		tcp_client.end();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Message_FromNodeJS | error: " + error.toString());
//		console.log("TCP_Purge -> error : " + error.toString());
//		res.contentType('json');
//		res.send({ data: error.toString() });
		tcp_client.destroy();

	});

}




function openTCPListner(req, res)
{

	//MC - 2013-07-09
	// create a server for real time data incoming from flowmeter = listner2flowmeter
	// and a socket.io connection to the client in browser - highchart
	var strData = req.body.strData;

try{
	if(strData === 'LISTEN'){

		console.log("KNOWLEDGE:openTCPListner in node.js, sendata: " + req.body.strData);
		sockets=[];

		if(listner2flowmeter === undefined){
			console.log("listner2flowmeter === undefined start");
			var net = require('net');
			console.log("listner2flowmeter === undefined start 2");

			listner2flowmeter = net.createServer(function(c) { //'connection' listener

				console.log('openTCPListner server connected');
				var msg_buf = '';
				var in_msg = '';
				//sockets.push(c);

				c.on('end', function() {
					console.log('openTCPListner server disconnected');
				});

				c.on('data', function(d) {

					msg_buf += d;
					var npos = msg_buf.indexOf('\n');
					if(npos > 0){
						in_msg = msg_buf.split('\n')[0];
						msg_buf = msg_buf.substring(npos + 1);
						//io.sockets.emit(in_msg);
						//c.write(in_msg);
						TCPListner.sockets.emit('measdata',in_msg);

					}

				});
				c.on('message', function(m){
					console.log('openTCPListner MESSAGE: ' + m);
				});
				c.on('close', function(){
					console.log('openTCPListner: socket closed');
				});

			});
			console.log("listner2flowmeter === undefined start 3");

			listner2flowmeter.listen(20002, function() { //'listening' listener
				console.log('openTCPListner I  server bound');
			});


		}
		else{
			console.log('openTCPListner reopen the server');
			listner2flowmeter.listen(20002, function() { //'listening' listener
				console.log('openTCPListner II server bound');
			});
		}
	}
	else{
		if(listner2flowmeter !== undefined){
			console.log(" if listner2flowmeter != undefined send close: " + req.body.strData);
//			var len = sockets.length;
//	        for (var i = 0; i < len; i ++) {
//	        	sockets[i].end();
//	        }
//	        sockets = [];
	        listner2flowmeter.close();
		}
	}



}
catch(err){
	console.log('ERROR -> ' + err);

}

    res.contentType('json');
    res.send({ data: 'OK' });
}


TCPListner.sockets.on('connection',function(socket){
	//tcpclients.push(socket);
	console.log('TCPlistener incoming connection from ' + socket.address);
	socket.on('message',function(message){
		console.log('TCPlistener got message -> ' + message);
		socket.send('Hi from beagle server!');
	});



});





exports.TCP_Request=TCP_Request;

exports.openTCPListner = openTCPListner;
exports.TCP_RequestSoloValueWithUnit=TCP_RequestSoloValueWithUnit;
exports.TCP_Purge = TCP_Purge;
exports.TCP_Status=TCP_Status;
exports.TCP_Message_FromNodeJS=TCP_Message_FromNodeJS;
exports.TCP_Message=TCP_Message;

*/