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
    <div class="proficient-line-horizontal"></div>
    <div class="note-proficient-banner">
      <img src="../../assets/image/proficient_banner_bg2.png" class="note-proficient-banner-img">
      <div class="note-proficient-banner-content">
        <div class="note-proficient-banner-content-left">
          <img src="../../assets/image/proficient_default.png">
        </div>
        <div class="note-proficient-banner-content-center">
          <img src="../../assets/image/proficient_text.png">
          <span>是小黄平台给予质量较高、影响力较大的笔记作者的荣誉称号，代表了小黄平台官方
              对其笔记的肯定。</span>
          <span class="margin-top-ten">学霸特权</span>
          <div class="div-flex margin-top-four"><i class="iconfont el-icon-hhy-jiantou1 margin-right-four"></i><span class="bold-text">学霸勋章：</span><span>易于被辨识，获得更多的关注</span></div>
          <div class="div-flex margin-top-four"><i class="iconfont el-icon-hhy-jiantou1 margin-right-four"></i><span class="bold-text">优先推荐：</span><span>你的笔记会被优先推荐，获得更多曝光</span></div>
          <div class="div-flex margin-top-four"><i class="iconfont el-icon-hhy-jiantou1 margin-right-four"></i><span class="bold-text">线下活动：</span><span>有机会免费参加小黄平台主办的盛会和活动，获得更多的交流机会</span></div>
        </div>
        <div class="note-proficient-banner-content-right">
          <div class="new-proficient-label">他们刚刚加入</div>
          <div class="new-proficient-face-div">
            <img v-for="(item, index) in newProficientList" :src=item.url class="new-proficient-face">
          </div>
          <div class="note-proficient-banner-content-right-line"></div>
          <div class="note-proficient-banner-content-right-button">申请学霸</div>
        </div>
      </div>
    </div>
    <div class="note-proficient-center">
      <div class="note-proficient-type">
        <popper trigger="hover" 
          :options="{placement: 'right'}" 
          v-for="(item, index) in subjectList"
          :key="item.name"
          >
          <div>
            <div class="popper2">
              <div class="title"><i class="iconfont el-icon-hhy-dengji"></i>年级 / 等级</div>
              <div class="grade">
                <div v-for="(item2, index2) in item.grade" class="grade-item">
                  {{item2.name}}
                </div>
              </div>
              <div class="title2"><i class="iconfont el-icon-hhy-dengji"></i>擅长领域</div>
              <div class="grade">
                <div v-for="(item3, index3) in item.goodat" class="grade-item">
                  {{item3.name}}
                </div>
              </div>
            </div>
          </div>
          <div class="proficient-type-item" slot="reference">
            <div class="proficient-type-item-text">{{item.name}}</div>
          </div>
        </popper>
      </div>
      <div class="note-proficient-content">
        <div class="proficient-proficient-bg">
          <div class="proficient-proficient">
            <div v-for="(item, index) in proficientList" :value="item.name" :key="item.name" class="proficient-proficient-item">
              <img :src="item.userface" class="proficient-proficient-face-img">
              <div class="proficient-proficient-intro">
                <div class="proficient-proficient-name">{{item.name}}</div>
                <div class="proficient-proficient-introduce">{{item.introduce}}</div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination class="margin-top-twenty proficient-pagination"
          layout="prev, pager, next"
          @current-change="pageProficientChange"
          :total="allProficientCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import Popper from 'vue-popperjs'
  import 'vue-popperjs/dist/css/vue-popper.css'
  export default {
    components: {
      'popper': Popper
    },
    created () {
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
    data () {
      return {
        allProficientCount: 1,
        pageSize: 20,
        subjectList: [{goodat: [{name: '风水'}, {name: '天气'}, {name: '求雨'}], grade: [{name: '一年级'}, {name: '二年级'}], name: '玄学'},
        {goodat: [{name: '烟草制作'}, {name: '吸烟'}, {name: '化验'}, {name: '质检'}], grade: [{name: '一年级'}, {name: '二年级'}], name: '烟草学'},
        {goodat: [{name: 'java语法'}, {name: '异常'}, {name: 'spring'}], grade: [{name: '初级'}, {name: '中级'}], name: 'Java开发'},
        {goodat: [{name: '运动健康'}, {name: '健身'}, {name: '肌肉'}], grade: [{name: '一年级'}, {name: '二年级'}], name: '运动学'},
        {goodat: [{name: '一年级'}, {name: '二年级'}], grade: [{name: 'N1'}, {name: 'N2'}, {name: 'N3'}, {name: 'N4'}, {name: 'N5'}], name: '日语'},
        {goodat: [{name: '一年级'}, {name: '二年级'}], grade: [{name: '一年级'}, {name: '二年级'}], name: '英国历史'}],
        userface: '',
        newProficientList: [{url: 'http://39.108.176.184/static/userface/face1.jpg'}, {url: 'http://39.108.176.184/static/userface/face2.jpg'}, {url: 'http://39.108.176.184/static/userface/face3.jpg'}],
        proficientList: [
          {introduce: '考试满分率99%的学霸,乐于分享', userface: 'http://39.108.176.184/static/userface/face1.jpg', name: '徐大统'},
          {introduce: '智商最高的小黄，解决问题能力一流', userface: 'http://39.108.176.184/static/userface/face2.jpg', name: '黄小黄'},
          {introduce: '情商最高的小新，在校三年，交友2W', userface: 'http://39.108.176.184/static/userface/face3.jpg', name: '陈小新'},
          {introduce: '网络红人赵铁柱,直播写作业月入百万', userface: 'http://39.108.176.184/static/userface/face4.jpg', name: '赵铁柱'},
          {introduce: '考试满分率99%的学霸,乐于分享', userface: 'http://39.108.176.184/static/userface/face1.jpg', name: '徐大统'},
          {introduce: '智商最高的小黄，解决问题能力一流', userface: 'http://39.108.176.184/static/userface/face2.jpg', name: '黄小黄'},
          {introduce: '情商最高的小新，在校三年，交友2W', userface: 'http://39.108.176.184/static/userface/face3.jpg', name: '陈小新'},
          {introduce: '网络红人赵铁柱,直播写作业月入百万', userface: 'http://39.108.176.184/static/userface/face4.jpg', name: '赵铁柱'}
        ]
      }
    },
    methods: {
      // 文章列表
      getProficientList (pageNo) {
        this.$https.get(`/note/xxx?pageNo=${pageNo}&pageSize=${this.pageSize}&typeId=${this.selectedTypeId}`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            var r = res.data.result
            this.allProficientCount = r.totalCount
            this.proficientList = r.list
          } else {
            // 失败
            this.$message('获取文章列表失败')
          }
        })
      },
      // 分页点击事件
      pageProficientChange (val) {
        this.getProficientList(val)
      },
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
      }
    }
  }
