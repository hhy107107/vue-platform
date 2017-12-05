<template>
  <div class="height-100">
    <div class="login-title-bar">
      <div class="login-title-left">
        <i class="iconfont el-icon-hhy-yun font-icon-title"></i><span class="font-title-xh pointer">小黄平台</span>
      </div>
    </div>
    <div class="login-center">
      <div class="login-center-left">
        <img src="../assets/image/login-banner-icon2.png" class="banner-icon">
      </div>
      <div class="login-box">
        <div class="login-box-title">账号登录</div>
        <div class="login-box-info">登录账号使用更多功能</div>
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
          <div class="login-btn">登 录</div>
          <div class="register-text">
            <div class="forget">忘记密码</div>
            <div class="register">注册账号</div>
          </div>
          <div class="login-fast-line"></div>
          <div class="login-fast">
            <i class="iconfont el-icon-hhy-weixin fast-icon-weixin"></i>
            <i class="iconfont el-icon-hhy-qq  fast-icon-qq"></i>
          </div>
        </div>
      </div>
      
    </div>
    <div class="footer"></div>
  </div>   
</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first',
        inputUsername: '',
        inputPassword: ''
      }
    }
  }
</script>

<style>
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
  background-color: #009966;
  height: 646px;
  display: flex;
  justify-content: flex-end;
}
.login-box{
  background-color: #fff;
  margin: 60px 100px;
  height: 340px;
  width: 340px;
  padding: 20px 40px;
}
.login-box-title{
  font-size: 1.2em;
  margin-bottom: 20px;
}
.login-box-info{
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
}
</style>