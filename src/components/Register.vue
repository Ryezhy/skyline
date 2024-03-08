<template>

  <div class="common-layout">
    <el-container class="content" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
      <el-header  class="head" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
          注册
      </el-header>

      <el-main >
        <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户" prop="username" >
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="3~8位英文或者数字"  :style="{
    boxShadow: `var(${getCssVarName('light')})`}" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="8位英文或者数字"  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="8位英文或者数字"  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" >
            <el-input v-model.number="ruleForm.age" placeholder="仅供年龄大于12周岁使用"  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="ruleForm.phone" placeholder="11位数字"  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">注册</el-button>
            <el-button @click="resetForm('ruleForm')" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">重置</el-button>
            <el-button @click="$router.push('/login')" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">返回</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  data() {


    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 16||value>120) {
            callback(new Error('年龄异常'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    var validateAccountName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账户名不能为空'));
      }

      // 使用正则表达式检查账户名是否只包含8位数字或英文字母
      if (!/^[A-Za-z0-9]{3,8}$/.test(value)) {
        return callback(new Error('账户名必须是3~8位数字或英文字母'));
      }
      // 如果验证通过，则调用回调函数
      callback();
    };

    var validatePass = (rule, value, callback) => {
      if (!/^[A-Za-z0-9]{8}$/.test(value)) {
        return callback(new Error('密码必须是8位数字或英文字母'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }

      // 使用正则表达式检查账户名是否只包含8位数字或英文字母
      if (!/^[z0-9]{11}$/.test(value)) {
        return callback(new Error('手机号必须是11位数字'));
      }
      // 如果验证通过，则调用回调函数
      callback();
    };

    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        age: '',
        phone: ''
      },
      rules: {
        username:[
          {validator:validateAccountName, trigger:'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        phone:[
          {validator: validatePhone, trigger:'blur'}
        ]
      },

      shadow :
          {
            name: 'Light Shadow',
            type: 'light',}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功');
          console.log('提交成功');
          console.log(this.ruleForm)
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getCssVarName(type) {
      return `--el-box-shadow${type ? '-' : ''}${type}`
      }
    }
}
</script>
<style scoped>
.common-layout{
  width: 30vw;
  max-width: 520px;
  margin-left: 300px;
  height: 100%;
}
.content {
  height: 45vh;
  max-width: 520px;

  width: 40vw;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  margin-top: 20px;
  padding: 5px;
  background-color: #f8f8f8;

}

.demo-ruleForm {

  height: 180px;
  align-items: center;
  width: 70vw;
  max-width: 420px;
  border: 0 solid var(--el-border-color);
  margin-top: 20px;
  margin-right: 40px;
  border-radius: 8px;
  padding: 5px;
  background-color: #f8f8f8;
}

.head{
  font-size: larger;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  color: #f2f2f2;
  height: 38px;
  width: 100%;
  background-color: #409EFF;
  border: 3px solid #f2f2f2;
  border-radius: 6px;
  padding: 3px;
}

</style>