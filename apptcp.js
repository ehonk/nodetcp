var objTCPSocket = new Object();
//var TCPListner = require('socket.io').listen(20001,{'log colors':false, 'log level':1});
var tcpclients = [];
var sockets = [];
var net = require('net');
objTCPSocket.Host="127.0.0.1";
objTCPSocket.Port="20000";
var globalclient = undefined;
var tcpcl;
var activelistener=0;
var countlistener=0;
var lastlistener=0;

console.log('< INFO > apptcp.js loaded ');

function json_request(req,res) {

    console.log('< INFO >  json_request ');

    var vRequest = req.body.REQUEST;
    var d = new Date();
    var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();

    console.log('< INFO >  json_request vRequest: ' + vRequest );
    res.contentType('json');
    res.send({ data: "Hello from node|" + dd });
}

/** @description Determines the Frame for TCP Communication
 */
function TCP_FrameFunction(req,res){
	
		/**
		 * 1. new net socket
		 * 2. connect and write
		 * 3. on data and read
		 * 4. on close and close
		 * 
		 */
			
		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
			console.log("< Info > [TCP] TCP_OpenSocket::new Socket erstellt: " + tcpcl);

		} else { console.log("[ERROR] Socket bereits erstellt"); }
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			//tcpcl.write(tcpmsg);
			console.log("< Info > [TCP] client_connect | connect ");
			res.contentType('json');
			res.send({ data: "[TCP] client_connect" });
		});
		
		/*
		tcpcl.on('data', function (data) {

			var d = new Date();
			var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());

			// Listener hochschicken
			res.contentType('json');
			res.send({ data: data.toString() });
			//tcpcl.end();
		});*/
			
		tcpcl.on('error', function (error) {
			console.log('< ERROR > [TCP] Connection error: ' + error);
			res.contentType('json');
			res.send({ data: error.toString() });			
			tcpcl.destroy();
		});
			
		tcpcl.on('close', function () {
			console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
			console.log("< Info > [TCP] ------------------------- ");
			tcpcl.destroy();
			tcpcl = undefined;
			//process.exit();
		});
		
	}

/** @description Determines the Write and Listen Function for TCP Communication
 * @author Andreas
 * @param {number} radius The radius of the circle.  
 * @return {number}  
 */
function TCP_FrameWrite(req,res){

			var vRequest = req.body.JSONMSG;
			console.log("< Info > [TCP] TCP_FrameWrite: vRequest " + vRequest);

			if (tcpcl !== undefined) {
				tcpcl.write(vRequest, function () {
					countlistener=0;
					//console.log("< Info >  TCP_StreamListener TCP_StreamWrite: " + activelistener );
					console.log("< Info > [TCP] TCP_FrameWrite::write | Sending: " + vRequest);
				});
			}
			else {
				console.log (" tcpc1 is undefined");
				/*
				tcpcl = new net.Socket();
				tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
					//tcpcl.write(tcpmsg);
					console.log("< Info > [TCP] client_connect | connect ");
				});*/
				TCP_FrameFunction();
			}

			// Listener
			
			tcpcl.once('data', function (data) {
			// Listener hochschicken
				if (countlistener==0) {
					res.contentType('json');
					res.send({ data: data.toString() });
					var d = new Date();
					var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
					console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
					console.log("< Info > [TCP] TCP_FrameWrite: countlistener " + countlistener );
				} else console.log("< Info > [TCP] TCP_FrameWrite: NO SEND countlistener " + countlistener );
					countlistener++;
					//tcpcl.end();
				});
}

function TCP_FrameWriteAndEnd(tcpmsg){
			
	tcpcl.write(tcpmsg, function () {
		console.log("< Info >  TCP_StreamListener TCP_StreamWrite: " + activelistener );
					console.log("< Info > [TCP] TCP_FrameWrite::write | Sending: " + tcpmsg);
			tcpcl.end();
				});
}

function TCP_OneFunction(req,res){
	
	console.log("< Info > [TCP] TCP_OneFunction: " + tcpcl);
		/**
		 * 1. new net socket
		 * 2. connect and write
		 * 3. on data and read
		 * 4. on close and close
		 * 
		 */
		
		var vRequest = req.body.JSONMSG;

		console.log("< Info > [TCP] TCP_OneFunction: vRequest " + vRequest);

		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
			console.log("< Info > [TCP] TCP_OpenSocket::new Socket erstellt: " + vRequest);
			//console.log(" < Info >  object: " +  Object.getOwnPropertyNames(tcpcl)); 
		} else { console.log("[ERROR] Socket bereits erstellt"); }
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			tcpcl.write(vRequest);
			console.log("< Info > [TCP] client_connect | Sending " + vRequest);
		});
			
		tcpcl.on('data', function (data) {
			var d = new Date();
			var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
			
			res.contentType('json');
			res.send({ data: data.toString() });
			
			tcpcl.end();
		});
			
		tcpcl.on('error', function (error) {
			console.log('< ERROR > [TCP] Connection error: ' + error);
			res.contentType('json');
			res.send({ data: error.toString() });
			tcpcl.destroy();
		});
	
		
		tcpcl.on('close', function () {
			console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
			console.log("< Info > [TCP] ------------------------- ");
			tcpcl.destroy();
			tcpcl = undefined;
			//process.exit();
		});
		
	}


exports.TCP_OneFunction = TCP_OneFunction;
exports.json_request =json_request;
exports.TCP_FrameWriteAndEnd = TCP_FrameWriteAndEnd;
exports.TCP_FrameWrite = TCP_FrameWrite;
exports.TCP_FrameFunction = TCP_FrameFunction;