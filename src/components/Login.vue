<template>

  <div class="common-layout">
    <el-container class="content" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
      <el-header  class="head" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
        登录
      </el-header>

      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户" prop="username" >
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="3~8位英文或者数字" :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"  placeholder="8位英文或者数字" :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">提交</el-button>
            <el-button @click="resetForm('ruleForm')" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">重置</el-button>
            <el-text class="mx-1"  type="primary" style="margin-left: 18px">新用户？</el-text>
            <el-button  text  type="danger" @click="$router.push('/register')">点击注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  data() {
    const validateAccountName = (rule, value, callback) => {
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

    const validatePass = (rule, value, callback) => {
      if (!/^[A-Za-z0-9]{8}$/.test(value)) {
        return callback(new Error('密码必须是8位数字或英文字母'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: 'testUser',
        password: '12345678',
      },
      rules: {
        username:[
          {validator:validateAccountName, trigger:'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
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
          this.$router.push('/index')

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
  max-width: 540px;
  margin-left: 300px;
}
.content {
  height: 320px;
  max-width: 540px;

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