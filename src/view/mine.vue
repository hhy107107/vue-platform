<template>
  <div class="height-100">
    <div class="title-bar">
      <div class="div-flex">
        <i class="iconfont el-icon-hhy-yun font-icon"></i><span class="mine-font-title" @click="goToHome">小黄平台</span>
        <div class="mine-font-title-message">-&nbsp;&nbsp;&nbsp;个人中心</div>
        <!-- <i class="iconfont el-icon-hhy-yonghu kefu-icon"></i> -->
        <!-- <img src="../assets/image/icon_note.png" class="icon-top"> -->
      </div>
    </div>
    <div class="line-horizontal"></div>
    <div class="mine-m3">
      <div class="mine-left">
        <el-menu 
          default-active="personal"
          class="el-menu-vertical-demo padding-top-ten"
          @select="handleSelected"
          @close="handleClose">
          <el-menu-item index="personal">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="account">
            <i class="el-icon-setting"></i>
            <span slot="title">账户信息</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="mine-right">
        <div id="personal" :class="{'menu-hiddle': menuKey === 'account'}">
          <div class="m2">
            <div class="personal-left bg">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户昵称" prop="name">
                  <el-col :span="18">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="通讯地址" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="date1">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="用户类型" prop="sex">
                  <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="我是绅士"></el-radio>
                    <el-radio label="我是小黄"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="为何而来" prop="reason">
                  <el-checkbox-group v-model="ruleForm.reason">
                    <el-checkbox label="崇拜小黄" name="1"></el-checkbox>
                    <el-checkbox label="崇拜统子" name="2"></el-checkbox>
                    <el-checkbox label="想了解bjhj" name="3"></el-checkbox>
                    <el-checkbox label="被小黄无形之中的气质吸引" name="4"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
                <el-form-item label="个性签名" prop="signature">
                  <el-input type="textarea" v-model="ruleForm.signature"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="personal-right">
              <el-upload
                class="mine-avatar-uploader"
                :action="getUploadApi"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="mine-avatar">
                <i v-else class="el-icon-plus mine-avatar-uploader-icon"></i>
              </el-upload>
              <div class="flex-center margin-top-ten">
                <el-button type="warning" size="small" round @click="changeFace">保存头像</el-button>
              </div>
            </div>
          </div>
        </div>
        <div id="account" :class="{'menu-hiddle': menuKey === 'personal'}">
          <div class="m-account">
            <div class="mine-font">
              <div class="div-flex">
                <i class="iconfont el-icon-hhy-zhanghao mine-icon"></i>
                <span class="text">账号：</span><span class="text">{{username}}</span>
              </div>
              <div class="margin-left-twenty div-flex">
                <i class="iconfont el-icon-hhy-youxiang mine-icon"></i>
                <span class="text">邮箱：</span><span class="text">{{email}}</span>
              </div>
            </div>
            <div class="line-horizontal"></div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm padding-top-twenty">
              <el-form-item label="输入旧密码" prop="oldPass">
                <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
              </el-form-item>  
              <el-form-item label="输入新密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
    import querystring from 'querystring'
    import {dateFormat} from '../assets/js/data.js'
    export default {
      created () {
        this.$https.get(`/initData`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            var u = res.data.result
            this.user = u
            this.ruleForm.name = u.name
            this.ruleForm.address = u.address
            this.ruleForm.date1 = u.birthday
            var reason = []
            reason.push(this.getReason(u.reason))
            this.ruleForm.reason = reason
            this.ruleForm.sex = this.getSex(u.sex)
            this.ruleForm.signature = u.signature
            this.imageUrl = this.fileBaseUrl + u.userface
            this.username = u.username
            this.email = u.email
          } else {
            // 失败
          }
        })
      },
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass')
            }
            callback()
          }
        }
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
        return {
          menuKey: 'personal',
          username: '',
          email: '',
          ruleForm2: {
            pass: '',
            checkPass: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          },
          fileBaseUrl: 'http://127.0.0.1/static/',
          imageUrl: '',
          fileUrl: '',
          user: '',
          ruleForm: {
            name: '',
            address: '',
            date1: '',
            reason: [],
            sex: '',
            signature: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入用户名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            address: [
              { required: false, message: '请输入通讯地址', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            reason: [
              { type: 'array', required: true, message: '请至少选择一个原因', trigger: 'change' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            signature: [
              { required: true, message: '请填写个性签名', trigger: 'blur' }
            ]
          }
        }
      },
      computed: {
        getUploadApi: function () {
          var path = document.querySelector('#contextPath').value
          return `${path}/upload`
          // return 'http://127.0.0.1:8080/smallyellow/upload'
        }
      },
      methods: {
        goToHome () {
          this.$router.push('/home')
        },
        changeFace () {
          this.$https.post(`/user/changeUser`, querystring.stringify({
            userface: this.fileUrl
          }))
          .then(res => {
            if (res.data.code === 1) {
              this.$message('修改头像成功')
            } else {
              this.$message(res.data.message)
            }
          })
        },
        handleAvatarSuccess (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw)
          this.fileUrl = res.result.filePath
        },
        getSex (type) {
          if (type === '我是小黄') {
            return 2
          } else if (type === '我是绅士') {
            return 1
          } else if (type === 1) {
            return '我是小黄'
          } else if (type === 2) {
            return '我是绅士'
          }
        },
        getReason (reason) {
          if (reason === '崇拜小黄') {
            return 1
          } else if (reason === '崇拜统子') {
            return 2
          } else if (reason === '想了解bjhj') {
            return 3
          } else if (reason === '被小黄无形之中的气质吸引') {
            return 4
          } else if (reason === 1) {
            return '崇拜小黄'
          } else if (reason === 2) {
            return '崇拜统子'
          } else if (reason === 3) {
            return '想了解bjhj'
          } else if (reason === 4) {
            return '被小黄无形之中的气质吸引'
          }
        },
        submitForm (formName) {
          if (this.menuKey === 'account') {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.changePwd()
              } else {
                console.log('error submit!!')
                return false
              }
            })
          } else if (this.menukey === 'personal') {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                // 提交修改
                this.changeUser()
              } else {
                this.$message('error submit!!')
                console.log('error submit!!')
                return false
              }
            })
          }
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        },
        changeUser () {
          this.$https.post(`/user/changeUser`, querystring.stringify({
            name: this.ruleForm.name,
            address: this.ruleForm.address,
            birthday: dateFormat(this.ruleForm.date1.getTime(), 'yyyy-MM-dd'),
            sex: this.getSex(this.ruleForm.sex),
            reason: this.getReason(this.ruleForm.reason),
            signature: this.ruleForm.signature
          }))
          .then(res => {
            if (res.data.code === 1) {
              this.$message('修改个人信息成功')
            } else {
              this.$message(res.data.message)
            }
          })
        },
        handleSelected (key, keyPath) {
          this.menuKey = key
        },
        changePwd () {
          this.$https.post(`/user/changeUserPwd`, querystring.stringify({
            newPwd: this.ruleForm2.pass,
            oldPwd: this.ruleForm2.oldPass
          }))
          .then(res => {
            if (res.data.code === 1) {
              this.$message('修改密码成功')
            } else {
              this.$message(res.data.message)
            }
          })
        }
      }
    }
  </script>
  
  <style lang="scss">
    .mine-font-title-message{
      color: #fff;
      font-size:0.9em;
      margin-left: 10px;
    }
    .mine-font-title{
      font-size:1.1em;
      color: #ffffff;
      cursor: pointer;
    }
    .font-icon{
      color: #ffffff;
      font-size: 1.5em;
      margin-right: 6px;
      font-weight: bold;
    }
    .menu-hiddle{
      display: none;
    }
    .tab{
      display: flex;
      flex-direction: column;
    }
    #tab .el-tabs__header{
      display: flex;
      flex-direction: column;
    }
    .el-menu-item.is-active {
      color: rgb(4, 170, 142);
    }
    .el-menu{
      border: 0px solid #e6e6e6;
    }
    .mine-m3{
      padding: 0px 120px;
      display: flex;
      min-height: 740px;
      height: 100%;
      background-color: #f8f8f8;
    }
    html,body{
      height: 100%;
    }
    .title-bar{
      height: 57px;
      background-color: #009966;
      display: flex;
      padding: 0px 120px;
      justify-content: space-between;
    }
    .font-middle-module{
      font-size:1.0em;
      margin-left:10px;
    }
    .font-big-module{
      font-size:1.5em;
      margin-left:30px;
    }
    .kefu-icon{
      color: rgb(255, 255, 255);
      margin-left: 10px;
    }
    .mine-left{
      width: 10%;
      min-width: 140px;
      /* min-height: 600px; */
      /* height: calc(100% - 70px); */
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      background-color: #fff;
    }
    .mine-right{
      width: 90%;
      height: 100%;
      min-width: 800px;
    }
    .el-form-item{
      max-width: 600px;
    }
    .m-account{
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #fff;
    }
    #account{
      height: 100%;
    }
    .mine-icon{
      width: 20px;
      color: #0f8fe4;
      margin-right: 2px;
      font-size: 1.0em;
      text-align: center;
    }
    .mine-font{
      color: #0f8fe4;
      font-size: 1.0em;
      padding: 20px 20px 20px 20px;
      display: flex;
    }
    .text{
      text-align: center;
    }
    .m2{
      display: flex;
      padding-left: 0px;
      height: 100%;
    }
    #personal{
      height: 100%;
    }
    .personal-left{
      width: 70%;
      padding-right: 60px;
      padding-left: 10px;
      padding-top: 20px;
      height: 100%;
      background-color: #fff;
    }
    .personal-right{
      width: 30%;
      border-left: solid 1px #e6e6e6;
      border-right: solid 1px #e6e6e6;
      align-items: center;
      align-content: center;
      padding-top: 20px;
      height: 100%;
      background-color: #fff;
    }
    .mine-avatar-uploader{
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
    }
    .mine-avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
    }
    .mine-avatar-uploader .el-upload:hover {
      border-color: rgb(37, 128, 28);
    }
    .mine-avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .mine-avatar {
      width: 178px;
      height: 178px;
      display: block;
      margin: 10px;
    }
  </style>
        