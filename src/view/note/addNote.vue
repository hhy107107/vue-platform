<template>
	<div class="m">
		<div>
			<el-row class="title-bar flex-between" style="margin-bottom: 0px">
				<el-col :span="19">
          <div class="div-flex">
            <div class="grid-content bg-purple font-big-module">Home</div>
            <div class="font-middle-module">-笔记</div>
            <img src="../../assets/image/icon_note.png" class="icon-top">
          </div>
				</el-col>
				<el-col :span=4>
          <div class="edit-mode flex-center">
              <div class="edit-mode-text-clicked">Markdown</div>
              <div class="edit-mode-text">普通</div>
          </div>
				</el-col>
			</el-row>
      <div class="line-horizontal"></div>
    </div>
    <div class="c">
      <div class="title-div flex-between">
        <div class="title-left"><el-input v-model="inputTitle" class="title-left"></el-input></div>
        <div class="title_right"><el-button type="warning" round>发表文章</el-button></div>
      </div>
      <div class="line-horizontal margin-top-ten bar">
          <i class="el-icon-picture-outline icon"></i>
      </div>
      <div  class="bg-white editor">
        <div id="editor" class="flex-between height-100">
          <textarea :value="input" @input="update"></textarea>
          <div v-html="compiledMarkdown" class="markdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import marked from 'marked'
  import _ from 'lodash'
  export default {
    data () {
      return {
        input: '### hello',
        inputTitle: '标题'
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }
</script>
<style>
  .edit-mode-text-clicked{
    color: #409EFF;
    font-size: 1.3em;
    margin-right: 10px;
  }
  .edit-mode-text{
    color: #666666;
    font-size: 0.9em;
  }
  .title-bar{
    padding-top: 10px;
    padding-bottom: 10px;
    height: 50px;
  }
  textarea {
    border: none;
    resize: none;
    outline: none;
    background-color: #ffffff;
    font-size: 14px;
    width: 50%;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
    height: 100%;
  }
  code {
    color: #f66;
  }
  .bar{
    height: 60px;
  }
  .title-div{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
    height: 60px;
  }
  .title-left{
    font-size: 1.4em;
    color: #565665;
    width: 100%;
    margin-right: 20px;
  }
  .el-input__inner {
    background-color: #fff;
    border: 1px solid #ffffff;
    width: 100%;
  }
  .markdown{
    background-color: #f6f6f6;
    width: 50%;
    padding: 20px;
    height: 100%;
  }
  .editor{
    height: calc(100% - 160px);
  }
  .c{
    height: calc(100% - 51px);
  }
  .icon{
    width: 40px;
    height: 40px;
  }
</style>