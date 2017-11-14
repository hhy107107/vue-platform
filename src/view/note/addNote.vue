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
          <i class="iconfont el-icon-hhy-font-bold icon" @click="contentBold"></i>
          <i class="iconfont el-icon-hhy-xieti icon" @click="contentItalic"></i>
          <i class="iconfont el-icon-hhy-tupian icon" @click="dialogInertImgVisible = true"></i>
          <i class="iconfont el-icon-hhy-lianjie2 icon" @click="dialogInertLinkVisible = true"></i>
          <i class="iconfont el-icon-hhy-daima icon" @click="contentCode"></i>
          <i class="iconfont el-icon-hhy-bangzhu1 icon" @click="dialogHelpVisible = true"></i>
      </div>
      <!-- 插入图片弹窗 -->
      <el-dialog title="插入图片" :visible.sync="dialogInertImgVisible">
        <el-tabs type="border-card">
          <el-tab-pane label="在线图片">
            <div>
              <div class="onlinePicTxt">请输入图片完整地址。</div>
              <el-input class="el-input2"
              placeholder="http://example.com/image.jpg"
              prefix-icon="iconfont el-icon-hhy-weibiaoti102-copy"
              v-model="inputImgAddress">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="上传图片">
            <div>
              <div class="flex-between upload-img">
                <el-upload
                  :action="getUploadApi"
                  :name="file"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                    <el-input class="el-input2 img-input-left" :disabled="true"
                    v-model="inputImgAddress">
                      <template slot="prepend">选择图片</template>
                    </el-input>
                </el-upload>
                <el-button type="info" plain class="img-input-right">上传</el-button>
              </div>
              <div class="onlinePicTxt margin-top-ten">1、图片大小不能超过2M；2、支持格式：.jpg .gif .png .bmp。</div>
              <div class="flex-center margin-top-ten">
                <div class="img-preview-div margin-top-ten">
                  <img :src="imageUrl" class="img-preview">
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="断点续传">
            <div>
              <div class="flex-between upload-img">
                <el-upload
                  :action="getUploadApiForPoint"
                  :name="file"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                    <el-input class="el-input2 img-input-left" :disabled="true"
                    v-model="inputImgAddress">
                      <template slot="prepend">选择文件</template>
                    </el-input>
                </el-upload>
                <el-button type="info" plain class="img-input-right">上传</el-button>
              </div>
              <div class="onlinePicTxt margin-top-ten">1、文件大小不能超过1G；</div>
              <div class="flex-left margin-top-ten">
                  <el-button type="warning" plain size="small">暂停，模仿断网</el-button>
                  <el-button type="primary" plain size="small">继续上传</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInertImgVisible = false">取 消</el-button>
          <el-button type="primary" @click="addImg">确 定</el-button>
          <input id="path" type="hidden" value="fileUrl" />
        </span>
      </el-dialog>
      <!-- 插入链接弹窗 -->
      <el-dialog title="添加链接" :visible.sync="dialogInertLinkVisible">
        <div>
          <div class="onlinePicTxt">请输入完整链接地址。</div>
          <el-input class="el-input2"
          placeholder="http://example.com/"
          prefix-icon="iconfont el-icon-hhy-lianjie2"
          v-model="inputLinkAddress"
          id="linkDialogInput">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInertLinkVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLink">确 定</el-button>
        </span>
      </el-dialog>
      <!-- markdown语法帮助 -->
      <el-dialog title="Markdown语法帮助" :visible.sync="dialogHelpVisible"
      :modal=false
      :lock-scroll=false
      :close-on-click-modal=false
      :close-on-press-escape=false
      :append-to-body=true
      class="test1"
      id="helpDialog">
      </el-dialog>
      <div  class="bg-white editor">
        <div id="editor" class="flex-between height-100">
          <textarea :value="input" @input="update" id="editorInput"></textarea>
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
        inputTitle: '标题',
        dialogInertImgVisible: false,
        dialogInertLinkVisible: false,
        dialogHelpVisible: false,
        inputImgAddress: '',
        inputLinkAddress: '',
        imageUrl: '',
        fileUrl: ''
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      },
      getUploadApi: function () {
        var path = document.querySelector('#contextPath').value
        return `${path}/upload`
        // return 'http://127.0.0.1:8080/smallyellow/upload'
      }
    },
    methods: {
      doGetCaretPosition: function () {
        // 获取光标位置
        var oField = document.getElementById('editorInput')
        var iCaretPos = 0
        // IE 支持
        if (document.selection) {
          // 设置焦点
          oField.focus()
          // To get cursor position, get empty selection range
          var oSel = document.selection.createRange()
          // Move selection start to 0 position
          oSel.moveStart('character', -oField.value.length)
          // The caret position is selection length
          iCaretPos = oSel.text.length
        } else if (oField.selectionStart || oField.selectionStart === '0') {
          iCaretPos = oField.selectionStart
        }
        return iCaretPos
      },
      doGetSelectText: function () {
        // 获取文本框选中的文字
        var word = ''
        var selectField = document.getElementById('editorInput')
        if (document.selection) {
          var sel = document.selection.createRange()
          if (sel.text.length > 0) {
            word = sel.text
          }
        } else if (selectField.selectionStart || selectField.selectionStart === '0') {
          var startP = selectField.selectionStart
          var endP = selectField.selectionEnd
          if (startP !== endP) {
            word = selectField.value.substring(startP, endP)
          }
        }
        return word
      },
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.fileUrl = res.result.fileUrl
      },
      addImg (fileUrl) {
        // this.input = this.input + '\n ![图片描述](' + this.fileUrl + ')\n'
        this.dialogInertImgVisible = false
        var length = this.doGetCaretPosition
        var inputStart = this.input.substring(0, length)
        var inputEnd = this.input.substring(length, this.input.length)
        this.input = inputStart + '\n ![图片描述](' + this.fileUrl + ')\n' + inputEnd
      },
      addLink () {
        this.dialogInertLinkVisible = false
        var inputTxt = document.getElementById('linkDialogInput')
        this.inertText('', '[链接说明文字](' + inputTxt.value + ')')
      },
      contentBold () {
        var selectText = this.doGetSelectText()
        if (selectText.length > 0) {
          // 有选中文本，将选中文本加粗
          // 获取光标位置
          var position = this.doGetCaretPosition()
          var inputStart = this.input.substring(0, position)
          var inputEnd = this.input.substring(position + selectText.length, this.input.length)
          this.input = inputStart + '**' + selectText + '**' + inputEnd
        } else {
          this.inertText('', '**重要文字**')
        }
      },
      contentItalic () {
        var selectText = this.doGetSelectText()
        if (selectText.length > 0) {
          // 有选中文本，将选中文本斜体
          // 获取光标位置
          var position = this.doGetCaretPosition()
          var inputStart = this.input.substring(0, position)
          var inputEnd = this.input.substring(position + selectText.length, this.input.length)
          this.input = inputStart + '*' + selectText + '*' + inputEnd
        } else {
          this.inertText('', '*强调文字*')
        }
      },
      contentCode () {
        var selectText = this.doGetSelectText()
        if (selectText.length > 0) {
          // 有选中文本，将选中文本变成代码块
          // 获取光标位置
          var position = this.doGetCaretPosition()
          var inputStart = this.input.substring(0, position)
          var inputEnd = this.input.substring(position + selectText.length, this.input.length)
          this.input = inputStart + '`' + selectText + '`' + inputEnd
        } else {
          this.inertText('', '`代码片段`')
        }
      },
      inertText (position, content) {
        // 在指定位置插入文字 （默认在光标所在位置）
        if (position.length === 0) {
          position = this.doGetCaretPosition()
        }
        var inputStart = this.input.substring(0, position)
        var inputEnd = this.input.substring(position, this.input.length)
        this.input = inputStart + content + inputEnd
      }
    }
  }
