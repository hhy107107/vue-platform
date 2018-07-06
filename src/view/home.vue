<template>
  <div class="height-100">
    <div class="home-title-bar">
        <div class="header-left">
          <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="font-title pointer">小黄平台</span>
          <div class="header-left2">
            <div v-for="(menu, index) in menuList2" 
              :key="menu.name" class="menu-item-left" 
              :class="{'menu-item-left-activate': menu.selected}" @click="selectedMenu(menu.id)">
              <div>{{menu.name}}</div>
              <!-- <div class="item-selected-line"></div> -->
            </div>
          </div>
        </div>
        <div class="header-center">
          <div class="search-div">
            <div>搜索应用</div>
            <div class="search-line"></div>
            <div>
              <el-input id="search"
                placeholder="输入搜索内容"
                v-model="inputSerch">
              </el-input> 
            </div>
            <i class="iconfont el-icon-hhy-sousuo search-icon"></i>
          </div>
          <el-dropdown @command="handleCommand">
            <img :src="userface" class="pictures">
            <el-dropdown-menu slot="dropdown" id="pictures">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <i class="iconfont el-icon-hhy-nav-my-login-out logout" @click="logoutUser"></i> -->
        </div>
    </div>
    <div class="home-banner">
      <img src="../assets/image/banner.png" class="banner-img">
    </div>
    <el-popover
      ref="popover2"
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>
    <div class="home-content">
      <div class="all-model-text">全部模块</div>
      <div class="all-model">
        <div v-for="(item, index) in appList" class="model" v-popover:popover2 @click="modelClick(item.link)">
          <i class="iconfont model-icon" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
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
      appList: [
        {'id': 'm1', 'name': '笔记本', 'link': '/essay', 'icon': 'el-icon-hhy-bijiben'},
        {'id': 'm2', 'name': '客服中心', 'link': '/chat', 'icon': 'el-icon-hhy-xiaoxi'},
        {'id': 'm3', 'name': '客服后台', 'link': '/chatManager', 'icon': 'el-icon-hhy-kefu1'},
        {'id': 'm3', 'name': '其他', 'link': '/chatManager', 'icon': 'el-icon-hhy-qita'},
        {'id': 'm3', 'name': '客服中心2.0', 'link': '/chat2', 'icon': 'el-icon-hhy-xiaoxi'},
        {'id': 'm3', 'name': '客服后台2.0', 'link': '/chatManager2', 'icon': 'el-icon-hhy-kefu1'},
        {'id': 'm3', 'name': '其他', 'link': '/chatManager', 'icon': 'el-icon-hhy-qita'},
        {'id': 'm3', 'name': '其他', 'link': '/chatManager', 'icon': 'el-icon-hhy-qita'},
        {'id': 'm3', 'name': '其他', 'link': '/chatManager', 'icon': 'el-icon-hhy-qita'},
        {'id': 'm3', 'name': '', 'link': '/chatManager', 'icon': ''},
        {'id': 'm3', 'name': '', 'link': '/chatManager', 'icon': ''},
        {'id': 'm3', 'name': '', 'link': '/chatManager', 'icon': ''}
      ],
      menuList2: [{'id': '0', 'name': '首页', 'selected': true}, {'id': '1', 'name': '关于我们', 'selected': false}, {'id': '2', 'name': '支持', 'selected': false}, {'id': '3', 'name': '翻译', 'selected': false}],
      user: null,
      userface: '',
      inputSerch: ''
    }
  },
  methods: {
    modelClick (path) {
      this.$router.push(path)
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
    selectedMenu (id) {
      for (var i = 0; i < this.menuList2.length; i++) {
        if (this.menuList2[i].id === id) {
          this.menuList2[i].selected = true
        } else {
          this.menuList2[i].selected = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.footer{
  background-color: #333;
  min-height: 200px;
  width: 100%;
}
.model-icon{
  font-size: 2.0em;
  margin-bottom: 10px;
  color: #666666;
}
.model{
  width: 195px;
  height: 160px;
  border-right: 1px solid #ededed;
  border-top: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.1em;
}
.model:hover{
  background-color: #fff;
}
.all-model{
  width: 1177px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fafafa;
  border-left: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  margin-bottom: 40px;
}
.all-model-text{
  font-size: 1.4em;
  margin: 20px;
}
.home-banner{
  height: 400px;
  width: 100%;
  min-width: 1170px;
}
.banner-img{
  width: 100%;
  height: 400px;
}
.home-content{
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 0px 120px;
  align-items: center;
}
.pictures{
  height: 40px;
  width: 40px;
  border-radius: 50px;
  cursor: pointer;
}
.home-title-bar{
  height: 57px;
  background-color: #009966;
  display: flex;
  padding: 0px 120px;
  justify-content: space-between;
}
.font-title{
  font-size:0.9em;
  color: #ffffff;
}
.font-icon{
  color: #ffffff;
  font-size: 1.5em;
  margin-right: 6px;
  font-weight: bold;
}
.header-left{
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-center{
  display: flex;
  align-items: center;
  align-content: center;
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
.menu-item{
  padding: 0px 6px;
  cursor: pointer;
}
.menu-item-left{
  padding: 0px 12px;
  cursor: pointer;
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
}
.menu-item-left-activate{
  background-color: #048a5d;
}
.menu-item-left-activate::after{
  background-color: #ffcc33;
  content: '';
  position: absolute;
  bottom: 0px;
  height: 4px;
  width: 16px;
  margin: auto;
  align-self: center;
  margin-bottom: -2px;
}
.header-left2{
  display: flex;
  margin-left: 40px;
  margin-right: 20px;
  height: 100%;
  color: #ffffff;
}
.item-selected-line{
  background-color: #ecdd02;
  height: 3px;
  width: 8px;
}
#search.el-input__inner {
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  border: 0px ;
  color: #fff;
  padding: 0px;
}
.logout{
  color: white;
  cursor: pointer;
}
#pictures.el-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 0px 0px 0 rgba(255, 255, 255, 0);
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #edffec;
  color: #009966;
}
</style>
      