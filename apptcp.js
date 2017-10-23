var objTCPSocket = new Object();
var TCPListner = require('socket.io').listen(20001,{'log colors':false, 'log level':1});
var tcpclients = [];
var sockets = [];
var net = require('net');
objTCPSocket.Host="127.0.0.1";
objTCPSocket.Port="20000";
var globalclient = undefined;
var tcpcl;
var activelistener=0;

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


function TCP_FrameFunction(){
	
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
			//console.log(" < Info >  object: " +  Object.getOwnPropertyNames(tcpcl)); 
		} else { console.log("[ERROR] Socket bereits erstellt"); }
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			//tcpcl.write(tcpmsg);
			console.log("< Info > [TCP] client_connect | connect ");
		});
			
		tcpcl.on('data', function (data) {
			var d = new Date();
			var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
			//tcpcl.end();
		});
			
		tcpcl.on('error', function (error) {
			console.log('< ERROR > [TCP] Connection error: ' + error);
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

function TCP_FrameWrite(tcpmsg){

	if (tcpcl == undefined) {
		console.log (" tcpc1 is undefined");
		tcpcl = new net.Socket();
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			//tcpcl.write(tcpmsg);
			console.log("< Info > [TCP] client_connect | connect ");
		});
	}
	else {
		console.log (" tcpc1 is Defined"); 

		tcpcl.write(tcpmsg, function () {
			console.log("< Info >  TCP_StreamListener TCP_StreamWrite: " + activelistener );
			console.log("< Info > [TCP] TCP_FrameWrite::write | Sending: " + tcpmsg);
	
		});
	}
}

function TCP_FrameWriteAndEnd(tcpmsg){
		
		
				tcpcl.write(tcpmsg, function () {
					console.log("< Info >  TCP_StreamListener TCP_StreamWrite: " + activelistener );
					console.log("< Info > [TCP] TCP_FrameWrite::write | Sending: " + tcpmsg);
			tcpcl.end();
				});
}

exports.json_request =json_request;
exports.TCP_FrameWriteAndEnd = TCP_FrameWriteAndEnd;
exports.TCP_FrameWrite = TCP_FrameWrite;
exports.TCP_FrameFunction = TCP_FrameFunction;