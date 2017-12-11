var objTCPSocket = new Object();
//var TCPListner = require('socket.io').listen(20001,{'log colors':false, 'log level':1});
var tcpclients = [];
var sockets = [];
var net = require('net');
objTCPSocket.Host="127.0.0.1";
objTCPSocket.Port="20000";
var globalclient = undefined;
var tcpcl;

consolemenu();
keystrokehandler();

function consolemenu(){
	console.log("###########################################");
	console.log("## Neue NET SOCKET eine Funktionen");
	console.log("# 4. One Function connect,write, close Status ");
	console.log("# 41. Timer 1000ms ");
	console.log("# 	");
	console.log("## NET SOCKET getrennte Funktionen");
	console.log("# 5. Open Socket TCP ");
	console.log("# 6. Connect TCP ");
	console.log("# 7. once! write and listen TCP ");
	console.log("# 8.   once listen TCP ");
	console.log("# 9.   write ohne listener TCP ");
	console.log("# 10. Close Socket ");
	console.log("# 11. Close TCP ");
	console.log("# 	");
	console.log("# 18. only write TCP Timer 1000ms ");
	console.log("# 	");
	console.log("## NEW Framed combined Functions");
	console.log("# 20 Frame Start");
	console.log("# 21 Frame once write");
	console.log("# 22 Frame Close");
	console.log("# 23. Timer 1000ms ");
	console.log("# 	");
	console.log("# ----------------------------	");	
	console.log("## Bisherige WebUI/FLowmeter Console Interface                        ");
	console.log("# 1. Status ");
	console.log("# 2. ERRORS switcher ");
	console.log("# 3. VERSION beautifier ");
	console.log("# 16. Timer 1000ms ");
	console.log("# 17. Timer Eingabe ms");
	console.log("# 	");
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
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			sendTCP_JSON_Message(tcpmessage);
			break;
	
		case "2":
			var tcpmessage = JSON.stringify({REQUEST: "ERRORS"});
			sendTCP_jsonmsg_switcher(tcpmessage);
			break;
		
		case "3":
			var tcpmessage = JSON.stringify({REQUEST: "VERSION"});
			sendTCP_jsonmsg_beautifier(tcpmessage);
			break;
	
		case "4":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_OneFunction(tcpmessage);
			break;
	
		case "5":
			TCP_OpenSocket();
			break;

		case "6":
			TCP_Connect();
			break;

			case "7":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_onceWriteAndListen(tcpmessage);
			break;

			case "8":
			TCP_onceListener();
			break;

			case "9":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_write(tcpmessage);
			break;

			case "10":
			TCP_CloseSocket();
			break;

			case "11":
			TCP_CloseConnection();
			break;
			
			case "16":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ sendTCP_JSON_Message(tcpmessage) }, 1000);
			break;
			
			case "18":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ TCP_write()(tcpmessage) }, 1000);
			break;

			case "41":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ TCP_OneFunction(tcpmessage);(tcpmessage) }, 1000);
			break;

			case "20":
			tcp_frame_start();

			break;

			case "21":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			tcp_frame_comonce(tcpmessage);
			break;

			case "22":
			tcp_frame_close();
			break;

			case "23":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ TCP_FrameWrite(tcpmessage); }, 1000);
			break;

			case "0":
			consolemenu();

			break;
	
		default:
			console.log (" switch default");
		}
	
	
	});
	
	}

function ____neue_Funktionen_NET_SOCKET______(){}

/**
 * 10.12.2017
 * TCP Communication in einer Funktion, open, write, listen, close
 * @param {*} tcpmsg 
 * 
 */
