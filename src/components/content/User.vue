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
  name:'null',
  nickname:'null',
  tag:'null',
  phone:'null',
  capacity: 0,
  spaceSize:1024,
})

// 模拟异步数据加载函数
async function fetchData() {
  try {
    // 模拟数据加载过程
    await new Promise(resolve => setTimeout(resolve, 500));

    // 在这里，你可以替换为实际的 API 调用或其他数据加载逻辑
    const response = await axios.get('https://mock.getapi.run/mock/a09e3-1709345684677-4b2c-b05baad2//get/data');
    // 数据加载成功，显示消息并设置 isLoading 为 false
    ElMessage.success('数据加载成功');
    isLoading.value = false;
    Data.value.name = response.data.name
    Data.value.tag = response.data.tag
    Data.value.capacity = response.data.capacity
    Data.value.spaceSize = response.data.spaceSize
    Data.value.phone = response.data.phone
    Data.value.nickname = response.data.nickname
  } catch (error) {
    // 数据加载失败，显示错误消息并设置 isLoading 为 false
    ElMessage.error('数据加载失败');
    console.error(error);
    isLoading.value = false;
  }
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
              <span  v-text="Data.name" style="text-align: center;vertical-align: center;line-height: 2;font-size: 18px;" ></span>
            </el-row>
            <el-row>
              <el-tag   type="danger" style="text-align: center;vertical-align: center;line-height: 4;font-size: 18px;" >
                <span v-text="Data.tag"></span>
              </el-tag>
            </el-row>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-text size="large">已经使用：</el-text>
          </el-col>
          <el-col :span="6" >
              <el-progress
                :percentage="(Data.spaceSize-Data.capacity)*100/ Data.spaceSize"
                :stroke-width="18"
                striped
                striped-flow
              />
          </el-col>
          <el-col :span="7" :offset="15">容量：
            <el-text size="large" v-text="Data.capacity"></el-text>MB |
            <el-text size="large" v-text="Data.spaceSize"></el-text>MB
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
                 考研、考公、专升本等资料加v@vsjdf
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