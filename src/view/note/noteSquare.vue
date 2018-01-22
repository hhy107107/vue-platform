<template>
  <div class="note-square-m">
    <div class="note-square-title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="note-square-font-title" @click="goToHome">小黄平台</span>
        <div class="note-square-font-title-message">-&nbsp;&nbsp;&nbsp;笔记广场</div>
      </div>
      <div class="header-center">
        <div class="search-div">
          <div>搜索笔记</div>
          <div class="search-line"></div>
          <div>
            <el-input id="search"
              placeholder="输入搜索内容"
              icon="search"
              v-model="searchInput">
            </el-input> 
          </div>
          <i class="iconfont el-icon-hhy-sousuo search-icon"></i>
        </div>
        <el-dropdown @command="handleCommand">
          <img :src="userface" class="note-square-pictures">
          <el-dropdown-menu slot="dropdown" id="pictures">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <i class="iconfont el-icon-hhy-nav-my-login-out logout" @click="logoutUser"></i> -->
      </div>
    </div>
    <div class="note-square-center">
      <div class="note-square-center-left">
        <el-carousel class="note-square-banner">
          <el-carousel-item v-for="item in bannerList" :key="item">
              <img :src=item.url class="square-banner-img">
          </el-carousel-item>
        </el-carousel>
        <div class="proficient-label-bg">
          <div class="proficient-label-left-line"></div>
          <div class="proficient-label">学霸推荐</div>
          <div class="proficient-more" @click="goToMoreProficient">更多</div>
        </div>
        <div class="note-square-proficient-bg">
          <div class="note-square-proficient">
            <div v-for="(item, index) in proficientList" :value="item.name" :key="item.name" class="proficient-item">
              <img :src="item.userface" class="proficient-face-img">
              <div class="proficient-intro">
                <div class="proficient-name">{{item.name}}</div>
                <div class="proficient-introduce">{{item.introduce}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="note-square-center-right">
        <div class="note-square-center-right-top">
          <div class="note-square-center-right-top-left"></div>
          <div class="note-square-center-right-top-left-text">小黄精选</div>
        </div>
        <div class="note-square-center=fight-content">
          <div v-for="(item, value) in tuijian" :key="item.title" class="jingxuan">
            <div class="addvertisement" :class="{'addvertisement-show': item.add === true}">广告</div>
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="note-square-main-center">
      <div class="note-square-content-selector">
        <div class="note-square-content-selector-left">
          <el-select v-model="valueGrade" placeholder="请选择年级" class="note-square-select">
            <el-option
              v-for="item in gradeList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="valueSubject" placeholder="请选择学科" class="note-square-select">
            <el-option
              v-for="item in subjectList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="valueKnowlage" placeholder="请选择知识点" id="square-knowlage">
            <el-option
              v-for="item in knowlageList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <div class="square-select-tag">
            <div class="square-select-tag-text">筛选标签</div>
            <el-tag type="success"
              :key="tag"
              v-for="tag in noteSelectTags"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputTagVisible"
              v-model="inputTagValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleTagInputConfirm"
              @blur="handleTagInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput" type="success" plain>输入标签</el-button>
          </div>
          <div class="time-sort">按时间排序 <i class="iconfont el-icon-hhy-jiangxu2" :class="{'sort-time-down': sortTime === true}" @click="sortTimeClick"></i></div>
          <div class="zan-sort">按点赞排序 <i class="iconfont el-icon-hhy-jiangxu2" :class="{'sort-zan-down': sortZan === true}" @click="sortZanClick"></i></div>
        </div>
        <div class="clear-select" @click="clearSelect"><i class="iconfont el-icon-hhy-qingchu"></i>清除所有条件</div>
      </div>
      <div class="note-square-content-card-list">
        <div :key=item.name v-for="(item, index) in essayList" :value="item.name">
          <div @click="noteClick(item)" class="note-square-content-card">
            <div class="note-square-essay-title">
              {{item.title}}
            </div>
            <div class="note-square-essay-time">
              <i class="iconfont el-icon-hhy-shijian5 margin-right-ten small-icon"></i>
              {{getDate(item.createTime)}}
              <i class="iconfont el-icon-hhy-yuedu1 margin-left-twenty margin-right-ten small-icon"></i>
              {{item.readNum}}
            </div>
            <div class="note-square-essay-detail">
              {{item.content}}
            </div>
            <div class="flex-right">
              <div class="note-square-essay-mark">
                {{item.typeName}} 
              </div>
            </div>
            <div class="card-line"></div>
          </div> 
        </div>  
      </div>
      <el-pagination class="margin-top-twenty note-square-pagination"
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="allNoteCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {dateFormat} from '../../assets/js/data.js'
  export default {
    data () {
      return {
        sortZan: false,
        sortTime: true,
        valueGrade: '',
        valueKnowlage: '',
        valueSubject: '',
        gradeList: [{name: '一年级'}, {name: '二年级'}],
        knowlageList: [{name: '跳大神'}, {name: '捉妖'}],
        subjectList: [{name: '玄学'}, {name: '食物学'}],
        noteSelectTags: [],
        inputTagVisible: false,
        inputTagValue: '',
        user: null,
        userface: '',
        allNoteCount: 0,
        essayList: null,
        pageSize: 20,
        selectedTypeId: '',
        searchInput: '',
        tuijian: [{add: false, title: '马云刘强东隔空互怼，美团外卖大范围故障，苹果系统漏洞百出 | 一周业界事'},
        {add: true, title: '《程序员》12月精彩内容：双11技术决战'},
        {add: false, title: '2017年薪酬最高的15门编程语言 GO夺冠 '},
        {add: false, title: '史上最难的一道Java面试题 (分析篇) '},
        {add: true, title: 'AI一分钟 | 马云回应乌镇饭局：饭不重要，饭局上讨论的问题很重要'},
        {add: false, title: '高通回应博通提名董事会人选：公然抢夺董事会控制权'},
        {add: false, title: '图文直播 | BDTC 2017 中国大数据技术大会正在进行'},
        {add: false, title: '中科创达3100万欧元收购图像视觉公司MMS（全球最大的移动和工业图形图像视觉技术公司之一）'},
        {add: false, title: '考拉阅读获近千万美元 A 轮融资，将打造“AI+阅读”研究院'},
        {add: true, title: 'IT 行业加班，到底有没有价值？'}],
        bannerList: [{url: 'http://39.108.176.184/static/banner/banner1.jpg'}, {url: 'http://39.108.176.184/static/banner/banner2.jpg'}, {url: 'http://39.108.176.184/static/banner/banner3.jpg'}],
        proficientList: [{introduce: '考试满分率99%的学霸,乐于分享', userface: 'http://39.108.176.184/static/userface/face1.jpg', name: '徐大统'}, {introduce: '智商最高的小黄，解决问题能力一流', userface: 'http://39.108.176.184/static/userface/face2.jpg', name: '黄小黄'}, {introduce: '情商最高的小新，在校三年，交友2W', userface: 'http://39.108.176.184/static/userface/face3.jpg', name: '陈小新'}, {introduce: '网络红人赵铁柱,直播写作业月入百万', userface: 'http://39.108.176.184/static/userface/face4.jpg', name: '赵铁柱'}]
      }
    },
    created () {
      this.getNoteList(1)
      this.$https.get(`/initData`)
      .then(res => {
        if (res.data.code === 1) {
          // 成功
          this.user = res.data.result
          this.userface = 'http://39.108.176.184/static/' + this.user.userface
        } else {
          // 失败
        }
      })
    },
    computed: {
    },
    methods: {
      goToMoreProficient () {
        this.$router.push('/proficient')
      },
      noteClick (item) {
        this.$router.push({path: '/noteDetail', query: {noteId: item.id}})
      },
      clearSelect () {
        this.sortTime = false
        this.sortZan = false
        this.noteSelectTags = []
        this.valueGrade = ''
        this.valueSubject = ''
        this.valueKnowlage = ''
      },
      sortTimeClick () {
        if (this.sortTime === true) {
          this.sortTime = false
        } else {
          this.sortTime = true
        }
      },
      sortZanClick () {
        if (this.sortZan === true) {
          this.sortZan = false
        } else {
          this.sortZan = true
        }
      },
      showTagInput () {
        this.inputTagVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
          // this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleTagClose (tag) {
        this.noteSelectTags.splice(this.noteSelectTags.indexOf(tag), 1)
      },
      handleTagInputConfirm () {
        let inputValue = this.inputTagValue
        if (inputValue) {
          this.noteSelectTags.push(inputValue)
        }
        this.inputTagVisible = false
        this.inputTagValue = ''
      },
      getDate (date) {
        return dateFormat(date, 'yyyy-MM-dd')
      },
      handleCommand (command) {
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
          } else {
            // 失败
            this.$message('获取文章列表失败')
          }
        })
      }
    }
  }