</script>
<style>
  /* 右部开始 */
.proficient-pagination{
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  margin-right: 40px;
}
.proficient-proficient-introduce{
  font-size: 0.9em;
  color: #8a8a8a;
  height: 40px;
  overflow: hidden;
  margin: 0px 30px;
  max-width: 200px;
}
.proficient-proficient-name{
  margin-top: 8px;
  color: #000;
  font-size: 1.1em;
  text-align: center;
}
.proficient-proficient-bg{
  background-color: #fff;
  margin-bottom: 10px;
}
.proficient-proficient{
  display: flex;
  background-color: #fff;
  width: 100%;
  flex-wrap: wrap;
}
.proficient-proficient-item{
  margin: 10px;
  display: flex;
  width: 31%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: default;
}
.proficient-proficient-face-img{
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid rgb(235, 235, 235);
  cursor: pointer;
}
.proficient-proficient-label-bg{
  background-color: #fff;
  display: flex;
  padding: 4px 0px;
  align-items: center;
}
  /* 右部开始 */
  /* 中部及中部左侧 开始 */
.popper2 .title2{
  color: #009966;
  font-size: 1.05em;
  margin-top: 20px;
}
.popper2 .title{
  color: #009966;
  font-size: 1.05em;
}
.popper2 .grade{
  display: flex;
  margin-top: 6px;
}
.popper2 .grade .grade-item{
  margin-right: 10px;
  margin-left: 8px;
  color: rgb(55, 56, 58);
  cursor: pointer;
}
.popper2 .grade .grade-item:hover{
  color: #009966;
}
.note-proficient-type .popper2 {
    width: auto;
    background-color: rgba(241, 241, 241, 0.705);
    color: #000000;
    padding: 10px 12px;
    display: inline-block;
    border: 1px #ebebeb solid;
    border-left: 0px;
    z-index: 200000;
    min-height: 100px;
    position: absolute;
    top: -20px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
}
.proficient-type-item-text{
  padding: 10px;
}
.proficient-type-item{
  color: rgb(63, 61, 61);
  border-bottom: 1px dashed rgb(231, 231, 231);
  cursor: pointer;
}
.proficient-type-item:hover{
  background-color: rgb(241, 241, 241);
}
.note-proficient-type{
  width: 240px;
  background-color: rgb(255, 255, 255);
  margin-right: 20px;
  margin-left: 120px;
  border-top: 2px solid rgb(241, 189, 46);
}
.note-proficient-content{
  margin-right: 120px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
}
.note-proficient-center{
  background-color: #f7f7f7;
  padding: 20px 0px;
  display: flex;
}
  /* 中部左侧 结束 */
  /* banner开始 */
.new-proficient-label{
  color: rgb(131, 136, 128);
}
.new-proficient-face-div{
  margin-top: 10px;
  width: 220px;
}
.note-proficient-banner-content-right-button{
  background-color: #009966;
  color: #fff;
  padding: 8px 18px;
  border-radius: 2px;
  margin-top: 10px;
  cursor: pointer;
}
.note-proficient-banner-content-right-button:hover{
  background-color: #08aa74;
}
.note-proficient-banner-content-right-line{
  width: 80%;
  border-bottom: 1px dashed #009966;
  margin: 10px;
}
.new-proficient-face{
  width: 50px;
  margin: 10px;
  border-radius: 30px;
}
.note-proficient-banner-content-right{
  height: 76%;
  width: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bold-text{
  font-weight: bold;
}
.el-icon-hhy-jiantou1{
  font-size: 1.3em;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.699);
}
.note-proficient-banner-content-center img{
  width: 240px;
  height: 70px;
}
.note-proficient-banner-content-center{
  display: flex;
  flex-direction: column;
  color: #fff;
  justify-content: center;
  margin-right: 60px;
}
.note-proficient-banner-content-left img{
  height: 100%;
}
.note-proficient-banner-content-left{
  display: flex;
  align-items: center;
  margin-left: -40px;
  height: 90%;
}
.note-proficient-banner-content{
  height: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  position: absolute;
  padding: 0px 120px;
  align-items: center;
}
.note-proficient-banner-img{
  width: 100%;
  height: 100%;
  opacity:0.3;
  filter:alpha(opacity=30); /* 针对 IE8 以及更早的版本 */
  position: absolute;
}
.note-proficient-banner{
  /* background: #009966 url("../../assets/image/proficient_banner_bg2.png") repeat-x; */
  background-color: #009966;
  height: 330px;
  width: 100%;
  position: relative;
}
  /* banner结束 */
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