<template>
  <div class="height-100">
    <div class="login-title-bar">
      <div class="login-title-left">
        <i class="iconfont el-icon-hhy-yun font-icon-title"></i><span class="font-title-xh pointer">小黄平台</span>
        <span class="font-title-message">&nbsp;&nbsp;&nbsp;-- 云平台的定义者</span>
      </div>
    </div>
    <div class="login-center">
      <div class="login-center-left">
        <!-- <img src="../assets/image/login-banner-icon2.png" class="banner-icon"> -->
        <img src="../assets/image/login-banner-cloud.png" class="banner-icon">
      </div>
      <div class="register-box">
        <div class="register-box-title">快速注册</div>
        <div class="register-box-info">快速注册一个账号，体验小黄平台</div>
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
          <div class="login-btn" @click="registerUser">注 册</div>
          <div class="register-text">
            <!-- <div class="forget">忘记密码</div> -->
            <div class="register" @click="goToLogin">已有账号，直接登录</div>
          </div>
          <!-- <div class="login-fast-line"></div>
          <div class="login-fast">
            <i class="iconfont el-icon-hhy-weixin fast-icon-weixin"></i>
            <i class="iconfont el-icon-hhy-qq  fast-icon-qq"></i>
          </div> -->
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
  import querystring from 'querystring'
  export default {
    data () {
      return {
        inputRegisterUsername: '',
        inputRegisterPassword: '',
        inputRegisterEmail: ''
      }
    },
    methods: {
      registerUser () {
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
      },
      goToLogin () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
.font-title-message{
  color: #fff;
}
.login-center-left{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 80px;
}
.banner-icon{
  width: 500px;
}
.login-title-left{
  display: flex;
  justify-content: center;
  align-items: center;
}
.font-title-xh{
  font-size:1.1em;
  color: #ffffff;
}
.font-icon-title{
  color: #ffffff;
  font-size: 1.8em;
  margin-right: 6px;
  font-weight: bold;
}

.login-title-bar{
  height: 57px;
  background-color: #009966;
  display: flex;
  padding: 0px 120px;
  justify-content: space-between;
  border-bottom: 1px solid #06ac75;
}
.login-center{
  /* background: url(../assets/image/login_banner.jpg) center top no-repeat; */
  background:-moz-linear-gradient(top, #009966, rgba(51, 51, 51, 0.308)); 
  background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#009966), to(rgba(51, 51, 51, 0.308)));
  FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=1,startColorStr=#009966, endColorStr= rgba(51, 51, 51, 0.308)); 
  /* background-color: #009966; */
  height: 646px;
  display: flex;
  justify-content: flex-end;
}
.register-box{
  background-color: #fff;
  margin: 60px 100px;
  height: 340px;
  width: 340px;
  padding: 20px 40px;
}
.register-title{
  font-size: 1.2em;
  margin-bottom: 20px;
}
.register-info{
  font-size: 0.9em;
  color: #a2aaac;
  margin-bottom: 10px;
}
.login-btn{
  background-color: #00ac72;
  height: 40px;
  width: 100%;
  margin-top: 40px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.login-btn:hover{
  background-color: #009966;

}
.register-text{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 0.8em;
}
.forget{
  margin-right: 10px;
  cursor: pointer;
  color: #a2aaac;
}
.forget:hover{
  color: #1a9b41;
}
.register{
  cursor: pointer;
  color: #1a9b41;
}
.register:hover{
  color: #0e8331;
}
.login-fast{
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
}
.fast-icon-weixin{
  font-size: 2.4em;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  color: #a2aaac;
}
.fast-icon-qq{
  font-size: 2.4em;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  color: #a2aaac;
}
.fast-icon-weixin:hover{
  color: #1a9b41;
}
.fast-icon-qq:hover{
  color: #1a889b;
}
.login-fast-line{
  width: 400px;
  margin-left: -30px;
  height: 1px;
  margin-top: 10px;
  background-color: #eeeeee;
}
.footer{
  background-color: #333;
  min-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode{
  width: 140px;
  height: 140px
}
.footer-line{
  height: 120px;
  width: 1px;
  background-color: #fff;
  margin: 0px 60px;
}
.footer-text-yellow{
  color: #ffcc33;
  font-size: 1.4em;
}
.footer-text-white{
  color: #fff;
  font-size: 1.1em;
  margin-top: 30px;
}
</style>