<template>
  <div class="header-hhy">
  <el-row :gutter="20">
    <el-col :span="12"><div class="grid-content bg-purple font-big">Home</div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light">
      <el-input
        placeholder="搜点什么好呢"
        icon="search"
        v-model="input2"
        :on-icon-click="handleIconClick">
      </el-input>
      </div></el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-dropdown>
            <span class="el-dropdown-link">
              Learn<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>JAVA</el-dropdown-item>
              <el-dropdown-item>Android</el-dropdown-item>
              <el-dropdown-item>Vue</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>  
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <span class="el-dropdown-link">
                About US<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>BJHJ</el-dropdown-item>
                <el-dropdown-item>SmallYellow</el-dropdown-item>
                <el-dropdown-item>XUTONG</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <span class="el-dropdown-link">
                Support<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>支付宝</el-dropdown-item>
                <el-dropdown-item>Wechat Pay</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
             <el-dropdown>
              <span class="el-dropdown-link">
                Translations<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </div>
    </el-col>
  </el-row>
  <el-row class="center">
    <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-dark">
      <el-col :span="8"><div class="grid-content bg-purple-dark">
        <img src="https://vuejs.org/images/logo.png" class="logo-big">
      </div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-dark">
        <el-row><el-col :span="24"><div class="grid-content bg-purple-dark"><h1>Welcome to SmallYellow's Home</h1></div></el-col></el-row>
        <el-row><el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-button type="primary">GET STARTED</el-button><el-button>GITHUB</el-button>
        </div></el-col></el-row>
        
      </div></el-col>
    </div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
  </el-row>
  <el-row style="text-align:center; margin:80px" class="content">
    <el-col :span="4" v-for="(item, index) in appList" :key="o">
      <el-card :body-style="{ padding: '0px' }">
        <img src="https://vuejs.org/images/logo.png" class="center-image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <router-link :to=item.link>奇妙之旅</router-link>
            <!--<el-button type="text" class="button" @click="$route.push('/article')">奇妙之旅</el-button>-->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!--<router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input2: '',
        currentDate: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleIconClick () {}
    },
    computed: {
      appList () {
        return [{'name': '笔记本', 'link': '/diary'}, {'name': '客服中心', 'link': '/chat'}, {'name': '笔记本', 'link': '/diary'}]
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .header-hhy{
    margin: 20px;
  }
  .center{
    margin-top: 60px;
  }
  .center-image{
    width: 100px;
    height: 100px;
  }
  .logo-big{
    width: 215px;
    height: 215px;
  }
  
  
</style>
