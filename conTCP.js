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

consolemenu();
keystrokehandler();

function consolemenu(){
	console.log("###########################################");
	console.log("# WebUI/FLowmeter Console Interface                        ");
	console.log("# 1. Status ");
	console.log("# 2. ERRORS switcher ");
	console.log("# 3. VERSION beautifier ");
	console.log("# 16. Timer 1000ms ");
	console.log("# 17. Timer Eingabe ms");
	console.log("# 	");
	console.log("# ----------------------------	");
	console.log("# NET SOCKET eine Funktionen");
	console.log("# 4. One Function connect,write, close Status ");
	console.log("# 41. Timer 1000ms ");
	console.log("# 	");
	console.log("# NET SOCKET getrennte Funktionen");
	console.log("# 5. Open Socket TCP ");
	console.log("# 6. Connect TCP ");
	console.log("# 7. Stream_listener TCP ");
	console.log("# 8. Stream_write TCP ");
	console.log("# 9. Send Single Message and Listen TCP");
	console.log("# 10. Close Connection ");
	console.log("# 11. Close TCP ");
	console.log("# 12. Remove Listener ");
	console.log("# 	");
	console.log("# 18. only write TCP Timer 1000ms ");
	console.log("# 	");
	console.log("# 20 Frame Funtion");
	console.log("# 21 Frame Write");
	console.log("# 22 Frame And End Write");
	console.log("# 23. Timer 1000ms ");
	console.log("# 	");
	console.log("# 9. combined functions");
	console.log("# 21. Timer 1000ms ");
	console.log("# 22. Timer Eingabe ms ");
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
			TCP_StreamListener();
			break;

			case "8":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_StreamWrite(tcpmessage);
			break;


			case "9":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_SingleMsgAndListen(tcpmessage);

			break;

			case "10":
			TCP_CloseConnection();
			break;
			
		
			case "11":
			TCP_CloseSocket();
			break;

			case "12":
			TCP_RemoveListener();
			break;

			case "16":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ sendTCP_JSON_Message(tcpmessage) }, 1000);
			break;
			
			case "18":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ TCP_StreamWrite()(tcpmessage) }, 1000);
			break;

			case "41":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			setInterval(function(){ TCP_OneFunction(tcpmessage);(tcpmessage) }, 1000);
			break;

			case "20":
			TCP_FrameFunction();

			break;

			case "21":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_FrameWrite(tcpmessage);
			break;

			case "22":
			var tcpmessage = JSON.stringify({REQUEST: "STATUS"});
			TCP_FrameWriteAndEnd(tcpmessage);
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

function TCP_OneFunction(tcpmsg){

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
		tcpcl.write(tcpmsg);
		console.log("< Info > [TCP] client_connect | Sending " + tcpmsg);
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
		console.log("< Info > [TCP] TCP_CloseSocket::on_close ");
		console.log("< Info > [TCP] ------------------------- ");
		tcpcl.destroy();
		tcpcl = undefined;
		//process.exit();
	});
	
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
		/*
		tcpcl = new net.Socket();
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			//tcpcl.write(tcpmsg);
			console.log("< Info > [TCP] client_connect | connect ");
		});*/
		TCP_FrameFunction();
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

function TCP_OpenSocket() {
	
	//socket.destroyed
	//socket.connecting
	console.log("[INFO] TCP_OpenSocket::Start globalclient: " + globalclient);
	activelistener=0;
		
	//	if (globalclient == undefined) {
			globalclient = new net.Socket();
			console.log("[INFO] TCP_OpenSocket::new Socket globalclient: " + globalclient);
		//} else { console.log("[ERROR] Socket bereits erstellt"); }
}

function TCP_Connect() {
	console.log("< Info >  TCP_Connect");

	console.log("[INFO] TCP_Connect socket.destroyed: " + globalclient.destroyed );

	globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
		console.log("< Info > [TCP] TCP_Connect::client_connect ");
	});
			
	globalclient.on('error', function (error) {
		console.log("< Info > [TCP] TCP_Connect::Connection error: " + error);
	});
			
}

function TCP_StreamListener() {

	activelistener++;

	globalclient.once('data', function (data) {

		console.log("< Info >  TCP_StreamListener activelistener: " + activelistener );
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		//globalclient.end();
		});
}

function TCP_StreamWrite(strMsg) {
	globalclient.write(strMsg, function () {
		console.log("< Info >  TCP_StreamListener TCP_StreamWrite: " + activelistener );
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
			// process.exit();
		});
}


