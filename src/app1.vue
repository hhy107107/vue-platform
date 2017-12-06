<template>
 <div class="all">
    <div>
      <router-view></router-view>
    </div>
    <div class="footer">
      <img src="./assets/image/qrcode.png" class="qrcode">
      <div class="footer-line"></div>
      <div>
        <div class="footer-text-yellow">云平台的定义者</div>
        <div class="footer-text-white">联系我们：小黄人 &nbsp;&nbsp;&nbsp;&nbsp;hhy107107@qq.com</div>
      </div>
    </div>
</div>   
</template>

<script></script>
<style>
.all{
  display: flex;
  flex-direction: column;
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