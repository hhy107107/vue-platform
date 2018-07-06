<template>
  <div>
    <div class="testfile-title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun proficient-title-font-icon"></i><span class="testfile-font-title" @click="goToHome">小黄平台</span>
        <div class="testfile-font-title-message">-&nbsp;&nbsp;&nbsp;文件</div>
      </div>
      <div class="div-flex">
        <el-dropdown @command="handleTitleBarCommand">
          <img :src="userface" class="testfile-pictures" >
          <el-dropdown-menu slot="dropdown" id="pictures">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="testfile-body">
      <form id="myForm" action="http://localhost:9999/smallyellow/file/uploadFolder" method="post" enctype="multipart/form-data">
         <input id="fileFolder" name="fileFolder" @change="uploadfolder" type="file" webkitdirectory>
      </form>
     
    </div>
  </div>

</template>
<script>
  export default {
    components: {
    },
    created () {
    },
    data () {
      return {
      }
    },
    methods: {
      uploadfolder () {
        // 测试
        document.getElementById('myForm').submit()
      }
    }
  }
</script>
<style lang="scss">
.testfile-body{
  height: 800px;
  background-color: #fff;
}

 /* 标题栏样式开始 */
.proficient-line-horizontal{
    height: 1px;
    width: 100%;
    background-color: #08aa74;
}
.testfile-title-bar{
  height: 57px;
  background-color: #009966;
  display: flex;
  padding: 0px 120px;
  justify-content: space-between;
}
.testfile-font-title-message{
  color: #fff;
  font-size:0.9em;
  margin-left: 10px;
}
.testfile-font-title{
  font-size:1.1em;
  color: #ffffff;
  cursor: pointer;
}
.testfile-pictures{
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