
function Message(msgtype,msg,totaluser,receivername,sendername){
	this.msgtype=msgtype;
	this.msg=msg;
	this.totaluser=totaluser;
	this.receivername=receivername;
	this.sendername=sendername;
}

	Message.prototype.setMsgType=function(msgtype){
		this.msgtype=msgtype;
	}

	Message.prototype.setMsg=function(msg){
		this.msg=msg;
	}

	Message.prototype.setTotalUser=function(usercount){
		this.totaluser=usercount;
	}

	Message.prototype.setReceiverName=function(receivername){
		this.receivername=receivername;
	}

	Message.prototype.setSenderName=function(sendername){
		this.sendername=sendername;
	}

	Message.prototype.getMsgType=function(msgtype){
		return this.msgtype;
	}

	Message.prototype.getMsg=function(msg){
		return this.msg;
	}

	Message.prototype.getTotalUser=function(usercount){
		return this.totaluser;
	}

	Message.prototype.getReceiverName=function(receivername){
		return this.receivername;
	}

	Message.prototype.getSenderName=function(sendername){
		return this.sendername;
	}

module.exports = Message;