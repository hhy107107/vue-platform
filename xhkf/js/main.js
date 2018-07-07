var socket;
var fromUserId;
var serviceUserId; //当前选中的客服id
var num = 0;
var PUSH = 2;
var GET_USER_INFO = 4;
var INIT = 1;
var pageNo = 1;
var fileStringBase64;
$(document).ready(function(){
  if(!window.WebSocket){
      window.WebSocket = window.MozWebSocket;
  }
  if(window.WebSocket){
    socket = new WebSocket("ws://localhost:8090/websocket");
    socket.onmessage = function(event){
      var chatList = $("#chatList").html();
      var resultData = event.data;
      resultData = eval('(' + resultData + ')');
      let fromUser = resultData.from;
      let toUser = resultData.to;
      if (resultData.type == 1) {
          let msg = resultData.msg.msg
          chatList += "<li>来自["+fromUser+"]："+msg+"</li>";
      } else if (resultData.type == 1000) {
          let hhylist = eval('(' + resultData.msg.content + ')');
          var list = document.getElementById('serviceList');
          var htmlStr = "";
          for (var i = hhylist.length - 1 ; i >= 0; i --) {
              htmlStr += "<li id='"+hhylist[i].userId+"'>";
              htmlStr += "<img src='./image/service_face.png'>";
              htmlStr += hhylist[i].userId;
              htmlStr += "</li>";
          }
          list.innerHTML=htmlStr;
      } else if (resultData.type == 1002) {
          let msg = resultData.msg.content
          chatList += "<li>来自["+fromUser+"]："+msg+"</li>";
      } else if (resultData.type == 400) {
        // 收到用户信息消息
        let msg = resultData.msg.content
        chatList += "<li>来自["+fromUser+"]：你好，"+msg+"</li>";
        fromUserId = msg;
      } else if (resultData.type == 2) {
        // 收到用户信息消息
        let msg = resultData.msg.content
        chatList += "<li>来自["+fromUser+"]："+msg+"</li>";
      }
      $("#chatList").html(chatList);
    };
    socket.onopen = function(event){
      var chatList = $("#chatList").html();
      chatList += "成功连接小黄客服"+"</br>";
      socket.send('{"type":"4"}');
      socket.send('{"type":"5"}');
      $("#chatList").html(chatList);
    };
    socket.onclose = function(event){
      var chatList = $("#chatList").html();
      chatList += "WebSocket 关闭"+"</br>";
      $("#chatList").html(chatList);
    };
  }else{
      alert("您的浏览器不支持WebSocket协议！");
  }

  $("#loginServer").click(function(){
    sendLogin();
  })
  $('ul').on('click', 'li', function(e){
    $('ul li').removeClass('active');
    $(e.target).addClass('active');
    serviceUserId = $(this).attr("id");
    getChatList(serviceUserId, fromUserId);
  });
  $("#sendBtn").click(function(){
    let msg = $("#inputText").html();
    sendCommon(msg);
  });
});
  //客服登录 {"type":"0","from":"客服1"}
  //发消息 {"type":"1","from":"临时用户","to":"客服1","msg":{"msg":"你好"}}
  function send(message, toUserId, type){
    if(!window.WebSocket){return;}
    if(socket.readyState == WebSocket.OPEN){
      socket.send("{\"type\":"+type+",\"from\":\""+fromUserId+"\",\"to\":\""+toUserId+"\",\"msg\":{\"content\":\""+message+"\"}}")
      if (type == 2) {
        var chatList = $("#chatList").html();
        chatList += "<li>发送消息给["+toUserId+"]："+message+"</li>";
        $("#chatList").html(chatList);
      }
    }else{
        alert("WebSocket 连接没有建立成功！");
    }
  }
  //发送普通消息
  function sendCommon(message) {
    send(message, serviceUserId, PUSH);
  }
  //获取用户信息
  function getUserInfo() {
    send("", "", GET_USER_INFO);
  }
  //客服用户登录
  function sendLogin() {
    fromUserId = "客服" + ++num;
    send("", "", INIT);
  }

  function getChatList (toUser, fromUser) {
    var param = {};
    param["pageNo"] = pageNo;
    param["pageSize"] = 8;
    param["from"] = fromUser;
    param["to"] = toUser;
    $.ajax({
        'url' : 'http://localhost:8090/getChatRecordList',
        'type' : 'GET',
        'dataType' : 'json',
        'data': param,
        'async'	   : true,
        'beforeSend' : function() {},
        'success' : function(data) {
            var listHtml = "";
            if(data.code==1) {
                var chatList = $("#chatList").html();
                if (pageNo == 1) {
                  chatList = "";
                }
                var list = data.result;
                if (list != '' && list.length > 0) {
                    for (var item in list) {
                        chatList += "<li>来自["+list[item].from+"]："+list[item].content+"</li>";
                    }
                }
                $("#chatList").html(chatList);
            }
        },
        'error'  : function(e) {
            // tips("连接服务器超时，请稍后重试", 'error');
        }
    });
   }

   function getStringFromFile(event){
    var event = event || window.event;
    console.log(event);
    var target = event.target || event.srcElement;
    //获取文件
    var file = target.files[0];
    
    /*
     * 使用FileReader对象将文件转换为Base64字符串
     */
    var reader = new FileReader();
    reader.readAsDataURL(file,"UTF-8");
    reader.onload=function(){
      fileStringBase64 = reader.result;
      let str = $("#inputText").html();
      str += '<img src="'+fileStringBase64+'">';
      $("#inputText").html(str);
      fileStringBase64 = fileStringBase64.substring(fileStringBase64.indexOf(",")+1,fileStringBase64.length);
      console.log('数据\n'+fileStringBase64);
    }
  }

