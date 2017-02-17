const WebSocket = require('ws');
var Message=require('./App/message.js');
const wss = new WebSocket.Server({ port: 9090 });

var clients=[];
var connectionIDCounter = 0;
 
wss.on('connection', function connection(ws) {

connectionIDCounter = 0;

wss.clients.forEach(function each(client) {
      connectionIDCounter++;

    });



  ws.on('message', function incoming(message) {

  	if("name" in ws){
    //console.log('received: %s', message);
 
 wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
      var msg1=new Message('text',message,connectionIDCounter,'null',ws.name);
		  client.send(JSON.stringify(msg1));    
      }
    });
}
else
{
	ws.name=message;

  var onlineuser=[];

  wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
      var msg1=new Message('newuser',ws.name,connectionIDCounter,'null',"server");
      onlineuser.push(client.name);
      client.send(JSON.stringify(msg1));    
      }
    });

  var msg2=new Message('onlineuser',onlineuser,connectionIDCounter,'null',"server");
  ws.send(JSON.stringify(msg2));

  wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
      var msg1=new Message('notification',"The User "+ws.name+" has Joined The Chat",connectionIDCounter,'null',"server");
      onlineuser.push(client.name);
      client.send(JSON.stringify(msg1));    
      }
    });


}


  });
 

 var msg1=new Message('broadcast','Welcome to the chat room',connectionIDCounter,'null',ws.name);

 


 console.log("client connected");
  ws.send(JSON.stringify(msg1));
});