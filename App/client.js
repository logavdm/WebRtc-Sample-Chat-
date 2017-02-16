var msgtextbox=document.getElementById('msg');
var chatbox=document.getElementById('chatlist');
var username="demo";




    	var conn = new WebSocket('ws://localhost:9090');
    	
	
	





  
conn.onopen = function () { 
   console.log("Connected to the signaling server");
   var person = prompt("Please enter your name", "Harry Potter");
   conn.send(person) ;
}; 

conn.onmessage = function (msg) { 
	var d = new Date();


if(JSON.parse(msg.data).msgtype=='broadcast'){

var content="<div class='alert alert-success '><span class='alert-icon'><i class='fa fa-comments-o'></i></span><div class='notification-info'><ul class='clearfix notification-meta'><li class='pull-left notification-sender'>Message From Admin</li><li class='pull-right notification-time'>"+formatAMPM(d)+"</li></ul><p><a href='#''>"+JSON.parse(msg.data).msg+"</a></p></div></div>";
	document.getElementById('chatlist').insertAdjacentHTML('beforeend', content);
	document.getElementById('totaluser').textContent=JSON.parse(msg.data).totaluser;


 



}
	else{

	var content="<li class='clearfix'><div class='chat-avatar'><img src='images/chat-user-thumb.png' alt='female'><i>"+formatAMPM(d)+"</i></div><div class='conversation-text'><div class='ctext-wrap'> <i>"+JSON.parse(msg.data).username+"</i><p>"+JSON.parse(msg.data).msg+"</p></div> </div></li>";
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


   var content="<li class='clearfix odd'><div class='chat-avatar'><img src='images/chat-user-thumb-f.png' alt='female'><i>10:00</i></div><div class='conversation-text'><div class='ctext-wrap'> <i>Lisa Peterson</i><p>"+msgtextbox.value+"</p></div> </div></li>";

   document.getElementById('chatlist').insertAdjacentHTML('beforeend', content);
   msgtextbox.value="";

}

}