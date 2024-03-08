<script setup lang="ts">
import { ref } from "vue";

function getCssVarName(type) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}

import {ElMessage, ElTable} from 'element-plus'
import axios from "axios";
import {ArrowDown, Delete, Edit, Search, Share, Upload} from '@element-plus/icons-vue'

interface File {
  id: string
  name: string
  type: string
  date: string
  size: string
}

const isLoading = ref(true)

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<File[]>([])
const toggleSelection = (rows?: File[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: File[]) => {
  multipleSelection.value = val
}

const handDelete = (row) => {
  const index = tableData.value.findIndex(item => item.name === row.name); // 假设每行数据都有一个唯一的 'name' 属性
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除找到的行
  }
}



 const tableData = ref<File[] >([] )
     tableData.value=[
  {
    id: '1',
    name: '黑马英语',
    type: 'pdf',
    date: '2020-09-01',
    size: '10M',
  },
  {
    id: '2',
    name: '英语听力',
    type: 'pdf',
    date: '2020-09-01',
    size: '10M',
  },
]

async function fetchData() {
  try {
    // 模拟数据加载过程
    await new Promise(resolve => setTimeout(resolve, 500));

    // 在这里，你可以替换为实际的 API 调用或其他数据加载逻辑
    const response = await axios.get('https://mock.getapi.run/mock/a09e3-1709345684677-4b2c-b05baad2//get/data');
    // 数据加载成功，显示消息并设置 isLoading 为 false
    ElMessage.success('数据加载成功');
    isLoading.value = false;
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
    boxShadow: `var(${getCssVarName('light')})`}">文件</el-header>
      <el-main  v-loading="isLoading">
        <!--内容!-->
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label=" " width="100"/>
          <el-table-column label="文件名" width="200">
            <template #default="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column property="type" label="类型" width="200">
            <template #default="scope">{{ scope.row.type }}</template>
          </el-table-column>
          <el-table-column property="date" label="日期" width="250">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="size" label="大小" width="250" show-overflow-tooltip>
            <template #default="scope">{{ scope.row.size }}</template>
          </el-table-column>
          <el-table-column  >
            <template #default="scope">
                <el-dropdown>
                  <el-button type="primary">
                    <el-icon class="el-icon--center" :size="'small'"><edit /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>复制</el-dropdown-item>
                      <el-dropdown-item disabled>剪切</el-dropdown-item>
                      <el-dropdown-item>粘贴</el-dropdown-item>
                      <el-dropdown-item @click="handDelete(scope.row)">删除</el-dropdown-item>
                      <el-dropdown-item divided>回收</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[0], tableData[1]])"
          >选择1和2</el-button
          >
          <el-button @click="toggleSelection()">全部取消</el-button>
        </div>
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

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>