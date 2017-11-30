<template>
    <div class="m">
      <el-row class="title-bar flex-between" style="margin-bottom: 0px">
        <el-col :span="24">
          <div class="div-flex">
            <div class="bg-purple font-big-module">Home</div>
            <div class="font-middle-module">-个人中心</div>
            <i class="iconfont el-icon-hhy-yonghu kefu-icon"></i>
            <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
          </div>
        </el-col>
      </el-row>
      <div class="line-horizontal"></div>
      <div class="main m3">
        <div class="mine-left">
          <el-menu 
            default-active="personal"
            class="el-menu-vertical-demo height-100 padding-top-ten"
            @open="handleOpen"
            @close="handleClose"
            router=true>
            <el-menu-item index="personal">
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="account">
              <i class="el-icon-setting"></i>
              <span slot="title">账户信息</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="mine-right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
    }
  </script>
  
  <style lang="scss">
    .el-menu-item.is-active {
      color: rgb(4, 170, 142);
    }
    .m3{
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 0px;
      height: calc(100% - 71px);
    }
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
      color: rgb(4, 170, 142);
      margin-left: 10px;
    }
    .main{
      display: flex;
    }
    .mine-left{
      width: 18%;
    }
    .mine-right{
      width: 82%;
      height: 100%;
    }
  </style>
        