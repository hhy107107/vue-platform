<template>
  <div class="m">
    <el-row class="title-bar flex-between" style="margin-bottom: 0px">
      <el-col :span="24">
        <div class="div-flex">
          <div class="font-big-module pointer" @click="goHome">Home</div>
          <div class="font-middle-module">-客服处理中心</div>
          <i class="iconfont el-icon-hhy-kefu kefu-icon"></i>
          <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
        </div>
      </el-col>
    </el-row>
    <div class="line-horizontal"></div>
    <div class="mai3">
      <div class="height-100">
        <el-col :span="4" class="left height-100">
          <div class="online">当前在线：3</div>
          <div v-for="(item, index) in userList" class="user-item" @click="selectUser(item)">
            <li class="iconfont el-icon-hhy-yonghuuser user-icon"></li>
            {{item.name}}
          </div>
        </el-col>
        <el-col :span="20" class="right height-100">
          <div class="right-text">与{{toUserName}}的对话</div>
          <el-input
          type="textarea"
          :rows="10"
          placeholder="聊天"
          v-model="chatContent"
          :disabled=true>
          </el-input>
          <el-input v-model="chatInput" placeholder="请输入内容" class="margin-top-twenty"></el-input>
          <!-- <el-button type="primary" size="small" @click="connectChat" class="margin-top-twenty">连接</el-button> -->
          <el-button type="primary" size="small" @click="send" class="margin-top-twenty">发送</el-button>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$https.get(`/initData`)
    .then(res => {
      if (res.data.code === 1) {
        // 成功
        this.setUserOnLine(res.data.result)
      } else {
        // 失败
        this.$message('请先登录')
      }
    })
    this.connectChat()
  },
  data () {
    return {
      // userList: []
      toUserName: '',
      toUserId: '',
      chatWebsocket: null,
      chatContent: '',
      chatInput: '',
      user: null,
      isLogin: false
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    selectUser (item) {
      this.toUserName = item.name
      this.toUserId = item.id
      var lastId = ''
      this.$https.get(`/message/chatList?to=` + this.toUserId + `&from=` + this.user.id + `&lastId=` + lastId)
      .then(res => {
        if (res.data.code === 1) {
          // 成功
          this.setUserOnLine(res.data.result)
        } else {
          // 失败
          this.loginDialogVisible = true
        }
      })
    },
    connectChat () {
      // 连接
      var wsUri = 'ws://localhost:9999/smallyellow/chat'
      this.chatContent += 'Connecting to ' + wsUri
      this.chatWebsocket = new WebSocket(wsUri)
      this.chatWebsocket.onopen = (evt) => {
        this.chatContent += 'Connected ! \n'
      }
      this.chatWebsocket.onmessage = (evt) => {
        var msg = JSON.parse(evt.data)
        if (msg.type === 'CHAT') {
          // 是聊天消息
          this.chatContent += 'Received message: ' + JSON.parse(evt.data).message + '!\n'
        } else if (msg.type === 'PUSH') {
          // 是推送
          var tag = msg.tag
          if (tag === 'chat') {
            // 聊天的推送
            var event = msg.event
            if (event === 4) {
              // 发送成功
              this.chatContent += '状态: 发送成功！\n'
            }
          }
        }
      }
      this.chatWebsocket.onerror = (evt) => {
        this.chatContent += 'ERROR:' + evt.data
        this.chatWebsocket.close()
      }
    },
    send () {
      this.doSend(this.chatInput)
    },
    doSend (message) {
      var ms = '{"type":"CHAT","to":"' + this.toUserId + '","from":"' + this.user.id + '","message":"' + message + '"}'
      this.chatWebsocket.send(ms)
      this.chatContent += 'Send message: ' + message
      this.chatContent += '\n'
    },
    setUserOnLine (user) {
      this.user = user
      this.isLogin = true
    }
  },
  computed: {
    userList () {
      return [{'name': 'test3', 'id': '3'}, {'name': 'test4', 'id': '4'}, {'name': 'test5', 'id': '5'}]
    }
  }
}
</script>

<style lang="scss">
  html,body{
    height: 100%;
  }
  .title-bar{
    padding-top: 10px;
    padding-bottom: 10px;
    height: 50px;
  }
  .font-middle-module{
    font-size:1.0em;
    margin-left:10px;
  }
  .font-big-module{
    font-size:1.5em;
    margin-left:30px;
  }
  .kefu-icon{
    color: rgb(238, 160, 16);
    margin-left: 10px;
  }
  .user-icon{
    font-size: 22px;
    color: rgb(238, 160, 16);
  }
  .left{
    background-color: #fff;
  }
  .right{
    background-color: rgb(250, 250, 253);
    padding: 10px 20px 20px 20px;
  }
  .right-text{
    padding-bottom: 10px;
    color: rgb(177, 177, 177)
  }
  .main3{
    height: 100%;
  }
  .user-item{
    padding: 10px;
  }
  .user-item:hover{
    background-color: rgb(237, 238, 207);
  }
  .online{
    padding: 10px;
  }
</style>
        