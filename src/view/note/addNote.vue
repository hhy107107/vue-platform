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
    <div class="bg main">
      <div id="editor">
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data: {
        input: '# hello'
      },
      computed: {
        compiledMarkdown: function () {
          return this.$Marked().marked(this.input, { sanitize: true })
        }
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
  margin: 0;
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
</style>