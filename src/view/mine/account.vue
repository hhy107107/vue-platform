<template>
    <div class="m4">
      <div class="font">
        <div>
          <i class="iconfont el-icon-hhy-zhanghao icon"></i>
          <span class="text">账号：</span><span class="text">{{username}}</span>
        </div>
        <div class="margin-left-twenty">
          <i class="iconfont el-icon-hhy-youxiang icon"></i>
          <span class="text">邮箱：</span><span class="text">{{email}}</span>
        </div>
      </div>
      <div class="line-horizontal"></div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="bg demo-ruleForm padding-top-twenty">
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
  </template>
  
  <script>
    import querystring from 'querystring'
    export default {
      created () {
        this.$https.get(`/initData`)
        .then(res => {
          if (res.data.code === 1) {
            // 成功
            var u = res.data.result
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
          }
        }
      },
      methods: {
        submitForm (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.changePwd()
            } else {
              console.log('error submit!!')
              return false
            }
          })
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
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
  .el-form-item{
    max-width: 600px;
  }
  .m4{
    display: flex;
    flex-direction: column;
  }
  .icon{
    width: 20px;
    height: 40px;
    color: #0f8fe4;
    font-size: 1.0em;
    text-align: center;
  }
  .font{
    color: #0f8fe4;
    font-size: 1.0em;
    padding: 20px 20px 0px 20px;
    display: flex;
  }
  .text{
    text-align: center;
  }
</style>
        