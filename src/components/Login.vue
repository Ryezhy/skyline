<template>
  <div class="common-layout">
    <el-container>
      <el-header class="head">Header</el-header>
      <el-container>
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-main class="content">
          <el-container class="content-form" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
            <el-header  class="head-form" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
              登录
            </el-header>
            <el-main>
              <el-form
                  ref="ruleFormRef"
                  style="max-width: 600px"
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  label-width="auto"
                  class="demo-ruleForm"
              >

                <el-form
                    ref="formRef"
                    style="max-width: 600px"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="auto"
                    class="login-ruleForm"
                    status-icon>
                  <el-form-item label="账户"  prop="username"   class="items">
                    <el-input type="text" v-model="ruleForm.username"  :rules="rules.username" autocomplete="off" placeholder="3~8位英文或者数字" :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" style="color: white">
                    <el-input type="password" v-model="ruleForm.password"  :rules="rules.password" autocomplete="off" placeholder="5~8位英文或者数字" :style="{
    boxShadow: `var(${getCssVarName('light')})`}"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox  v-model="rememberMe" label="记住密码并自动登录(不建议)" size="small" style="margin-left: 10px"/>
                    <el-text class="mx-1"  type="primary" style="margin-left: 10px">新用户？</el-text>
                    <el-button  text  type="danger" @click="$router.push('/register')" >点击注册</el-button>
                    <el-button      v-loading.fullscreen.lock="isLoading"  type="primary" @click="submitForm()" :style="{
    boxShadow: `var(${getCssVarName('light')})`}" style="margin-left: 10px">登录</el-button>

                    <el-button @click="resetForm" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">重置</el-button>

                  </el-form-item>
                </el-form>
              </el-form>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>


  </div>

</template>
<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElForm, ElNotification as notify, FormInstance} from 'element-plus';
import {useRouter} from 'vue-router';
import axios from "axios";

const router = useRouter();

//登录动画
const isLoading = ref(false);

// 定义表单数据
const ruleForm = reactive({
  username: '',
  password: '',
});

// 定义表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能是英文或者数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 8, message: '长度为 5 到 8 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '密码只能是英文或者数字', trigger: 'blur' }
  ]
};

// 创建对表单实例的引用
const formRef = ref<FormInstance | null>(null);

//记住密码
const rememberMe = ref(false);

// 表单提交方法
const submitForm = async () => {
  if (formRef.value) {
    try {
      await formRef.value.validate(async (valid) => {
        if (rememberMe.value){
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', ruleForm.username);
          localStorage.setItem('password', ruleForm.password);
        }
        else {
          // 如果 rememberMe 为 false，则清除保存的登录信息
          localStorage.removeItem('rememberMe');
         // localStorage.removeItem('username');
        //  localStorage.removeItem('password');
        }
        if (valid) {
          // 表单验证通过，执行提交逻辑
          let user = {
            username: ruleForm.username,
            password: ruleForm.password
          };
          isLoading.value = true;
          axios.post('http://localhost:8080/login', user)
              .then(response => {
                isLoading.value = false;
                // 检查HTTP状态码
                if (response.status === 200) {
                  // 登录成功

                  console.log('登录成功');
                  notify("登录成功");
                  router.push('/index/home');
                } else {
                  // 其他未知错误
                  notify("发生未知错误，请重试");
                  console.log('发生未知错误，请重试');
                }
              })
              .catch(error => {
                isLoading.value = false;
                if (error.response) {
                  // 请求已发出，服务器也响应了状态码，但不是2xx
                  if(error.response.status === 401){
                    // 登录失败，账户或密码错误
                    notify("登录失败，账户或密码错误");
                    console.log('登录失败，账户或密码错误');
                  } else {
                    // 其他状态码错误，比如404, 500等
                    notify("服务器返回错误状态码：" + error.response.status);
                    console.log('服务器返回错误状态码：', error.response.status);
                  }
                } else if (error.request) {
                  // 请求已发出，但没有收到任何响应
                  // 这通常是因为请求超时或网络问题
                  notify("服务器响应超时或网络错误");
                  console.log('请求已发出，但没有收到响应', error.request);
                } else {
                  // 在设置请求时触发了一个错误
                  // 比如请求的配置不正确（比如无效的URL）
                  notify("请求配置错误");
                  console.log('请求配置错误', error.message);
                }
              });

        } else {
          // 表单验证失败，提示用户
          notify("格式错误")
        }
      });
    } catch (error) {
      console.error('表单验证出错:', error);
    }
  } else {
    console.error('表单实例不存在');
  }
};

// 表单重置方法
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

// 暴露给模板的响应式数据和方法
const exposed = {
  ...toRefs(ruleForm),
  formRef,
  submitForm,
  resetForm
};

const getCssVarName = (type) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`;
};

onMounted(()=>{
  if (localStorage.getItem('username')&&localStorage.getItem('password')&&localStorage.getItem('rememberMe')) {
  ruleForm.username = localStorage.getItem('username');
  ruleForm.password = localStorage.getItem('password');
  submitForm()
  }
  else if (localStorage.getItem('username')&&localStorage.getItem('password')) {
    ruleForm.username = localStorage.getItem('username');
    ruleForm.password = localStorage.getItem('password');
  }
})
</script>


<style scoped>
.common-layout{
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  padding: 0;
  margin: 0;
  background-image: url("../../src/img/login.jpg");
  background-size: 100%;
}
.head{
  height: 10%;
  min-height: 200px;
  width: 100%;
  text-align: center;
}
.aside{
  height: 30%;
  width: 30%;
}
.content{
  margin-left: 35%;
  margin-right: 3%;
  height: 30%;
  width: 35%;
  padding: 10px;
}
.content-form{
  width: 100%;
  min-width: 360px;
  height: 70%;
  min-height: 250px;
  border-radius: 3px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}

.login-ruleForm{
  height: 30%;
  width: 100%;
  border-radius: 3px;
  color: white;

}
.head-form{
  font-size: 15px;
  height: 15%;
  width: 100%;
  color: white;
  background-color: #409EFF;
  text-align: center;
  line-height: 3;
  border-radius: 3px;
}
:deep(.el-form-item label) {
  color: white;
  font-size: 16px;
}

</style>