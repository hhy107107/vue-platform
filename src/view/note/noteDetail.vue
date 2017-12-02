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
    <div class="main2">
      <el-col :span="18" class="left-detail">
        <div class="note">
          <div class="note-title">{{note.title}}</div>
          <div class="note-tag-date">
            <div class="div-flex">
              <el-tag size="mini" type="danger">{{note.typeName}}</el-tag>
              <div class="note-date">{{getDate(note.createTime)}}</div>
            </div>
            <div class="note-title-right">
              <i class="iconfont el-icon-hhy-yuedu"></i>{{note.readNum}}
              <span class="note-zan" @click="changeNoteZan" :class="{'note-zaned': isZan === 1}"><i class="iconfont el-icon-hhy-zan margin-left-ten"></i>{{note.zanNum}}</span>
            </div>
          </div>
          <div class="line-horizontal"></div>
          <div v-html="compiledMarkdown" class="note-content"></div>
        </div>
      </el-col>
      <el-col :span="5" class="right-detail">
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
  import marked from 'marked'
  import {dateFormat} from '../../assets/js/data.js'
  import querystring from 'querystring'
  export default {
    data () {
      return {
        noteId: this.$route.query.noteId,
        note: null,
        isZan: 2
      }
    },
    created () {
      this.getNoteDetail()
      this.getNoteZan()
    },
    computed: {
      compiledMarkdown: function () {
        if (this.note.isMarkDown === 1) {
          return marked(this.note.content, { sanitize: true })
        } else {
          return this.note.content
        }
      }
    },
    methods: {
      // 时间戳转事件
      getDate (date) {
        return dateFormat(date, 'yyyy-MM-dd')
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
      },
      getNoteZan () {
        this.$https.get(`/note/getZan?noteId=` + this.noteId)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            if (res.data.result.zan !== null) {
              this.isZan = res.data.result.zan
            }
          } else {
            // 失败
            this.$message('文章不存在')
          }
        })
      },
      changeNoteZan () {
        var noteZan = this.isZan
        if (noteZan === 1) {
          noteZan = 2
        } else {
          noteZan = 1
        }
        this.$https.post(`/note/changeZan`, querystring.stringify({
          noteId: this.note.id,
          zan: noteZan
        }))
        .then(res => {
          if (res.data.code === 1) {
            this.getNoteZan()
          }
        })
      }
    }
  }
</script>
<style>
  .note-zaned{
    color: #ae0123;
  }
  .note-zan{
    cursor: pointer;
  }
  .note-zan:hover{
    color: #ec748c;
  }
  .note-title-right{
    cursor: default;
    margin-right: 20px;
    color: #666666;
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
  .main2{
    height: 100%;
    padding: 20px 40px 20px 40px !important;
    display: flex;
    justify-content: space-between;
    background-color: rgb(247, 247, 247);
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
    justify-content: space-between;
  }
  .note-content{
    font-size: 1.2em;
    color: #464646;
    padding: 20px;
  }
  .note-date{
    color: #666666;
    font-size: 1.0em;
    margin-left: 10px;
  }
  .left-detail{
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
</style>