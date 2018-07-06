<template>
  <div class="chat-manager-m">
    <div class="title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="chat-manager-font-title" @click="goToHome">小黄平台</span>
        <div class="chat-manager-font-title-message">-&nbsp;&nbsp;&nbsp;客服处理中心</div>
        <!-- <i class="iconfont el-icon-hhy-yonghu kefu-icon"></i> -->
        <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
      </div>
    </div>
    <div class="line-horizontal"></div>
    <div class="chat-manager-main">
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
          <el-button type="primary" size="small" @click="showImgDialog" class="margin-top-twenty">发送图片</el-button>
          <el-button type="primary" size="small" @click="send" class="margin-top-twenty">发送</el-button>
        </el-col>
      </div>
    </div>
    <!-- 插入图片弹窗 -->
    <el-dialog title="插入图片" :visible.sync="dialogChatInertImgVisible">
      <el-tabs type="border-card" v-model="imageDialogTabs">
        <el-tab-pane label="在线图片" name="1">
          <div>
            <div class="onlinePicTxt">请输入图片完整地址。</div>
            <el-input class="el-input2"
            placeholder="http://example.com/image.jpg"
            prefix-icon="iconfont el-icon-hhy-weibiaoti102-copy"
            v-model="inputImgOnLineAddress">
            </el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="2">
          <div>
            <div class="flex-between upload-img">
              <el-upload
                :action="getUploadApi"
                :name="file"
                :show-file-list="false"
                :on-success="handleChatImgSuccess">
                  <el-input class="el-input2 img-input-left" :disabled="true"
                  v-model="inputImgAddress">
                    <template slot="prepend">选择图片</template>
                  </el-input>
              </el-upload>
              <!-- <el-button type="info" plain class="img-input-right">上传</el-button> -->
            </div>
            <div class="onlinePicTxt margin-top-ten">1、图片大小不能超过2M；2、支持格式：.jpg .gif .png .bmp。</div>
            <div class="flex-center margin-top-ten">
              <div class="img-preview-div margin-top-ten">
                <img :src="imageUrl" class="img-preview">
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChatInertImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendImg">确 定</el-button>
        <input id="path" type="hidden" value="fileUrl" />
      </span>
    </el-dialog>
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
      isLogin: false,
      messageList: null,
      dialogChatInertImgVisible: false,
      imageDialogTabs: '1',
      imageUrl: '',
      fileUrl: '',
      inputImgOnLineAddress: '',
      inputImgAddress: ''
    }
  },
  methods: {
    file () {
      this.$message('暂不开放')
    },
    goToHome () {
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
          this.messageList = res.data.result
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
          this.chatContent += 'Received message: ' + JSON.parse(evt.data).message + '\n'
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
    handleChatImgSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.inputImgAddress = file.url
      this.fileUrl = res.result.fileUrl
    },
    showImgDialog () {
      // 发送图片
      this.dialogChatInertImgVisible = true
    },
    sendImg (fileUrl) {
      // 发送图片
      // var ms = ''
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
    },
    getUploadApi: function () {
      var path = document.querySelector('#contextPath').value
      return `${path}/upload`
      // return 'http://127.0.0.1:8080/smallyellow/upload'
    }
  }
}
</script>

<style lang="scss">
  .chat-manager-m{
    height: 100%;
    width: 100%;
    background-color: #f7f7f7;
  }
  html,body{
    height: 100%;
  }
  .chat-manager-font-title-message{
    color: #fff;
    font-size:0.9em;
    margin-left: 10px;
  }
  .chat-manager-font-title{
    font-size:1.1em;
    color: #ffffff;
    cursor: pointer;
  }
  .font-icon{
    color: #ffffff;
    font-size: 1.5em;
    margin-right: 6px;
    font-weight: bold;
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
  .chat-manager-main{
    margin: 0px 120px;
    background-color: #fff;
    min-height: 670px;
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
  /* 弹窗-上传图片开始 */
  .el-tabs--border-card {
    border: 0px solid #d8dce5;
    box-shadow:  0 0px 0px 0 rgba(0,0,0,0), 0 0 6px 0 rgba(0,0,0,0);
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: #ffffff; 
    border-bottom: 1px solid #dfe4ed;
    margin: 0;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      border: 1px solid transparent; 
      margin-left: 1px;
      margin-top: 1px;
      color: #409EFF;
      font-size: 1.1em;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      border-left: 1px solid #dfe4ed; 
      border-top: 1px solid #dfe4ed; 
      border-bottom: 1px solid transparent; 
      margin-left: 1px;
      margin-top: 1px;
      color: #878d99;
  }
  .el-dialog__body {
      padding: 10px 20px;
      color: #5a5e66;
      line-height: 24px;
      font-size: 14px;
  }
  .onlinePicTxt{
    color: #b1b7c2;
    font-size: 1.1em;
    margin-bottom: 10px;
  }
  .el-tabs--border-card>.el-tabs__content {
      padding: 15px 2px 15px 2px;
  }
  .img-input-left{
    width: 180%;
  }
  .img-input-right{
    width: 12%;
  }
  .upload-img .el-button{
    border-radius: 0px;
  }
  .img-preview-div{
    width: 12em;
    height: 12em;
    border: 1px solid #d8dce5;
    align-content: center;
  }
  .img-preview{
    width: 100%;
    height: 100%;
  }
  .el-upload {
      display: inline-block;
      text-align: left;
      cursor: default;
      width: 100%;
  }
  .el-input2 .el-input__inner:hover{
    border: 1px solid #d5d9e0;
    border-radius: 0px;
  }
  .el-input2 .el-input__inner{
    background-color: #fff;
    border: 1px solid #dfe4ed;
    width: 100%;
    border-radius: 0px;
    padding-left: 32px;
  }
  .el-input2 .el-input-group__append, .el-input-group__prepend {
    background-color: #f5f7fa;
    color: #878d99;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border-left: 1px solid #d8dce5;
    border-radius: 0px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    cursor: default;
  }
  .el-input.is-disabled .el-input__inner {
    cursor: default;
    background-color: #fff;
  }
  /* 弹窗-上传图片结束 */
</style>
        