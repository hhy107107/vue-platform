<template>
  <div class="height-100 bg">
    <div class="title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="essay-font-title" @click="goToHome">小黄平台</span>
        <div class="essay-font-title-message">-&nbsp;&nbsp;&nbsp;笔记本</div>
        <!-- <i class="iconfont el-icon-hhy-yonghu kefu-icon"></i> -->
        <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
      </div>
      <div class="div-flex">
        <el-dropdown @command="handleTitleBarCommand">
          <img :src="userface" class="note-essay-pictures" >
          <el-dropdown-menu slot="dropdown" id="pictures">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row class="essay-main">
      <div>
          <div class="bg essay-main-left">
            <div class="label-triangle-div">
              <div class="label">author</div>
              <img src="../../assets/image/triangle_right.png" class="label-triangle">
            </div>
            <div class="white margin-left-ten div-flex-column-center user-content">
              <img :src="userface" class="essay-userface">
              <div class="user-name">{{user.name}}</div>
              <el-tag type="warning" class="margin-top-ten">{{user.noteGradeName}}</el-tag>
              <div class="user-info margin-twenty">{{user.signature}}</div>
            </div>
          </div>
          <div class="block-border margin-top-twenty">
            <div class="line-title">
              <div class="line-short"></div>
              <div class="line-short-text">类型</div>
            </div>
            <el-row class="type-row">
              <el-col :key=item.name v-for="(item, index) in typeList" :span=item.name.length*2 :offset=2 :value="item.name">
                <el-card @click.native="typeClick(item)" class="type-card">
                  {{item.name}}
                </el-card> 
              </el-col>
            </el-row>
          </div>
          <div class="block-border-no-bottom margin-top-twenty">
            <div class="line-title">
              <div class="line-short yellow-bg"></div>
              <div class="line-short-text">热门推荐</div>
            </div>
            <el-row>
              <el-col>
                <el-collapse class="collapse-hhy" v-model="activeNames" @change="handleChange">
                  <el-collapse-item :key=item.id v-for="(item, index) in essayList" :title="item.title" :name="item.id">
                    <div>{{item.content}}</div>
                    <div class="show-more" @click="noteClick(item)">查看更多</div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
        </div>
      </div>
      <div class="div-flex-column-right2  width-100 essay-main-center">
        <div class="margin-left-twenty content-card-list">
          <div :key=item.name v-for="(item, index) in essayList" :value="item.name">
            <div @click="noteClick(item)" class="content-card">
              <div class="essay-title">
                {{item.title}}
              </div>
              <div class="essay-time">
                <i class="iconfont el-icon-hhy-shijian5 margin-right-ten small-icon"></i>
                {{getDate(item.createTime)}}
                <i class="iconfont el-icon-hhy-yuedu1 margin-left-twenty margin-right-ten small-icon"></i>
                {{item.readNum}}
              </div>
              <div class="essay-detail">
                {{item.content}}
              </div>
              <div class="flex-right">
                <div class="essay-mark">
                  {{item.typeName}} 
                </div>
              </div>
              <div class="card-line"></div>
            </div> 
          </div>  
        </div>
        <el-pagination class="margin-top-twenty pagination"
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="allNoteCount">
        </el-pagination>
      </div>
      <div class="div-flex-column-center margin-left-forty">
        <el-button id="add-note" type="warning" icon="iconfont el-icon-hhy-bi" style="margin-left: 4px;" v-on:click="addNote"></el-button>
        <el-button id="square" type="primary" icon="iconfont el-icon-hhy-guangchangsquare154" class="margin-top-ten" v-on:click="testHeight"></el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {dateFormat} from '../../assets/js/data.js'
  export default {
    created () {
      this.getTypeList()
      this.getNoteList(1)
      this.initData()
    },
    data () {
      return {
        userface: '',
        user: null,
        activeNames: '',
        pageSize: 20,
        selectedTypeId: '',
        allNoteCount: 0,
        essayList: null,
        typeList: null
      }
    },
    methods: {
      handleTitleBarCommand (command) {
        if (command === 'a') {
          this.goToUserCenter()
        } else if (command === 'b') {
          this.goToLogin()
        }
      },
      goToUserCenter () {
        this.$router.push('/mine')
      },
      goToLogin () {
        this.$router.push('/login')
      },
      goToHome () {
        this.$router.push('/')
      },
      // 时间戳转事件
      getDate (date) {
        return dateFormat(date, 'yyyy-MM-dd')
      },
      initData () {
        this.$https.get(`/initData?needNoteGrade=true`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            this.user = res.data.result
            this.userface = 'http://39.108.176.184/static/' + this.user.userface
          }
        })
      },
      // 获取类型列表
      getTypeList () {
        this.$https.get(`/note/typeList`)
        .then(res => {
          this.typeList = res.data.result
        })
      },
      // 分页点击事件
      pageChange (val) {
        this.getNoteList(val)
      },
      // 文章列表
      getNoteList (pageNo) {
        this.$https.get(`/note/listNote?pageNo=${pageNo}&pageSize=${this.pageSize}&typeId=${this.selectedTypeId}`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            var r = res.data.result
            this.allNoteCount = r.totalCount
            this.essayList = r.list
            this.setUserOnLine(res.data.result)
          } else {
            // 失败
            this.$message('获取文章列表失败')
          }
        })
      },
      typeClick (item) {
        this.selectedTypeId = item.id
        this.getNoteList(1)
      },
      noteClick (item) {
        this.$router.push({path: '/noteDetail', query: {noteId: item.id}})
      },
      addNote: function () {
        this.$router.push({path: '/addNote'})
      },
      testHeight: function () {
        // this.$router.push({path: '/testHeight'})
        this.$router.push({path: '/noteSquare'})
      },
      handleChange () {
        // 当热门推荐被修改的时候
        // this.$message('s' + this.essayList[0].id)
      }
    },
    computed: {
    }
  }
