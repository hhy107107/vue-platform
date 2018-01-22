<template>
  <div>
    <div class="note-proficient-title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun proficient-title-font-icon"></i><span class="note-proficient-font-title" @click="goToHome">小黄平台</span>
        <div class="note-proficient-font-title-message">-&nbsp;&nbsp;&nbsp;学霸</div>
      </div>
      <div class="div-flex">
        <el-dropdown @command="handleTitleBarCommand">
          <img :src="userface" class="note-proficient-pictures" >
          <el-dropdown-menu slot="dropdown" id="pictures">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style>
  /* 标题栏样式开始 */
.proficient-line-horizontal{
    height: 1px;
    width: 100%;
    background-color: #08aa74;
}
.note-proficient-title-bar{
  height: 57px;
  background-color: #009966;
  display: flex;
  padding: 0px 120px;
  justify-content: space-between;
}
.note-proficient-font-title-message{
  color: #fff;
  font-size:0.9em;
  margin-left: 10px;
}
.note-proficient-font-title{
  font-size:1.1em;
  color: #ffffff;
  cursor: pointer;
}
.note-proficient-pictures{
  height: 40px;
  width: 40px;
  border-radius: 50px;
  cursor: pointer;
}
.proficient-title-font-icon{
  color: #ffffff;
  font-size: 1.5em;
  margin-right: 6px;
  font-weight: bold;
}
  /* 标题栏样式结束 */
</style>