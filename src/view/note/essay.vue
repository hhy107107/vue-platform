<template>
  <div>
    <el-row>
      <el-col :span="5"><div>
          <div>
            <div class="line-title">
              <div class="line-short"></div>
              <div class="line-short-text">类型</div>
            </div>
            <el-row class="type-row">
                <el-col :key=item.name v-for="(item, index) in typeList" :span=item.name.length*2 :offset=2 :value="item.name">
                  <el-card @click.native="typeClick" class="type-card">
                    {{item.name}}
                  </el-card> 
                </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px">
            <div class="line-title">
              <div class="line-short red-bg"></div>
              <div class="line-short-text">热门推荐</div>
            </div>
            <el-row class="type-row">
                <el-col :key=item.name v-for="(item, index) in typeList" :span=item.name.length*2 :offset=2 :value="item.name">
                  <el-card @click.native="typeClick" class="type-card">
                    {{item.name}}
                  </el-card> 
                </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="一致性 Consistency" name="1">
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                  </el-collapse-item>
                  <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
        </div>
      </div></el-col>
      <el-col :span="1" class="line-vertical"></el-col>
      <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    methods: {
      typeClick () {
        this.$message('这是一条消息提示')
      }
    },
    computed: {
      typeList () {
        return [{'name': '我知道'}, {'name': '测试啊测试'}, {'name': '这是一个类型'}, {'name': '测试2'}, {'name': '测试'}, {'name': '测试2'}]
      },
      essayList () {
        return [{'name': '测试随笔'}, {'name': '测试啊测试'}, {'name': '这是一个类型'}]
      }
    }
  }
</script>
<style>
  .el-card__body{
    padding: 4px;
    text-align: center;
    font-size: 0.9em;
    color: #666;
  }
  .el-card{
    margin-top: 10px;
    cursor: pointer;
  }
  .type-row{
    background-color: #fff;
    padding-bottom: 10px;
  }
  .line-vertical{
    width: 1px;
    min-height: 600px;
    background-color: #ddd;
    margin-left: 10px;
  }
  .line-short{
    background-color: #409EFF;
    height: 26px;
    width: 4px;
  }
  .line-short-text{
    margin-left: 8px;
    margin-top: 2px;
  }
  .line-title{
    display: flex;
    background-color: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .type-card{
    border: 1px solid #eeeeec;
    border-radius: 3px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 1.5px 2px 0 rgba(0,0,0,.10), 0 0 4px 0 rgba(0,0,0,.02);
  }
</style>