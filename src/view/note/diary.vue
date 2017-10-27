<template>
  <div>
    <el-row>
      <el-col :span="5"><div>
        <el-card>
          <div>
            <!--<calendar class="calendar"></calendar>-->
          </div>
        </el-card>  
      </div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>

</template>
<script>
    import calendar from '../../view/common/calendar.vue'
    export default {
      components: { calendar }
    }
</script>
<style>
  .calendar{
    background-color: white;
  }
</style>