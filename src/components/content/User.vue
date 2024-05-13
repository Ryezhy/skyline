<script setup>
import {computed, reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import axios from 'axios'
import {
  Iphone,
  Location,
  OfficeBuilding,
  StarFilled, Tickets
} from '@element-plus/icons-vue'


const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

const isLoading = ref(true)

function getCssVarName(type) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}

const Data = ref({
  name:'error',
  nickname:'error',
  role:'普通用户',
  phone:'1300000000',
  eMail:'null',
  capacity: 0,
  status:'异常',
  spaceSize:1024,
  signature:'',
  curren_capability:1024
})

// 模拟异步数据加载函数
async function fetchData() {
    let user = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    // 在这里，你可以替换为实际的 API 调用或其他数据加载逻辑
    axios.post('http://localhost:8080/getUserInfo', user)
        .then(response => {
          // 检查HTTP状态码
          if (response.status === 200) {
            setTimeout(() => {
              // 登录成功
              console.log('数据加载成功');
              ElMessage.success('数据加载成功');
              // 数据加载成功，显示消息并设置 isLoading 为 false
              isLoading.value = false;
              Data.value.name = response.data.name
              Data.value.role = response.data.role
              Data.value.capacity = response.data.capacity
              Data.value.spaceSize = response.data.spaceSize
              Data.value.phone = response.data.phone
              Data.value.nickname = response.data.nickname
              Data.value.eMail = response.data.email
              Data.value.status  = response.data.status
              Data.value.signature = response.data.signature
              Data.value.curren_capability = response.data.curren_capability
            },1000)
          } else {
            // 其他未知错误
            console.log('发生未知错误，请重试');
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            // 登录失败，账户或密码错误
            notify("登录失败，账户或密码错误");
            console.log('登录失败，账户或密码错误');
            // 数据加载失败，显示错误消息并设置 isLoading 为 false
            ElMessage.error('数据加载失败');
            console.error(error);
            isLoading.value = false;
          } else {
            // 如果请求失败，处理错误
            // 这里通常处理网络错误、超时等异常情况
            notify("登录失败，请求出错");
            console.log('登录失败，请求出错', error);
          }

        });
}

// 在组件加载时开始加载数据
fetchData();

</script>

<template>
  <div class="content" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
    <el-container>
      <el-header class="head" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">个人信息</el-header>
      <el-main v-loading="isLoading" >
        <el-divider content-position="center"></el-divider>
        <el-row class="demo-avatar demo-basic">
          <el-col :span="3" :offset="1">
              <div class="block">
                <el-avatar :size="65" src="./src/img/defaultHead.png" :style="{
    boxShadow: `var(${getCssVarName('light')})`}" />
              </div>
          </el-col>
          <el-col :span="2">
            <el-row>
              <span  v-text="Data.nickname" style="text-align: center;vertical-align: center;line-height: 2;font-size: 18px;" ></span>
            </el-row>
            <el-row>
              <el-tag   type="danger" style="text-align: center;vertical-align: center;line-height: 4;font-size: 18px;" >
                <span v-text="Data.role"></span>
              </el-tag>
            </el-row>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-text size="large">已经使用：</el-text>
          </el-col>
          <el-col :span="6" >
              <el-progress
                :percentage="(Data.curren_capability)*100/Data.capacity"
                :stroke-width="18"
                striped
                striped-flow
              />
          </el-col>
          <el-col :span="7" :offset="15">容量：
            <el-text size="large" v-text="Data.curren_capability"></el-text>MB |
            <el-text size="large" v-text="Data.capacity"></el-text>MB
          </el-col>
        </el-row>
          <el-divider></el-divider>
         <el-row style="margin-top: 20px">
           <el-col :span="24">

             <el-descriptions
                 title="用户个人信息"
                 direction="vertical"
                 :column="4"
                 border
             >
               <el-descriptions-item label="用户昵称" >
                 <el-text v-text="Data.nickname"></el-text>
               </el-descriptions-item>
               <el-descriptions-item label="手机号">
                 <el-text v-text="Data.phone"></el-text>
               </el-descriptions-item>
               <el-descriptions-item label="IP" :span="2">广东</el-descriptions-item>
               <el-descriptions-item label="运载版本">
                 <el-tag size="small">在线版</el-tag>
               </el-descriptions-item>
               <el-descriptions-item label="签名">
                 <el-text v-text="Data.signature"></el-text>
               </el-descriptions-item>
             </el-descriptions>
           </el-col>
         </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.content{
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  margin-top: 0;
  padding: 5px;
  background-color: #FFFFFF;
  min-height: 600px;
}
.head{
  height: 4vh;
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  padding: 5px;
  color: white;
  background-color: #409EFF;
}

</style>