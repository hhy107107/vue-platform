<template>
  <div class="communion-m">
    <div class="title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="communion-font-title" @click="goToHome">小黄平台</span>
        <div class="communion-font-title-message">-&nbsp;&nbsp;&nbsp;交流大厅</div>
        <!-- <i class="iconfont el-icon-hhy-yonghu kefu-icon"></i> -->
        <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
      </div>
    </div>
    <div class="line-horizontal"></div>
    <div class="main2 communion-conetent">
      <div class="communion-left-bar">
        <div v-for="(item) in groupType" :key="item.id" class="communion-left-bar-item" 
          :class="{'communion-left-bar-item-select': item.id === selectGroupTypeId}"
          @click="selectGroupType(item)">
          {{item.name}}
        </div>
      </div>
      <div class="communion-center-area">
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
      </div>
      <div class="communion-online-user">
        <div class="communion-search-div">
          <i class="iconfont el-icon-hhy-tianjiayonghu communion-add-user-icon" @click="addUserClick"></i>
          <i class="iconfont el-icon-hhy-sousuo communion-search-icon"></i>
          <el-input id="communion-search" class="communion-search"
            placeholder="搜索用户"
            v-model="inputSerch">
          </el-input> 
        </div>
        <div class="line-horizontal2"></div>
        <div>
          <el-collapse class="communion-user-list">
            <el-collapse-item :title="item.name" :name="item.id" v-for="(item) in onLineList" 
            :key="item.id" class="communion-user-list-item" id="communion-user-collapse-item">
              <div v-for="(uItem) in item.users" :key="uItem.id" class="communion-user-item">
                <!-- <img :src="uItem.avatar"> -->
                <img src='../assets/image/default_userface.png'>
                <div class="communion-user-list-item-text" @click="selectUser(uItem)">{{uItem.nick}}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-for="(item) in onLineList" :key="item.id" class="communion-user-item">
            {{item.name}}
            <div v-for="(uItem) in item.users" :key="uItem.id" class="communion-user-item">
              <img :src="uItem.avatar">
              <div>{{uItem.nick}}</div>
            </div>
          </div> -->
          <!-- <div v-for="(item) in onLineList" :key="item.id" class="communion-user-item">
            <img :src="item.avatar">
            <div>{{item.nick}}</div>
          </div> -->
          <!-- <el-tree :data="onLineList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        </div>
      </div>
      <!-- 添加用户 弹窗 -->
      <el-dialog
        title="提示"
        :visible.sync="addFriendDialogVisible"
        width="30%">
        <el-input id="communion-add-friend" class="communion-add-friend"
            placeholder="添加用户"
            v-model="inputAddFriend">
          </el-input> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFriendDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="requestFriend()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 处理好友请求 弹窗 -->
      <!-- <el-dialog
        title="提示"
        :visible.sync="handleFriendDialogVisible"
        width="30%">
        <el-input id="communion-add-friend" class="communion-add-friend"
            placeholder="处理好友请求"
            v-model="inputAddFriend">
          </el-input> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFriendDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="requestFriend()">确 定</el-button>
        </span>
      </el-dialog> -->
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
          this.connectIm(res.data.result.username, res.data.result.password)
        } else {
          // 失败
          this.$message('请先登录')
        }
      })
    },
    data () {
      return {
        defaultProps: {
          children: 'users',
          label: 'name'
        },
        communionWebsocket: null,
        communionContent: '',
        communionInput: '',
        user: null,
        toUser: null,
        username: '',
        isLogin: false,
        selectGroupTypeId: 1,
        onLineList: [],
        inputSerch: '',
        chatContent: '',
        chatInput: '',
        inputAddFriend: '',
        chatWebsocket: null,
        addFriendDialogVisible: false,
        handleFriendDialogVisible: false,
        groupType: [{'id': 1, 'name': '推荐0'}, {'id': 4, 'name': '推荐4'}, {'id': 5, 'name': '推荐5'}, {'id': 6, 'name': '推荐6'}, {'id': 7, 'name': '推荐7'}, {'id': 8, 'name': '推荐8'}, {'id': 9, 'name': '推荐9'}]
      }
    },
    computed: {
    },
    methods: {
      // 连接im
      connectIm (username, password) {
        this.username = username
        var wsUri = `ws://localhost:9998?username=${username}&password=${password}`
        this.chatWebsocket = new WebSocket(wsUri)
        this.chatWebsocket.onopen = (evt) => {
          this.$message('成功onopen')
          // 获取在线用户
          var msg = `{"cmd":17,"type":"0","userid":"${username}"}`
          this.chatWebsocket.send(msg)
        }
        this.chatWebsocket.onmessage = (evt) => {
          this.$message('成功onmessage')
          var jsonData = JSON.parse(evt.data)
          console.log(jsonData)
          if (jsonData.command === 'COMMAND_CHAT_RESP') {
            // D
            if (jsonData.data != null) {
              var jData = JSON.parse(jsonData.data)
              this.chatContent = this.chatContent + '\n' + '收到来自' + jData.from + '的消息:' + jData.content
            } else {
              if (jsonData.code === 0) {
                this.chatContent = this.chatContent + '\n' + '操作状态' + jsonData.msg
              }
            }
          } else if (jsonData.command === 'COMMAND_FRIEND_REQ') {
            // 收到了好友通知
            this.$notify({
              title: jsonData.msg, // ' + jsonData.data + '
              message: jsonData.data.user.id + '请求加您为好友',
              // duration: 0,
              dangerouslyUseHTMLString: true
              // onClose: this.handleFriendRequest(jsonData.data)
            })
            var test = jsonData.data
            test.name = '新好友请求'
            this.groupType.push(test)
          } else if (jsonData.command === 'COMMAND_FRIEND_RESP') {
            if (jsonData.code === 500) {
              this.$message(jsonData.msg)
              this.addFriendDialogVisible = false
            } else {
              this.addFriendDialogVisible = false
            }
          } else {
            if (jsonData.code === 100) {
              // 成功得到消息
              var contentData = JSON.parse(jsonData.data)
              if (jsonData.command === 'COMMAND_GET_USER_RESP') {
                // 获取了用户信息
                this.onLineList = contentData.friends
              }
            } else if (jsonData.code === 1) {
              console.log(jsonData.msg)
            }
          }
        }
        this.chatWebsocket.onerror = (evt) => {
          this.$message('成功onerror')
        }
      },
      goToHome () {
        this.$router.push('/')
      },
      // 选择群组类型
      selectGroupType (item) {
        this.selectGroupTypeId = item.id
        if (item.friendUser !== null) {
          this.$confirm(`是否添加好友${item.friendUser.id}为好友-默认分组：我的好友`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('item ==' + item)
            this.handleFriendRequest(item)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: `已拒绝${item.friendUser.id}好友请求`
            })
          })
        }
      },
      // 点击用户,切换聊天
      selectUser (user) {
        this.toUser = user
        this.chatContent = ''
      },
      // 发送消息
      send () {
        // s
        var createTime = new Date().getTime()
        // var msg = "{\"from\": \""+username+"\",\"to\": \""+toId+"\",\"cmd\":11,\"createTime\":"+createTime+",\"msgType\": \"text\",\"content\": \""+content+"\"}";
        var msg = `{"from": "${this.username}","to": "${this.toUser.id}","cmd" :11,"createTime": "${createTime}","msgType":"text","content":"${this.chatInput}"}`
        console.log(`发送了消息：${msg}`)
        this.chatWebsocket.send(msg)
      },
      // 点击添加好友按钮
      requestFriend () {
        var createTime = new Date().getTime()
        var msg = `{"cmd":19,"createTime":${createTime},"friendUser":{"id":"${this.inputAddFriend}","nick":"${this.inputAddFriend}"},"user":{"id":"${this.username}","nick":"${this.username}"}}`
        console.log(`发送的消息${msg}`)
        this.chatWebsocket.send(msg)
      },
      // 点击添加好友按钮
      addUserClick () {
        console.log('点击了')
        this.addFriendDialogVisible = true
      },
      // handleFriendRequest
      handleFriendRequest (msg) {
        var createTime = new Date().getTime()
        var msg2 = `{"cmd":19,"createTime":${createTime},"status":"C503", "friendUser":${JSON.stringify(msg.friendUser)}, "user":${JSON.stringify(msg.user)}}`
        console.log('发送了' + JSON.stringify(msg2))
        // msg2.data = msg
        this.chatWebsocket.send(msg2)
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }
    }
  }