function TCP_Communication(tcpmsg) {
			
		console.log(" TCP_Communication");
		console.log(" TCP_Communication globalclient: " + globalclient);
		
		globalclient.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			globalclient.write(tcpmsg);
			console.log("< Info > [TCP] client_connect | Sending " + tcpmsg);
		});
			
		globalclient.on('data', function (data) {
			var d = new Date();
			var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
			globalclient.end();
		});
			
		globalclient.on('error', function (error) {
			console.log('< ERROR > [TCP] Connection error: ' + error);
			globalclient.destroy();
		});

}
			
			

	
function TCP_CloseConnection() {
	console.log("< Info >  TCP_CloseConnection");
		
	globalclient.end();

	/*globalclient.on('data', function (data) {
		globalclient.destroy();
	});*/
			
}

function TCP_SingleMsgAndListen(strMsg) {
			
//globalclient.emit('some event', { for: 'everyone' });
	globalclient.write(strMsg, function () {
		console.log("< Info > [TCP] TCP_write::write | Sending: " + strMsg);

	});

	globalclient.on('data', function (data) {
		activelistener++;
		console.log("< Info >  TCP_StreamListener activelistener: " + activelistener );
		var d = new Date();
		var dd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
		console.log("< Info > [TCP] TS: " + dd + " | Receiving: " + data.toString());
		globalclient.destroy();
		});

/*
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
	}*/
}
			
function TCP_RemoveListener(){
	
		//console.log("Events: " + EventEmitter.listenerCount(globalclient, 'on'));
		console.log("< Info >  TCP_RemoveListener");
	
		globalclient.removeListener('data', function () { 
			console.log("< Info >  removeListener"); 
		});
	
	}


function ____alte_Funktionen______(){}
	
function getStatusFromFlowmeter(){

	var tcpmessage="{\"REQUEST\":\"STATUS\"}";
	var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
		tcp_client.write(tcpmessage);
//		console.log("STATUS -> " + tcpmessage);
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Status | REQUEST: " + tcpmessage);
	});

	tcp_client.on('data', function(data){
		console.log ("< Info > [TCP] tcptoflowmeter::TCP_Status | Incoming Status: " + data.toString());
		tcp_client.end();

		consolemenu();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
		tcp_client.destroy();

	});


}

function sendTCP_Text_Message(tcpmessage){

	//var tcpmessage="{\"REQUEST\":\"STATUS\"}";
	var tcp_client = net.connect({port:objTCPSocket.Port}, function(){
		tcp_client.write(tcpmessage);
//		console.log("STATUS -> " + tcpmessage);
		console.log ("[TCP] sendTCP_Text_Message | tcpmessage: " + tcpmessage);
	});

	tcp_client.on('data', function(data){
		console.log ("[TCP] sendTCP_Text_Message |  Incoming : " + data.toString());
		tcp_client.end();

		consolemenu();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
		tcp_client.destroy();

	});


}

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



/*
function TCP_RequestValue(req, res){
	var strData = req.body.strData;
	var NowDate = new Date();
	var outData = [];
	strMsg = '';
	if(measValues.length > 1){
		client = new net.Socket();
		currID = 1;
		client.setTimeout(60000, function(){
			res.contentType('json');
			//res.send({ data: "TimeOUTTTT: " + objTCPSocket.Host + ":"+ objTCPSocket.Port, unitDisplay: JSON.stringify(dataUnitDisplay), measurementUnits: JSON.stringify(dataMeasurementUnits)   });
			res.send({ data: "TimeOut: " + objTCPSocket.Host + ":"+ objTCPSocket.Port});
			client.destroy();
		});
		client.connect(objTCPSocket.Port, objTCPSocket.Host, function(){
			client.write('{"REQUEST":"'+ measValues[currID] + '"}');
			console.log ("< Info > [TCP] client_connect TCP_RequestValue " + measValues[currID]);
		});
		client.on('data', function(data) {
			outData.push(servercode.createMeasValueObj( JSON.parse(data)  ));
			currID++;
			if(currID < measValues.length){
				client.write('{"REQUEST":"'+ measValues[currID] + '"}');
				console.log ("< Info > [TCP] Request: " + measValues[currID]);
			}
			else{
			    res.contentType('json');
				res.send({ data: outData });
				client.destroy();
			}
		});
		client.on('close', function() {
			//console.log('Connection closed');
		});
		client.on('error', function(error) {
			res.contentType('json');
			res.send({ data: JSON.stringify(error)});
		});
	} else {
		console.log("# ERROR tcptoflowmeter::TCP_Requestvalue | measValues.length == 0: ");
	}
};
*/



function TCP_IntelliWrite(strmsg) {
	
}