const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 9090 });

var clients=[];
var msg;
var connectionIDCounter = 0;
 
wss.on('connection', function connection(ws) {

connectionIDCounter = 0;

wss.clients.forEach(function each(client) {
      connectionIDCounter++;

    });



  ws.on('message', function incoming(message) {

  	if("name" in ws){
    console.log('received: %s', message);

     
 wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {

		var msg1={msgtype:'text',
		msg:message,
		totaluser:connectionIDCounter,
		imgurl:'images/chat-avatar2.jpg',
		username:ws.name
		};

      	message.msgtype="text";
      	client.send(JSON.stringify(msg1));
      
      
      }
    });
}
else
{
	ws.name=message;
}


  });
 
msg={msgtype:'broadcast',
msg:'Welcome to the chat room',
totaluser:connectionIDCounter,
imgurl:'images/chat-avatar2.jpg'};

 console.log("client connected");
  ws.send(JSON.stringify(msg));
});