</script>
<style>
  #helpDialog{
    position: fixed ;
    top: 20%;
    right: 0;
    bottom: 20%;
    left: 80%;
    overflow: visible;
    margin: 0;
  }
  #helpDialog .el-dialog{
    margin: 0px !important;
    width: 100%;
  }

  .help-card{
    z-index: 100;
  }
  .test{
    display: flex;
    flex-direction: column;
  }
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
    display: flex;
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
  .el-input2 .el-input__inner:hover{
    border: 1px solid #d5d9e0;
    border-radius: 0px;
  }
  .el-input2 .el-input__inner{
    background-color: #fff;
    border: 1px solid #dfe4ed;
    width: 100%;
    border-radius: 0px;
    padding-left: 32px;
    
  }
  .el-input2 .el-input-group__append, .el-input-group__prepend {
    background-color: #f5f7fa;
    color: #878d99;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border-left: 1px solid #d8dce5;
    border-radius: 0px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    cursor: default;
  }
  .el-input.is-disabled .el-input__inner {
    cursor: default;
    background-color: #fff;
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
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .icon:hover{
    background-color: #cccccc;
  }
  .el-tabs--border-card {
    border: 0px solid #d8dce5;
    box-shadow:  0 0px 0px 0 rgba(0,0,0,0), 0 0 6px 0 rgba(0,0,0,0);
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: #ffffff; 
    border-bottom: 1px solid #dfe4ed;
    margin: 0;
 }
 .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: 1px solid transparent; 
    margin-left: 1px;
    margin-top: 1px;
    color: #409EFF;
    font-size: 1.1em;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border-left: 1px solid #dfe4ed; 
    border-top: 1px solid #dfe4ed; 
    border-bottom: 1px solid transparent; 
    margin-left: 1px;
    margin-top: 1px;
    color: #878d99;
}
.el-dialog__body {
    padding: 10px 20px;
    color: #5a5e66;
    line-height: 24px;
    font-size: 14px;
}
.onlinePicTxt{
  color: #b1b7c2;
  font-size: 1.1em;
  margin-bottom: 10px;
}
.el-tabs--border-card>.el-tabs__content {
    padding: 15px 2px 15px 2px;
}
.img-input-left{
  width: 180%;
}
.img-input-right{
  width: 12%;
}
.upload-img .el-button{
  border-radius: 0px;
}
.img-preview-div{
  width: 12em;
  height: 12em;
  border: 1px solid #d8dce5;
  align-content: center;
}
.img-preview{
  width: 100%;
  height: 100%;
}
.el-upload {
    display: inline-block;
    text-align: left;
    cursor: default;
    width: 100%;
}
</style>