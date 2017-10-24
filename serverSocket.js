console.log("< Info > [TCP] server " );
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){
    console.log("< Info > [TCP] server event" );
  });
  client.on('disconnect', function(){
    
    
  });
});
server.listen(3000);