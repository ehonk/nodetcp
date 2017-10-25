var tcpcl;

function tcp_starter(req,res){
	
			
		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
		} 
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			console.log("< Info > client_connect ");
			res.contentType('json');
			res.send({ data: "< Info > client_connect" });
		});
			
		tcpcl.on('error', function (error) {
			res.contentType('json');
			res.send({ data: error.toString() });			
			tcpcl.destroy();
		});
			
		tcpcl.on('close', function () {
			tcpcl.destroy();
			tcpcl = undefined;
		});
		
	}

function tcp_writelisten(req,res){

			var vRequest = req.body.jsonmsg;
			console.log("< Info > tcp_writelisten " + vRequest);

			if (tcpcl !== undefined) {
				tcpcl.write(vRequest, function () {
					console.log("< Info > tcp_write: " + vRequest);
				});
			}
			
			tcpcl.on('data', function (data) {
    			res.contentType('json');
				res.send({ data: data.toString() });
				console.log("< Info > tcp_listen: " + data.toString());
			});
}


function tcp_allinone(req,res){
	
		var vRequest = req.body.jsonmsg;
		console.log("< Info > tcp_allinone " + vRequest);

		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
		} 
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			tcpcl.write(vRequest);

		});
			
		tcpcl.on('data', function (data) {
			res.contentType('json');
			res.send({ data: data.toString() });
			tcpcl.end();
		});
			
		tcpcl.on('error', function (error) {
			res.contentType('json');
			res.send({ data: error.toString() });
			tcpcl.destroy();
		});
	
		
		tcpcl.on('close', function () {
			tcpcl.destroy();
			tcpcl = undefined;
		});
}


/**
 * 
 * 
 * 
 * Hello Guys

i need some help for my project. I need to receive TCP Messages in nodejs and send them to a web interface via Jquery Ajax. 

The Requests are triggerd in the webinterface and send via ajax to the node.js server. This one send a request to tcp server (c++) and pass the answer to the webui.

I made a function for test purporses which includes all necessary tasks.
function tcp_allinone(req,res){
	
		var vRequest = req.body.jsonmsg;
		console.log("< Info > tcp_allinone " + vRequest);

		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
		} 
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			tcpcl.write(vRequest);

		});
			
		tcpcl.on('data', function (data) {
			res.contentType('json');
			res.send({ data: data.toString() });
			tcpcl.end();
		});
			
		tcpcl.on('error', function (error) {
			res.contentType('json');
			res.send({ data: error.toString() });
			tcpcl.destroy();
		});
	
		
		tcpcl.on('close', function () {
			tcpcl.destroy();
			tcpcl = undefined;
		});
}

For this project the connection must be hold open and it is not wanted to reopen the connection for each request. In consequence i write to functions, one to start the socket and open the connection, the second to write and receiving messages:

function tcp_starter(req,res){
	
			
		if (tcpcl == undefined) {
			tcpcl = new net.Socket();
		} 
	
		tcpcl.connect(objTCPSocket.Port, objTCPSocket.Host, function () {
			console.log("< Info > client_connect ");
			res.contentType('json');
			res.send({ data: "< Info > client_connect" });
		});
			
		tcpcl.on('error', function (error) {
			res.contentType('json');
			res.send({ data: error.toString() });			
			tcpcl.destroy();
		});
			
		tcpcl.on('close', function () {
			tcpcl.destroy();
			tcpcl = undefined;
		});
		
	}

function tcp_writelisten(req,res){

			var vRequest = req.body.jsonmsg;
			console.log("< Info > tcp_writelisten " + vRequest);

			if (tcpcl !== undefined) {
				tcpcl.write(vRequest, function () {
					console.log("< Info > tcp_write: " + vRequest);
				});
			}
			
			tcpcl.on('data', function (data) {
    			res.contentType('json');
				res.send({ data: data.toString() });
				console.log("< Info > tcp_listen: " + data.toString());
			});
}

tcp_starter is called at the beginning, tcp_writerlisten each two seconds to get new strings from the server. But with this construct i get the following error message:
ttp.js:707
    throw new Error('Can\'t set headers after they are sent.');
          ^
Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (http.js:707:11)

I guess the problem is, that with every function call tcp_writelisten i establish a new Eventlistener and so on i get i++ Receiving messages. 

How can i destroy the eventlistener on('data' after receiving without reconnecting? How can i improve this structure?

Big thanks for your help




 * 
 */
