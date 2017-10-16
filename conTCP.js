//var jsonparams = require('./jsonParams');
var fs = require('fs');
var paramsfile = __dirname + '/data/params.txt';
var parameters = new Object();
var measValues = [];
parameters = JSON.parse(fs.readFileSync(paramsfile).toString());

var objTCPSocket = new Object();
var TCPListner = require('socket.io').listen(20001,{'log colors':false, 'log level':1});
var tcpclients = [];
var sockets = [];
var net = require('net');
objTCPSocket.Host="127.0.0.1";
objTCPSocket.Port="20000";

initMeasValues();

consolemenu();

//var readline = require('readline');
//
//var rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout,
//  terminal: true
//});
//
//rl.on('line', function (cmd) {
//  console.log('You just typed: '+cmd);
//});



process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
// process.stdout.write('data: ' + chunk);

	var eingabe = chunk;
	eingabe = eingabe.replace(/\n|\r/g, "");

	switch (eingabe) {
	case "1":
        console.log("getStatusFromFlowmeter: " + chunk);
        getStatusFromFlowmeter();
		break;

	case "2":
		console.log("getAllMeasurementsFromFlowmeter: " + chunk);
		getAllMeasurementsFromFlowmeter();
		break;

	case "3":
   	 	sendTCP_Text_Message("GEOMETRY!");
   	 	console.log("send GEOMETRY!: " + chunk);
		break;

	case "4":
   	 	var tcpmessage = JSON.stringify({REQUEST: "AO"});
   	 	sendTCP_JSON_Message(tcpmessage);
		break;

	case "5":
   	 	var tcpmessage = JSON.stringify({REQUEST: "DOTESTACTIVE?" , "CHANNEL": 1 });
   	 	sendTCP_JSON_Message(tcpmessage);
		break;

	case "6":
   	 	var tcpmessage = JSON.stringify({REQUEST: "DOTESTACTIVE?" , "CHANNEL": 5 });
   	 	sendTCP_JSON_Message(tcpmessage);
		break;



	default:
		console.log (" switch default");
	}


});


function consolemenu(){
	console.log("###########################################");
	console.log("# WebUI/FLowmeter Console Interface                        ");
	console.log("# 1. Status ");
	console.log("# 2. All measurement values ");
	console.log("# 3. send GEOMETRY! ");
	console.log("# 4. Request Analog In mA Values ");
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
	console.log("# 20. send FTP!");
	console.log("# 	");	
	console.log("###########################################");
}

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
		console.log ("[TCP] tcptoflowmeter::TCP_Status |   Incoming: " + data.toString());
		tcp_client.end();

		consolemenu();
	});

	tcp_client.on('error', function(error) {

		//filemgr.appendtofile(log_file, "ERROR TCP :" + NowDate + ": " + error.toString() + '\n');
		console.log ("< Error > [TCP] tcptoflowmeter::TCP_Status | error: " + error.toString());
		tcp_client.destroy();

	});

}
function getAllMeasurementsFromFlowmeter(){

	var outData = [];

	console.log ("Start TCP Communication"  );
	strMsg = '';
	if(measValues.length > 1){
		client = new net.Socket();
		currID = 1;

		client.setTimeout(60000, function(){
			console.log({ data: "TimeOut: " + objTCPSocket.Host + ":"+ objTCPSocket.Port});
			client.destroy();
		});

		client.connect(objTCPSocket.Port, objTCPSocket.Host, function(){
			client.write('{"REQUEST":"'+ measValues[currID] + '"}');
			console.log ("< Info > [TCP] client_connect TCP_RequestValue " + measValues[currID]);
		});

		client.on('data', function(data) {
			outData.push(createMeasValueObj( JSON.parse(data)  ));

			currID++;
			if(currID < measValues.length){
				client.write('{"REQUEST":"'+ measValues[currID] + '"}');
//				console.log ("< Info > [TCP] Request: " + measValues[currID]);
			}
			else{

				client.destroy();
			}
		});

		client.on('close', function() {
			//console.log('Connection closed');
			consolemenu();
		});

		client.on('error', function(error) {

		});
	} else {
		console.log("# ERROR tcptoflowmeter::TCP_Requestvalue | measValues.length == 0: ");
	}


}

function initMeasValues(){

	console.log ("# tcptoflowmeter::initMeasValues Measuremnt Values ?");

	var input = __dirname + '/public/data/data.csv';
	var fsread = fs.createReadStream(input, {start: 0, end: 4096});
	var line='';
	var first = false;

	fsread.on('readable',function(){
		if(!first){
			line += fsread.read();
			if(line.indexOf('\n') > 0){
				var larr = line.split('\n');
				console.log(larr[0]);
				measValues = larr[0].split(',');
				first = true;
			}
		}

	})

};

function createMeasValueObj(tempObj){

	var propsOfObj = Object.keys(tempObj);
	var mvName = propsOfObj[0];
	var org_name = mvName;

	var cutidx = mvName.lastIndexOf('_');
	if(cutidx > 0){
		mvName = mvName.substring(0, cutidx);
	}

	// Dynamically BaseUnit
	var dynamicBaseUnit=getBaseUnitDynamic(mvName);


	var conversion = 1;
	var displayUnit = "";
	var SIUnit = "";

	if(dynamicBaseUnit != null){

		var unitConversionObj = findlevel1("MeasurementUnits");
		var unitDisplayObj = findlevel1("UnitDisplay");
		var uDisplay = unitDisplayObj[dynamicBaseUnit];

		var aConversionObj = unitConversionObj[dynamicBaseUnit];

		if (aConversionObj!=undefined){
		    SIUnit = aConversionObj.Base;
		    displayUnit=uDisplay;

		    if(aConversionObj.Base != uDisplay){
			conversion = aConversionObj[uDisplay];
			displayUnit=uDisplay;
		    }


		} else {


		}

	}

	console.log ("# Name: " + propsOfObj[0] + " \t | value: " + tempObj[propsOfObj[0]] + " \t | baseUnit: " + dynamicBaseUnit ) ;

	var retObj = {name:propsOfObj[0], value:tempObj[propsOfObj[0]],baseUnits:dynamicBaseUnit, conversion:conversion, displayUnit:displayUnit, SIUnit:SIUnit };
	return retObj;


}

function getBaseUnitDynamic(Value) {

    var found;
    var vBaseUnitName=null;
    found = parameters["MeasurementValues"];

    for(var BaseUnits in found){

	    var foundstring=found[BaseUnits];

	    for(var cells in foundstring){
		if (Value===foundstring[cells])
		    vBaseUnitName=BaseUnits;
	    }

	}





    return vBaseUnitName;
}

function findlevel1(paramname)
{
  //parameters = JSON.parse(fs.readFileSync(paramsfile).toString());
  var found;

  found = parameters[paramname];
  return found;
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

function TCP_write(strMsg) {


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