function TCP_OneFunction(tcpmsg){

	console.log("< Info > [TCP] TCP_OneFunction");
	/**
	 * 1. new net socket
	 * 2. connect and write
	 * 3. on data and read
	 * 4. on close and close
	 * console.log(Object.keys(tcpcl));
	 */
	
	if (tcpcl == undefined) {
		tcpcl = new net.Socket();
		console.log("< Info > [TCP] TCP_OpenSocket::new Socket erstellt: " + tcpcl);
		//console.log(" < Info >  object: " +  Object.getOwnPropertyNames(tcpcl)); 
	} else { console.log("[ERROR] Socket bereits erstellt"); }


	tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		tcpcl.write(tcpmsg);
		console.log("< Info > [TCP] connect | Sending " + tcpmsg);
	});
		
	tcpcl.on('data', function (data) {
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		tcpcl.end();
	});
		
	tcpcl.on('error', function (error) {
		console.log('< ERROR > [TCP] Connection error: ' + error);
		tcpcl.destroy();
	});

	
	tcpcl.on('close', function () {
		console.log("< Info > [TCP] on_close ");
		console.log("< Info > [TCP] ------------------------- ");
		tcpcl.destroy();
		tcpcl = undefined;
		//process.exit();
	});
	
}


function TCP_OpenSocket() {
	
	//socket.destroyed
	//socket.connecting
	console.log("< Info > TCP_OpenSocket::Start globalclient: " + globalclient);
	//	if (globalclient == undefined) {
			globalclient = new net.Socket();
			console.log("[INFO] TCP_OpenSocket::new Socket globalclient: ");
		//} else { console.log("[ERROR] Socket bereits erstellt"); }
}

function TCP_Connect() {
	console.log("< Info > TCP_Connect");

	console.log("< Info >TCP_Connect socket.destroyed: " + globalclient.destroyed );

	globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		console.log("< Info > [TCP] TCP_Connect::client_connect ");
	});
			
	globalclient.on('error', function (error) {
		console.log("< Info > [TCP] TCP_Connect::Connection error: " + error);
	});
			
}

function TCP_onceWriteAndListen(strMsg) {
	console.log("< Info > tcp_onceWriteAndListen : ");

	globalclient.write(strMsg, function () {
		console.log("< Info > [TCP] TCP_write::write | Sending: " + strMsg);
	});

	globalclient.once('data', function (data) {
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		//globalclient.destroy();
	});
}

function TCP_onceListener() {
	console.log("< Info > TCP_onceListener : ");

	globalclient.once('data', function (data) {
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		//globalclient.end();
		});
}

function TCP_write(strMsg) {

	globalclient.write(strMsg, function () {
		//console.log("< Info >  TCP_StreamListener TCP_StreamWrite: ");
		console.log("< Info > [TCP] TCP_write::write | Sending: " + strMsg);

	});
}

function TCP_CloseSocket() {

		console.log("< Info > [TCP] TCP_CloseSocket ");
		globalclient.on('close', function () {
			console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
			console.log("< Info > [TCP] ------------------------- ");
			globalclient.destroy();
			globalclient = undefined;
			delete globalclient;
			// process.exit();
		});
}

function TCP_CloseConnection() {
	console.log("< Info >  TCP_CloseConnection");
		
	globalclient.end();

	/*globalclient.on('data', function (data) {
		globalclient.destroy();
	});*/
			
}

function ____Frame_Funktionen______(){}

function  tcp_frame_start(){
	console.log("< Info > [TCP] tcp_frame_start ");
		/**
		 * 1. new net socket
		 * 2. connect and write
		 * 3. on data and read
		 * 4. on close and close
		 * 
		 */
			
		if (globalclient == undefined) {
			globalclient = new net.Socket();
			console.log("< Info > [TCP] TCP_OpenSocket::new Socket undefined: " + globalclient);


			globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
				//tcpcl.write(tcpmsg);
				console.log("< Info > [TCP] client_connect | connect ");
			});
			
			globalclient.on('error', function (error) {
				console.log('< ERROR > [TCP] Connection error: ' + error);
				globalclient.destroy();
			});
				
			globalclient.on('close', function () {
				console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
				console.log("< Info > [TCP] ------------------------- ");
				globalclient.destroy();
				globalclient = undefined;
			});

		} else { console.log("[ERROR] Socket bereits erstellt"); }

	}

