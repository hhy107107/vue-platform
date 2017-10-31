<template>
	<div>
		<div>
			<el-row :gutter="20" class="title-bar flex-between" style="margin-bottom: 0px">
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
    <div>
      <div class="title-div flex-between">
        <div class="title-left"><el-input v-model="inputTitle" class="title-left"></el-input></div>
        <div class="title_right"><el-button type="warning" round>发表文章</el-button></div>
      </div>
      <div class="line-horizontal margin-top-twenty bar"></div>
      <div  class="bg-white main">
        <div id="editor" class="margin-top-twenty">
          <textarea :value="input" @input="update"></textarea>
          <div v-html="compiledMarkdown"></div>
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
        input: '# hello',
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
  }
  html, body, #editor {
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
  .bar{
    height: 30px;
  }
  .title-div{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
  }
  .title-left{
    font-size: 1.4em;
    color: #565665;
    width: 100%;
    margin-right: 20px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #ffffff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 60px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>