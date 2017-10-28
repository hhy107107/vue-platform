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
                  <el-collapse-item  :key=item.id v-for="(item, index) in essayList" :title="item.name" :name="item.id">
                    <div>{{item.content}}</div>
                    <div class="text-algin-right">查看更多</div>
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
        return [{'name': '测试随笔', 'id': '1', 'content': '内容1'}, {'name': '测试啊测试', 'id': '2', 'content': '内容2'}, {'name': '这是一个类型', 'id': '3', 'content': '内容3'}]
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