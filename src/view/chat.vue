<template>
  <div class="main">
    <el-input
      type="textarea"
      :rows="10"
      placeholder="聊天"
      v-model="chatContent"
      :disabled=true>
    </el-input>
    <el-input v-model="chatInput" placeholder="请输入内容" class="margin-top-twenty"></el-input>
    <el-button type="primary" size="small" @click="connectChat" class="margin-top-twenty">连接</el-button>
    <el-button type="primary" size="small" @click="send" class="margin-top-twenty">发送</el-button>
  </div>
</template>

<script>
  import { getUser } from '../assets/js/data.js'
  export default {
    created () {
      var isLogin = getUser()
      this.$message('当前登录22' + isLogin)
    },
    data () {
      return {
        chatWebsocket: null,
        chatContent: '',
        chatInput: ''
      }
    },
    computed: {

    },
    methods: {
      connectChat () {
        // 连接
        var wsUri = 'ws://localhost:9999/smallyellow/chat'
        this.chatContent += 'Connecting to ' + wsUri
        this.chatWebsocket = new WebSocket(wsUri)
        this.chatWebsocket.onopen = (evt) => {
          this.chatContent += 'Connected ! \n'
        }
        this.chatWebsocket.onmessage = (evt) => {
          this.chatContent += 'Received message: ' + evt.data + '!\n'
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
        var user = getUser()
        var ms = '{"type":"CHAT","to":"0","from":"' + user.id + '","message":' + message + '}'
        this.chatWebsocket.send(ms)
        this.chatContent += 'Send message: ' + message
      }
    }
  }
</script>

<style lang="scss">

</style>
      