</script>
<style>
.addvertisement{
  float: left;
  display: none;
}
.addvertisement-show{
  display:block;
  margin-right: 10px;
  border: 1px solid rgb(190, 190, 190);
  border-radius: 3px;
  font-size: 0.7em;
  padding: 1px 6px;
}
.note-square-center{
  overflow: hidden;
}
.jingxuan{
  color: rgb(146, 148, 151);
  margin-top: 10px;
  cursor: pointer;
}
.jingxuan:hover{
  color: rgb(66, 68, 70);
}
.note-square-center{
  display: flex;
  margin: 0px 120px;
}
.note-square-center-left{
  display: flex;
  flex-direction: column;
  width: 70%;
}
.note-square-center-right{
  display: flex;
  flex-direction: column;
  width: 30%;
  background: #fff;
  margin: 0px 10px 10px 10px;
  padding: 10px;
  height: 473.5px;
}
.note-square-center-right-top{
  display: flex;
  align-items: center;
}
.note-square-center-right-top-left{
  width: 3px;
  background-color: rgb(241, 189, 46);
  height: 14px;
}
.note-square-center-right-top-left-text{
  color: rgb(137, 146, 145);
  margin-left: 10px;
}
.el-button--success.is-plain {
    color: #46ba81;
    background: #f0f9eb;
    border-color: #c2e7b0;
}
.sort-time-down{
  color: #46ba81 !important;
}
.sort-zan-down{
  color: #46ba81 !important;
}
.clear-select{
  font-size: 0.9em;
  color: #cf2a2a88;
  margin-right: 20px;
  cursor: pointer;
}
.zan-sort{
  font-size: 0.9em;
  color: #51565fc7;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.time-sort{
  font-size: 0.9em;
  color: #51565fc7;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.el-icon-hhy-jiangxu2{
  cursor: pointer;
  font-size: 20px;
  margin-left: 4px;
  color: #51565f96;
}
.note-square-content-selector .el-input__inner {
  text-align: center;
}
.note-square-content-selector .el-input__inner::placeholder {
  color: #51565f;
}
.square-select-tag-text{
  font-size: 0.9em;
  color: #51565f88;
  margin-right: 10px;
}
.el-select-dropdown__item.selected {
  color: #009966;
  font-weight: 700;
}
.square-select-tag .el-tag{
  margin: 0px 4px;
}
.square-select-tag .el-input__inner{
  border: 1px solid #dfe4ed;
  border-radius: 4px;
}
.square-select-tag .el-input{
  width: 80px;
}
.square-select-tag{
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.note-square-select .el-input__inner{
  border: 0px solid #d8dce5;
  width: 120px;
}
#square-knowlage.el-input__inner{
  border: 0px solid #d8dce5;
  width: 140px;
}
.note-square-content-selector{
  background-color: #fff;
  height: 40px;
  border-bottom: 1px solid #ecececb7;
  border-top: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.note-square-content-selector-left{
  display: flex;
  align-items: center;
}
.proficient-introduce{
  font-size: 0.9em;
  color: #8a8a8a;
  height: 40px;
  overflow: hidden;
  margin: 0px 30px;
  max-width: 200px;
}
.proficient-name{
  margin-top: 8px;
  color: #000;
  font-size: 1.1em;
  text-align: center;
}
.note-square-proficient-bg{
  background-color: #fff;
  margin-bottom: 10px;
}
.note-square-proficient{
  display: flex;
  background-color: #fff;
  width: 100%;
}
.proficient-item{
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: default;
}
.proficient-face-img{
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid rgb(235, 235, 235);
  cursor: pointer;
}
.proficient-label-bg{
  background-color: #fff;
  display: flex;
  padding: 4px 0px;
  align-items: center;
}
.proficient-label-left-line{
  width: 3px;
  height: 20px;
  background-color: rgb(241, 189, 46);
}
.proficient-label{
  padding: 6px;
  /* background: linear-gradient(to right, rgb(235, 235, 235), white); color: #fff; */
  font-size: 1.0em;
  color: rgb(218, 170, 40);
}
.proficient-more{
  color: rgb(201, 200, 194);
  font-size: 0.9em;
  cursor: pointer;
}
.proficient-more:hover{
  color: rgb(218, 170, 40);
  font-size: 0.9em;
}
.square-banner-img{
  width: 100%;  
  height: 240px;
}
.el-carousel__container {
    position: relative;
    height: 240px;
}
.note-square-banner{
  width: 100%;
}
.note-square-banner-right{
  width: 30%;
  background-color: #fff;
  height: 240px;
}
.card-line{
  background: rgb(241, 241, 241);
  width: 100%;
  height: 1px;
  margin-top: 10px;
}
.note-square-essay-title{
  color: #000;
  font-size: 1.2em;
  margin-bottom: 10px;
}
.note-square-essay-time{
  margin-bottom: 10px;
  font-size: 0.9em;
  color: rgb(180, 180, 180);
  display: flex;
  align-items: center;
}
.note-square-essay-detail{
  margin-bottom: 10px;
}
.note-square-essay-mark{
  text-align: right;
  font-size: 0.9em;
  color: #46ba81;
}
.note-square-pagination{
  text-align: right;
}
.note-square-content-card{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  cursor: pointer;
}
.note-square-content-card:hover{
  background-color: rgb(252, 252, 252);
}
.font-icon{
  color: #ffffff;
  font-size: 1.5em;
  margin-right: 6px;
  font-weight: bold;
}
.note-square-main-center{
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0px 120px;
}
.note-square-title-bar{
  height: 57px;
  background-color: #009966;
  display: flex;
  padding: 0px 120px;
  justify-content: space-between;
}
.header-center{
  display: flex;
  align-items: center;
  align-content: center;
}
.note-square-m{
  height: 100%;
  width: 100%;
  min-height: 800px;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
}
.note-square-font-title-message{
  color: #fff;
  font-size:0.9em;
  margin-left: 10px;
}
.note-square-font-title{
  font-size:1.1em;
  color: #ffffff;
  cursor: pointer;
}
.search-div{
  background-color: #048a5d;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 0px 12px;
  margin-right: 20px;
}
.search-line{
  width: 1px;
  height: 12px;
  background-color: #b4bccc;
  margin: 0px 12px 0px 12px;
}
.search-icon{
  color: #ffcc33
}
.header-right{
  display: flex;
  margin-left: 40px;
  margin-right: 20px;
  color: #ffffff;
}
#search.el-input__inner {
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  border: 0px ;
  color: #fff;
  padding: 0px;
}
.note-square-pictures{
  height: 40px;
  width: 40px;
  border-radius: 50px;
  cursor: pointer;
}
</style>