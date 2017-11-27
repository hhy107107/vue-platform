<template>
  <div class="m">
    <el-row class="title-bar flex-between" style="margin-bottom: 0px">
      <el-col :span="24">
        <div class="div-flex">
          <div class="bg-purple font-big-module">Home</div>
          <div class="font-middle-module">-笔记详情</div>
          <img src="../../assets/image/icon_note.png" class="icon-top">
        </div>
      </el-col>
    </el-row>
    <div class="line-horizontal"></div>
    <div class="main">
      <el-col :span="18" class="left">
        <div class="note">
          <div class="note-title">{{note.title}}</div>
          <div class="note-tag-date">
            <el-tag size="mini" type="danger">{{note.typeName}}</el-tag>
            <div class="note-date">{{getDate(note.createTime)}}</div>
          </div>
          <div class="line-horizontal"></div>
          <div class="note-content">{{note.content}}</div>
        </div>
      </el-col>
      <el-col :span="5" class="right">
        <div>
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
      </el-col>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        noteId: this.$route.query.noteId,
        note: null
      }
    },
    created () {
      this.getNoteDetail()
    },
    methods: {
      // 时间戳转事件
      getDate (date) {
        var newDate = new Date()
        newDate.setTime(date)
        return newDate.toLocaleDateString()
      },
      // 获取文章详情
      getNoteDetail () {
        this.$https.get(`/note/noteDetail?id=` + this.noteId)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            this.note = res.data.result
          } else {
            // 失败
            this.$message('文章不存在')
          }
        })
      }
    }
  }
</script>
<style>
  .right{
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
  .main{
    height: 100%;
    padding: 20px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
  }
  .note{
    padding: 20px 0px 20px 0px;
  }
  .note-title{
    font-size: 1.8em;
    padding-left: 20px;
    padding-right: 20px;
  }
  .note-tag-date{
    display: flex;
    padding-left: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .note-content{
    font-size: 1.2em;
    color: #464646;
    padding: 20px;
  }
  .note-date{
    color: #adadad;
    font-size: 1.0em;
    margin-left: 10px;
  }
  .left{
    background-color: #fff;
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
    color: rgb(238, 160, 16);
    margin-left: 10px;
  }
  .main{
    background-color: rgb(247, 247, 247)
  }
</style>