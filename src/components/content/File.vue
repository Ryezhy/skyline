

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
          <el-table-column label=" " width="100">
            <template #default="scope">
            <el-icon ><component :is="getIconName(scope.row.type)"/></el-icon>
            </template>
          </el-table-column>
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
              <el-button alt="打开"  size="small" style="margin-left: 6px">
                <el-icon><FolderOpened /></el-icon>
              </el-button>
                <el-dropdown>
                  <el-button type="primary"  size="small" style="margin-left: 6px;margin-top: 0">
                    <el-icon class="el-icon--center"><edit /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handCopy(scope.row)">
                        <el-icon><DocumentCopy /></el-icon>
                        复制</el-dropdown-item>
                      <el-dropdown-item disabled @click="handCut(scope.row)">
                        <el-icon><Scissor /></el-icon>
                        剪切</el-dropdown-item>
                      <el-dropdown-item @click="handStickup(scope.row)">
                        <el-icon><List /></el-icon>
                        粘贴</el-dropdown-item>
                      <el-dropdown-item @click="handDelete(scope.row)"><el-icon><DeleteFilled />
                      </el-icon>
                        删除</el-dropdown-item>
                      <el-dropdown-item divided>
                        <el-icon><Delete /></el-icon>
                        回收</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

              <el-button alt="分享"  size="small" style="margin-left: 6px"  @click="handleShare(scope.row.name)">
                <el-icon><Share /></el-icon>
              </el-button>
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

  <!--组件!-->
  <!--分享组件!-->
  <ShareDialog  v-model:modelValue="showDialog" v-model:fileName="fileName" ></ShareDialog>

</template>



<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {ElMessage, ElTable} from 'element-plus'
import axios from "axios";
import { ElNotification as notify } from "element-plus/es/components/notification/index";
import {
  ArrowDown,
  Delete, DeleteFilled,
  Document, DocumentCopy,
  Edit, Folder, FolderOpened, Headset, List,
  QuestionFilled, Scissor,
  Search,
  Share,
  Upload,
  VideoCamera
} from '@element-plus/icons-vue'
import ShareDialog from "@/components/content/Files/ShareDialog.vue";
import {i} from "vite/dist/node/types.d-jgA8ss1A";

function getCssVarName(type) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}



interface File {
  id: string
  name: string
  type: string
  date: string
  size: string
}

// 假设你有这些组件，但它们应该是以某种方式导入的 Vue 组件
// 在这里，我们使用字符串来表示预定义的 Element UI 图标名称
const DocumentIcon = Document;
const ArrowDownIcon = ArrowDown;

//根据文件类型获取文件图标
function getIconName(fileType) {
  switch (fileType) {
    case 'Folder':
      return Folder ;
    case 'pdf':
    case 'doc':
    case 'docx':
      // 返回对应于文档类型的图标名称或组件
      return DocumentIcon; // 假设Element UI图标库中有一个名为'document'的图标
    case 'jpg':
    case 'png':
    case 'gif':
      // 返回对应于图片类型的图标名称或组件
      return 'picture'; // 假设Element UI图标库中有一个名为'picture'的图标
    case 'zip':
    case 'rar':
    case '7z':
      // 返回对应于压缩文件类型的图标名称或组件
      return ArrowDownIcon; // 直接返回图标组件
    case 'mp3':
    case 'wav':
      return Headset;
    case 'mp4':
    case 'avi':
      return VideoCamera;
    default:
      // 默认图标或处理未知类型
      return QuestionFilled; // 假设Element UI图标库中有一个名为'default-icon'的图标
  }
}

//网络读取标识，防止未读取数据使用云盘
const isLoading = ref(true)

//多选表格
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<File[]>([])
const toggleSelection = (rows?: File[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: File[]) => {
  multipleSelection.value = val
}

//分享的文件信息
const fileName = ref('');
//处理分享
const handleShare = (name) => {
  fileName.value  = name;
  notify(name)
  showDialog.value = showDialog.value === false;
}

const handDelete = (row) => {
  const index = tableData.value.findIndex(item => item.name === row.name); // 假设每行数据都有一个唯一的 'name' 属性
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除找到的行
    notify('删除成功')
  }
}

const handCopy = (row) => {
  notify('复制成功')

}

const handUpload = (row) => {
  notify('上传成功')
}

const handStickup = (row) => {
  notify('粘贴成功')
}

const handCut = (row) => {
  notify('剪切成功')
}

const showDialog = ref(false)

const tableData = ref<File[] >([] )
tableData.value=[
  {
    id: '0',
    name: '我的媒体音乐',
    type: 'Folder',
    date: '2020-09-01',
    size: '10M',
  },
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
    type: 'mp3',
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