</script>
<style>
  .note-essay-pictures{
    height: 40px;
    width: 40px;
    border-radius: 50px;
    cursor: pointer;
  }
  #add-note{
    width: 50px;
    height: 40px;
    padding: 0px;
  }
  #square{
    width: 50px;
    height: 40px;
    padding: 0px;
  }
  .show-more{
    text-align: right;
    padding-right: 20px;
    font-size: 0.9em;
    cursor: pointer;
    color: rgb(138, 125, 125);
  }
  .essay-main-left{
    min-width: 240px;
  }
  .essay-main-center{
    flex-grow: 1;
  }
  .content-card-list{
    background-color: #fff;
  }
  .card-line{
    background: rgb(241, 241, 241);
    width: 100%;
    height: 1px;
    margin-top: 10px;
  }
  .small-icon{
    font-size: 1.0em;
    color: rgb(201, 201, 201);
  }
  .font-icon{
    color: #ffffff;
    font-size: 1.5em;
    margin-right: 6px;
    font-weight: bold;
  }
  .essay-main{
    background-color: #f8f8f8;
    padding: 20px 100px;
    min-height: 640px;
    display: flex;
    justify-content: space-between;
  }
  .essay-font-title-message{
    color: #fff;
    font-size:0.9em;
    margin-left: 10px;
  }
  .essay-font-title{
    font-size:1.1em;
    color: #ffffff;
    cursor: pointer;
  }
  html,body{
    height: 100%;
  }
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
    background-color: #009966;
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
    padding-left: 20px;
    background-color: #fff;
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
  .essay-userface{
    height: 50px;
    width: 50px;
    border-radius: 50px;
    margin-top: 30px;
  }
  .user-content{
    width: 94%;
    margin-top: -30px;
    border: 1px solid #eeeeec;
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
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0px 20px;
    cursor: pointer;
  }
  .content-card:hover{
    background-color: rgb(252, 252, 252);
  }
  .essay-title{
    color: #000;
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  .essay-time{
    margin-bottom: 10px;
    font-size: 0.9em;
    color: rgb(180, 180, 180);
    display: flex;
    align-items: center;
  }
  .essay-detail{
    margin-bottom: 10px;
  }
  .essay-mark{
    text-align: right;
    font-size: 0.9em;
    color: #009966;
  }
  .pagination{
    text-align: right;
    margin-right: -20px;    
  }
</style>