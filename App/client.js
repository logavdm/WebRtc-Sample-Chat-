var msgtextbox=document.getElementById('msg');
var chatbox=document.getElementById('chatlist');
var useronline=document.getElementById('useronline');
var person="demo";

    	var conn = new WebSocket('ws://localhost:9090');
    	
  
conn.onopen = function () { 
   console.log("Connected to the signaling server");
   person = prompt("Please enter your name", "username");
   conn.send(person) ;
}; 

conn.onmessage = function (msg) { 



if(JSON.parse(msg.data).msgtype=='broadcast'){

var content="<div class='alert alert-success '><span class='alert-icon'><i class='fa fa-comments-o'></i></span><div class='notification-info'><ul class='clearfix notification-meta'><li class='pull-left notification-sender'>Message From Admin</li><li class='pull-right notification-time'>"+formatAMPM(new Date())+"</li></ul><p><a href='#''>"+JSON.parse(msg.data).msg+"</a></p></div></div>";
	document.getElementById('chatlist').insertAdjacentHTML('beforeend', content);
	document.getElementById('totaluser').textContent=JSON.parse(msg.data).totaluser;

}

else if(JSON.parse(msg.data).msgtype=='newuser'){

  var content="<div class=\"prog-row\"><div class=\"user-thumb\"><a href=\"#\"><img src=\"images/avatar1_small.jpg\" alt=\"\"></a></div><div class=\"user-details\"><h4><a href=\"#\">"+JSON.parse(msg.data).msg+"</a></h4><p>Work for fun</p></div><div class=\"user-status text-danger\"><i class=\"fa fa-comments-o\"></i></div></div>";
  document.getElementById('useronline').insertAdjacentHTML('beforeend', content);
  document.getElementById('totaluser').textContent=JSON.parse(msg.data).totaluser;

}
else if(JSON.parse(msg.data).msgtype=='onlineuser'){

document.getElementById('useronline').innerHTML="";

JSON.parse(msg.data).msg.forEach(function(item){
var content="<div class=\"prog-row\"><div class=\"user-thumb\"><a href=\"#\"><img src=\"images/avatar1_small.jpg\" alt=\"\"></a></div><div class=\"user-details\"><h4><a href=\"#\">"+item+"</a></h4><p>Work for fun</p></div><div class=\"user-status text-danger\"><i class=\"fa fa-comments-o\"></i></div></div>";
document.getElementById('useronline').insertAdjacentHTML('beforeend', content);

});
 

}
else if(JSON.parse(msg.data).msgtype=='notification'){


var content="<div class=\"alert alert-info clearfix\"><span class=\"alert-icon\"><i class=\"fa fa-envelope-o\"></i></span><div class=\"notification-info\"><ul class=\"clearfix notification-meta\"><li class=\"pull-left notification-sender\"><span><a href=\"#\">"+JSON.parse(msg.data).msg+"</a></span> </li><li class=\"pull-right notification-time\">"+formatAMPM(new Date())+"</li></ul><p>This Notofication send from server</p></div></div>";
document.getElementById('notifications').insertAdjacentHTML('beforeend', content);


}

	else{

	var content="<li class='clearfix'><div class='chat-avatar'><img src='images/chat-user-thumb.png' alt='female'><i>"+formatAMPM(new Date())+"</i></div><div class='conversation-text'><div class='ctext-wrap'> <i>"+JSON.parse(msg.data).sendername+"</i><p>"+JSON.parse(msg.data).msg+"</p></div> </div></li>";
	document.getElementById('chatlist').insertAdjacentHTML('beforeend', content);
	document.getElementById('totaluser').textContent=JSON.parse(msg.data).totaluser;
}


   }


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function sendMe(){

	
if(msgtextbox.value!=''){
   conn.send(msgtextbox.value); 


   var content="<li class='clearfix odd'><div class='chat-avatar'><img src='images/chat-user-thumb-f.png' alt='female'><i>"+formatAMPM(new Date())+"</i></div><div class='conversation-text'><div class='ctext-wrap'> <i>"+person+"</i><p>"+msgtextbox.value+"</p></div> </div></li>";

   document.getElementById('chatlist').insertAdjacentHTML('beforeend', content);
   msgtextbox.value="";

}

}