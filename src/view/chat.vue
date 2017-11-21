<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="聊天"
          v-model="textarea"
          disabled=true>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-button type="primary" size="small" id="content">连接</el-button>
          <el-button type="primary" size="small" id="send">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      content () {
        // 连接
      }
    }
  }
</script>

<style lang="scss">

</style>
      