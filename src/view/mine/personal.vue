<template>
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
          class="avatar-uploader"
          :action="getUploadApi"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="flex-center margin-top-ten">
          <el-button type="warning" size="small" round @click="changeFace">保存头像</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import querystring from 'querystring'
    import {dateFormat} from '../../assets/js/data.js'
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
          } else {
            // 失败
          }
        })
      },
      data () {
        return {
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
        }
      }
    }
  </script>
  
  <style lang="scss">
    .m2{
      display: flex;
      padding-left: 0px;
      height: 100%;
    }
    .personal-left{
      width: 65%;
      padding-right: 60px;
      padding-left: 10px;
      padding-top: 20px;
      height: 100%;
    }
    .personal-right{
      width: 35%;
      border-left: solid 1px #e6e6e6;
      align-items: center;
      align-content: center;
      padding-top: 20px;
    }
    .avatar-uploader{
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      margin: 10px;
    }
  </style>
        