</script>

<style lang="scss">
  .font-icon{
    color: #ffffff;
    font-size: 1.5em;
    margin-right: 6px;
    font-weight: bold;
  }
  .communion-font-title-message{
    color: #fff;
    font-size:0.9em;
    margin-left: 10px;
  }
  .communion-font-title{
    font-size:1.1em;
    color: #ffffff;
    cursor: pointer;
  }
  .communion-m{
    height: 100%;
    width: 100%;
    min-height: 800px;
    background: #f1f1f1;
  }
  .main2{
    height: 100%;
    padding: 20px 60px 20px 60px;
  }
  .communion-conetent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  html,body{
    height: 100%;
  }
  .communion-title-bar{
    height: 57px;
    background-color: #009966;
    display: flex;
    padding: 0px 120px;
    justify-content: space-between;
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
  .communion-left-bar{
    display: flex;
    flex-direction: column;
    width: 100px;
    background-color: #ffffff;
    padding: 6px 0px;
  }
  .communion-left-bar-item{
    background-color: #fff;
    cursor: pointer;
    color: #757575;
    padding: 6px 12px;
    text-align: center;
    font-size: 0.95em;
    margin-top: 2px;
  }
  .communion-left-bar-item:hover{
    background-color: #009966;
    color: #fff;
  }
  .communion-left-bar-item-select{
    background-color: #009966;
    color: #fff;
  }
  .communion-online-user{
    width: 240px;
    background-color: #fff;
  }
 
  #communion-search.el-input__inner{
    color: rgb(100, 100, 100);
    border-color: #ffffff;
  }
  #communion-search.el-input__inner:hover {
    border-color: #ffffff;
 }
  #communion-search.input__inner:focus {
    border-color: rgb(255, 255, 255);
    outline: 0;
  }
  .communion-search-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px;
  }
  .communion-user-item{
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  .communion-user-item img{
    border-radius: 50%;
    width: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
  .communion-user-list{
    padding-left: 10px;
  }
  #communion-user-collapse-item .el-collapse-item__header.focusing:focus:not(:hover) {
    color: #2d2f33
  }
  .communion-user-list-item-text{
    cursor: pointer;
  }
  .communion-center-area{
    width: 68%;
  }
  .communion-add-user-icon{
    color: #757575;
    margin-right: 10px;
    cursor: pointer;
  }
  .communion-search-icon{
    color: #e8ee94;
  }
</style>
      