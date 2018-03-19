<template>
  <div>
  <div class="header-hhy">
    <div class="header-content">
      <div class="header-left font-big">
        <span>Home</span>
        <i class="iconfont el-icon-hhy-toux2 userface margin-left-ten" :class="{'userLogin': isLogin}" @click="showLogin"></i> 
        <span class="font-small margin-left-ten pointer" @click="goToNew">新首页</span>
      </div>
      
      <div class="header-center">
        <div class="">
          <el-input id="search"
            placeholder="搜点什么好呢"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
        <div class="header-right">
          <div class="dropdown">
            <el-dropdown>
              <span class="el-dropdown-link">
                关于我们<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>BJHJ</el-dropdown-item>
                <el-dropdown-item>SmallYellow</el-dropdown-item>
                <el-dropdown-item>XUTONG</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dropdown">
            <el-dropdown>
              <span class="el-dropdown-link">
                支持<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>支付宝</el-dropdown-item>
                <el-dropdown-item>Wechat Pay</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dropdown">
            <el-dropdown>
              <span class="el-dropdown-link">
                翻译<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <i class="iconfont el-icon-hhy-nav-my-login-out logout" @click="logoutUser"></i>
      </div>
    </div>
    <div class="line-horizontal"></div>
  </div>
  <div class="center">
    <el-carousel height="280px">
      <el-carousel-item v-for="(item, index) in bannerList" :key=item>
        <img :src=item.url class="banner-img">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="content-title">
    <div class="line"></div>
    <span class="model-label">全部模块</span>
    <div class="line"></div>
  </div>
  <div class="content">
    <div v-for="(item, index) in appList" :key="index">
      <div @click="openApp(item.link)" class="model-card" :id=item.id>
        <img :src=item.icon class="center-image" @click="openApp(item.link)">
        <span @click="openApp(item.link)" class="model-name">{{item.name}}</span>
        <!-- <router-link :to=item.link>点开它</router-link> -->
      </div>
    </div>
  </div>
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
      <el-tab-pane label="快速注册" name="second">
        <div>
          <el-input
            placeholder="用户名"
            prefix-icon="iconfont el-icon-hhy-touxiang1"
            v-model="inputRegisterUsername">
          </el-input>
          <el-input class="margin-top-twenty"
            placeholder="邮箱"
            prefix-icon="iconfont el-icon-hhy-touxiang1"
            v-model="inputRegisterEmail">
          </el-input>
          <el-input class="margin-top-twenty"
            placeholder="6~18位字母和数字组合"
            prefix-icon="iconfont el-icon-hhy-mima"
            v-model="inputRegisterPassword">
          </el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="loginUser">确 定</el-button>
    </span>
  </el-dialog>

  </div>
</template>

<script>
  import querystring from 'querystring'
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
        inputRegisterUsername: '',
        inputRegisterPassword: '',
        inputRegisterEmail: '',
        user: null,
        isLogin: false,
        bannerList: [{url: 'http://39.108.176.184/static/banner/banner1.jpg'}, {url: 'http://39.108.176.184/static/banner/banner2.jpg'}, {url: 'http://39.108.176.184/static/banner/banner3.jpg'}]
      }
    },
    methods: {
      goToNew () {
        this.$router.push('/home')
      },
      openApp (link) {
        this.$router.push(link)
      },
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
        if (this.activeName === 'first') {
          // 登录
          this.$https.get(`/common/login?username=${this.inputUsername}&password=${this.inputPassword}`)
          .then(res => {
            if (res.data.code === 1) {
              // 成功
              this.setUserOnLine(res.data.result)
            } else {
              // 失败
              this.$message(res.data.message)
            }
          })
        } else {
          // 注册
          this.$https.post(`/common/register`, querystring.stringify({
            username: this.inputRegisterUsername,
            password: this.inputRegisterUsername,
            email: this.inputRegisterEmail
          }))
          .then(res => {
            if (res.data.code === 1) {
              this.$message('用户注册成功，请登录邮箱进行验证')
            } else {
              this.$message(res.data.message)
            }
          })
        }
      },
      setUserOnLine (user) {
        this.loginDialogVisible = false
        this.user = user
        this.isLogin = true
      },
      logoutUser () {
        // 退出
        this.$https.get(`/common/logout`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            this.loginDialogVisible = true
          } else {
            // 失败
            this.$alert('服务器错误')
          }
        })
      }
    },
    computed: {
      appList () {
        return [{'id': 'm1', 'name': '笔记本', 'link': '/note', 'icon': 'http://39.108.176.184/static/icon/model-note.png'}, {'id': 'm2', 'name': '客服中心', 'link': '/chat', 'icon': 'http://39.108.176.184/static/icon/model-message.png'}, {'id': 'm3', 'name': '客服后台', 'link': '/chatManager', 'icon': 'http://39.108.176.184/static/icon/model-service.png'}]
      }
    }
  }
</script>

<style lang="scss">
  .logout{
    margin-right: 10px;
    color: #888888;
    font-size: 1.4em;
    cursor: pointer;
  }
  .center-image{
    width: 80px;
    height: 80px;
  }
  .content{
    margin: 20px 80px;
  }
  .model-name{
    color: #fff;
    margin-top: 10px;
    font-size: 1.1em;
  }
  #m1.model-card{
    background-color: rgba(246, 76, 20, 0.801);
  }
  #m2.model-card{
    background-color: rgba(0, 165, 241, 0.801);
  }
  #m3.model-card{
    background-color: rgba(255, 187, 0, 0.801);
  }
  .model-card{
    border-radius: 100%;
    height: 180px;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    cursor: pointer;
  }
  .content-title{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .line{
    height: 1px;
    width: 40%;
    background-color: #f1f1f1;
  }
  .model-label{
    font-size: 1.1em;
    margin: 20px;
    color: #b1b1b1;
    padding-top: 10px;
  }
  .banner-img{
    width: 100%;  
    max-height: 100%;   
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-dropdown-link:hover{
    color: #ff9423;
  }
  #search.el-input__inner {
    border-radius: 50px;
    height: 30px;
  }
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
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .header-left{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-content{
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
  .header-center{
    display: flex;
    margin-right: 10px;
    align-items: center;
    align-content: center;
  }
  .header-right{
    display: flex;
    margin-left: 40px;
    margin-right: 20px;
  }
  .center{
    background-color: #d3dce6;
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
  .dropdown{
    padding: 0px 10px;
  }
  /* 轮播图开始 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  /* 轮播图结束 */
</style>
