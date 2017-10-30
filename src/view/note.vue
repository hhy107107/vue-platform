<template>
  <div>
    <div>
      <el-row :gutter="20" class="title-bar flex-between" style="margin-bottom: 0px">
        <el-col :span="19">
          <div class="div-flex">
            <div class="grid-content bg-purple font-big-module">Home</div>
            <div class="font-middle-module">-笔记</div>
            <img src="../assets/image/icon_note.png" class="icon-top">
          </div>
        </el-col>
        <el-col :span=4>
          <el-tabs v-model="activeIndex" @tab-click="tabClick">
            <el-tab-pane :key="item.route" v-for="(item, index) in noteOptions" :label="item.name" :name="item.route">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div class="line-horizontal"></div>
    </div>
    <main class="main bg">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import calendar from '../view/common/calendar.vue'
  export default {
    data () {
      return {
        msg: '测试页面',
        activeIndex: 'essay'
      }
    },
    methods: {
      tabClick () {
        this.$router.push({path: this.activeIndex})
      }
    },
    computed: {
      noteOptions () {
        return [{'name': '日记', 'route': 'diary'}, {'name': '随笔', 'route': 'essay'}]
      }
    },
    components: { calendar }
  }
</script>

<style>
  .font-middle-module{
    font-size:1.0em;
    margin-left:10px;
  }
  .font-big-module{
    font-size:1.5em;
    margin-left:30px;
  }

 
</style>