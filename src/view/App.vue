<template>
  <div class="header-hhy">
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple font-big">
      Home
      <i class="iconfont el-icon-hhy-toux2 userface" :class="{'userLogin': isLogin}" @click="showLogin"></i> 
    </div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light">
      <el-input
        placeholder="搜点什么好呢"
        icon="search"
        v-model="input2"
        :on-icon-click="handleIconClick">
      </el-input>
      </div></el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-dropdown>
            <span class="el-dropdown-link">
              Learn<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>JAVA</el-dropdown-item>
              <el-dropdown-item>Android</el-dropdown-item>
              <el-dropdown-item>Vue</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>  
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <span class="el-dropdown-link">
                About US<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>BJHJ</el-dropdown-item>
                <el-dropdown-item>SmallYellow</el-dropdown-item>
                <el-dropdown-item>XUTONG</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <span class="el-dropdown-link">
                Support<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>支付宝</el-dropdown-item>
                <el-dropdown-item>Wechat Pay</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
             <el-dropdown>
              <span class="el-dropdown-link">
                Translations<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </div>
    </el-col>
  </el-row>
  <el-row class="center">
    <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-dark">
      <el-col :span="8"><div class="grid-content bg-purple-dark">
        <img src="https://vuejs.org/images/logo.png" class="logo-big">
      </div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-dark">
        <el-row><el-col :span="24"><div class="grid-content bg-purple-dark"><h1>Welcome to SmallYellow's Home</h1></div></el-col></el-row>
        <el-row><el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-button type="primary">GET STARTED</el-button><el-button>GITHUB</el-button>
        </div></el-col></el-row>
        
      </div></el-col>
    </div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
  </el-row>
  <el-row style="text-align:center; margin:80px" class="content">
    <el-col :span="4" v-for="(item, index) in appList" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img src="https://vuejs.org/images/logo.png" class="center-image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <router-link :to=item.link>点开它</router-link>
            <!--<el-button type="text" class="button" @click="$route.push('/article')">奇妙之旅</el-button>-->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!--<router-view></router-view>-->
  <el-dialog
    title=""
    :visible.sync="loginDialogVisible"
    width="30%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户登录" name="first">
        <div>
          <el-input
            placeholder="手机号/邮箱/用户名"
            prefix-icon="iconfont el-icon-hhy-touxiang1"
            v-model="inputUsername">
          </el-input>
          <el-input class="margin-top-twenty"
            placeholder="6~18位字母和数字组合"
            prefix-icon="iconfont el-icon-hhy-mima"
            v-model="inputPassword">
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="快速注册" name="second">注册</el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="loginUser">登 录</el-button>
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
          this.loginDialogVisible = true
        }
      })
    },
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input2: '',
        currentDate: '',
        loginDialogVisible: false,
        activeName: 'first',
        inputUsername: '',
        inputPassword: '',
        user: null,
        isLogin: false
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleIconClick () {},
      showLogin () {
        // test
        if (this.user === null) {
          this.loginDialogVisible = true
        } else {
          this.$router.push({path: '/mine'})
        }
      },
      loginUser () {
        this.$https.get(`/user/login?username=${this.inputUsername}&password=${this.inputPassword}`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            this.setUserOnLine(res.data.result)
          } else {
            // 失败
            this.$alert('失败')
          }
        })
      },
      setUserOnLine (user) {
        this.loginDialogVisible = false
        this.user = user
        this.isLogin = true
      }
    },
    computed: {
      appList () {
        return [{'name': '笔记本', 'link': '/diary'}, {'name': '客服中心', 'link': '/chat'}, {'name': '客服后台', 'link': '/chatManager'}]
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .header-hhy{
    margin: 20px;
  }
  .center{
    margin-top: 60px;
  }
  .center-image{
    width: 100px;
    height: 100px;
  }
  .logo-big{
    width: 215px;
    height: 215px;
  }
  .userface{
    font-size: 22px;
    color: #797775;
    cursor: pointer;
  }
  .userLogin{
    color: #ff9423;
  }
  .el-dialog__body {
    padding: 0px 20px;
    color: #5a5e66;
    line-height: 24px;
    font-size: 14px;
  }

  
</style>