function  tcp_frame_comonce(strMsg){

	console.log("< Info > [TCP] tcp_frame_comonce ");

	if (globalclient == undefined) {
		console.log("< Info > [TCP] tcp_frame_comonce CHECK undefined: " + globalclient);
		console.log("< Info > [TCP] Manueller Neustart Socket: " );
		tcp_frame_start(); 
	} else { console.log("< Info > [TCP] tcp_frame_comonce CHECK: bereits erstellt. Alles OK "); }

	globalclient.write(strMsg, function () {
		console.log("< Info > [TCP] tcp_frame_comonce::write | Sending: " + strMsg);
	});

	globalclient.once('data', function (data) {
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		//globalclient.destroy();
	});

}

function  tcp_frame_close(){
	console.log("< Info > [TCP] tcp_frame_close ");

	globalclient.destroy();
/*
	globalclient.on('close', function () {
		console.log("< Info > [TCP] tcp_frame_close::on_close ");
		console.log("< Info > [TCP] ------------------------- ");
		globalclient.destroy();
		globalclient = undefined;

	});
	*/
}


function ____alte_Funktionen______(){}
	



function sendTCP_JSON_Message(tcpmessage){

	var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
		tcp_client.write(tcpmessage);
//		console.log("STATUS -> " + tcpmessage);
		console.log ("[TCP] tcptoflowmeter::TCP_Status | tcpmessage: " + tcpmessage);
	});

	tcp_client.on('data', function(data){

		var act = new Date(new Date().getTime()).toLocaleTimeString();
		var act2 = new Date();
		var tsact = act2.getHours() + ":" + act2.getMinutes() + ":" + act2.getSeconds() + ":" + act2.getMilliseconds();
		console.log (tsact + " [TCP] Incoming: " + data.toString());
		tcp_client.end();

		//consolemenu();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
		tcp_client.destroy();

	});

}

function sendTCP_jsonmsg_beautifier(tcpmessage){
	
		  var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
			tcp_client.write(tcpmessage);
			console.log ("[TCP] tcptoflowmeter::TCP_Status | tcpmessage: " + tcpmessage);
		  });
	
		  tcp_client.on('data', function(data){
			  json_beautifier(data.toString());
			tcp_client.end();
	
		  });
	
		  tcp_client.on('error', function(error) {
			console.log ("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
			tcp_client.destroy();
	
		  });
	
	}


function json_beautifier(jsonstr){
			
	//	console.log ("[TCP] jsonbeautifier |  Incoming : " + jsonstr);
	//	var jsondata = JSON.parse(data.data.replace(/\binf\b/g, "null"));
		var jsonObj = new Object();
		jsonObj = JSON.parse(jsonstr.replace(/\binf\b/g, "null") );
		
		for (var key in jsonObj) {
			if (typeof jsonObj[key] === 'object')
				console.log ("key: " + key + " | Eleminate: " + jsonObj[key]["Eliminate"] + " | Vappr: " + jsonObj[key]["Vappr"] + " | Pos: " + jsonObj[key]["position"]  );
			else 
				console.log ( key + " :" + jsonObj[key] );
		}
}
		
function json_keyoutput(jsonstr){
	var jsonObj = new Object();
	jsonObj = JSON.parse(jsonstr);
		
	for (var key in jsonObj) {
			console.log ( "TS: " + jsonObj[key] + " | " + key + " | " +  bit_text( parseInt(key) ));
//			console.log ( "TS: " + jsonObj[key] + " | " + key + " | " +  bit_text( parseInt(key) ));
		}
	}

		
function json_tree(jsonstring){
			
		console.log ("[TCP] tcptoflowmeter::TCP_Status |   Incoming: " + jsonstring );
			
		var jsonObj = new Object();
		jsonObj = JSON.parse(jsonstring.replace(/\binf\b/g, "null"));
			
			
		if ( jsonObj['RESPONSE'] ){ console.log ("-> RESPONSE: " + jsonObj['RESPONSE'] );}
		for (var key in jsonObj) {
				if (key !=="RESPONSE") 
				console.log ("- " + key  +  " : " + jsonObj[key] );
			}
		}



function _tcp_frame_start() {}
function _tcp_frame_once() {}
function _tcp_frame_close() {}

function tcp_wa_jsonstring() {}
function tcp_na_jsonstring() {}
function tcp_wa_jsonrequest() {}
function tcp_na_msg() {}
function tcp_wa_msg() {}
function tcp_completeValueObject() {}
function tcp_valuemap() {}