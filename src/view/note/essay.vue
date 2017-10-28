<template>
  <div>
    <el-row>
      <el-col :span="5"><div>
          <div class="bg">
            <div class="label-triangle-div">
              <div class="label">author</div>
              <img src="../../assets/image/triangle_right.png" class="label-triangle">
            </div>
            <div class="white margin-left-ten div-flex-column-center user-content">
              <img src="../../assets/image/temp_pictures.jpg" class="pictures">
              <div class="user-name">小黄</div>
              <el-tag type="warning" class="margin-top-ten">写作达人</el-tag>
              <div class="user-info margin-twenty">两君子无争，相让故也。一君子一小人无争，有容故也。争者两小人也，有识者奈何自处于小人。</div>
            </div>
          </div>
          <div class="block-border margin-top-twenty">
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
          <div class="block-border-no-bottom margin-top-twenty">
            <div class="line-title">
              <div class="line-short red-bg"></div>
              <div class="line-short-text">热门推荐</div>
            </div>
            <el-row>
              <el-col>
                <el-collapse class="collapse-hhy" v-model="activeNames" @change="handleChange">
                  <el-collapse-item :key=item.id v-for="(item, index) in essayList" :title="item.name" :name="item.id">
                    <div>{{item.content}}</div>
                    <div class="text-algin-right">查看更多</div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
        </div>
      </div></el-col>
      <el-col :span="18"><div class="grid-content margin-left-forty">
        <el-col :key=item.name v-for="(item, index) in essayList" :value="item.name">
          <el-card @click.native="typeClick" class="content-card">
            <div class="essay-title">
              {{item.name}}
            </div>
            <div class="essay-detail">
              {{item.content}}
            </div>
            <div class="flex-right">
              <div class="margin-right-ten">——</div>
              <div class="essay-mark">
                {{item.mark}} 2017.10
              </div>
            </div>
            
          </el-card> 
        </el-col>  
      </div></el-col>
      <el-col :span="1"><div class="div-flex-column-center margin-left-forty">
        <el-button type="warning" icon="edit" style="margin-left: 4px;"></el-button>
        <el-button type="primary" icon="share" class="margin-top-ten"></el-button>
      </div></el-col>
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
        return [{'name': '测试随笔', 'id': '1', 'content': '假若我是一朵雪花，翩翩的在半空里潇洒，我一定认清我的方向——飞扬，飞扬，飞扬，这地面上有我的方向。', 'mark': '小黄记于周六写代码时'}, {'name': '测试啊测试', 'id': '2', 'content': '内容2'}, {'name': '这是一个类型', 'id': '3', 'content': '内容3'}]
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
  .collapse-hhy{
    border: 1px solid #ffffff !important;
  }
  .label{
    background-color: #ae0123;
    width: 28%;
    height: 24px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    color: #fff;
  }
  .label-triangle{
    width: 3%;
    height: 3px;
  }
  .label-triangle-div{
    display: flex;
    flex-direction: column;
  }
  .pictures{
    height: 50px;
    width: 50px;
    border-radius: 50px;
    margin-top: 30px;
  }
  .user-content{
    width: 94%;
    margin-top: -30px;
  }
  .user-name{
    margin-top: 6px;
    font-size: 1.0em;
  }
  .user-info{
    font-size: 0.8em;
    color: #000;
  }
  .content-card{
    padding: 10px;
    box-shadow: 0 1.5px 2px 0 rgba(0,0,0,.10), 0 0 4px 0 rgba(0,0,0,.02);
    border: 1px solid #f4f4f4;    
  }
  .essay-title{
    color: #000;
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  .essay-detail{
    margin-bottom: 10px;
  }
  .essay-mark{
    text-align: right;
  }
 
</style>