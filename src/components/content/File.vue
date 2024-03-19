

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
                :data="paginatedData"
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
                <template #default="scope">{{ FileName(scope.row.name, scope.row.type)}}</template>
              </el-table-column>
              <el-table-column property="type" label="类型" width="200">
                <template #default="scope">{{ typeName(scope.row.type) }}</template>
              </el-table-column>
              <el-table-column property="date" label="日期" width="250">
                <template #default="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column property="size" label="大小" width="250" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.size }}</template>
              </el-table-column>
              <el-table-column   label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作">
                <template #default="scope">
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="打开"
                      placement="bottom"
                  >
                    <el-button  size="small" style="margin-left: 6px">
                      <el-icon><FolderOpened /></el-icon>
                    </el-button>
                  </el-tooltip>

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
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="分享"
                      placement="bottom"
                  >
                    <el-button alt="分享"  size="small" style="margin-left: 6px"  @click="handleShare(scope.row.name,scope.row.type)">
                      <el-icon><Share /></el-icon>
                    </el-button>

                  </el-tooltip>
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="下载"
                      placement="bottom"
                  >
                    <el-button  size="small" style="margin-left: 6px">
                      <el-icon><Download /></el-icon>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10,15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
              style="margin-top: 8px"
          />
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
  Document, DocumentCopy, Download,
  Edit, Folder, FolderOpened, Headset, List, Picture,
  QuestionFilled, Scissor,
  Search,
  Share,
  Upload,
  VideoCamera, Wallet
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
    case 'xls':
    case 'txt':
    case 'xml':
    case 'ppt':
    case 'xlsx':
    case 'pptx':
      // 返回对应于文档类型的图标名称或组件
      return DocumentIcon; // 假设Element UI图标库中有一个名为'document'的图标
    case 'jpg':
    case 'png':
    case 'gif':
      // 返回对应于图片类型的图标名称或组件
      return Picture; // 假设Element UI图标库中有一个名为'picture'的图标
    case 'zip':
    case 'rar':
    case '7z':
      // 返回对应于压缩文件类型的图标名称或组件
      return Wallet;
    case 'mp3':
    case 'flac':
    case 'wav':
    case 'ogg':
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
const handleShare = (name,type) => {
  if(type==='Folder'){
    fileName.value  = name+"(文件夹)"
  }
  else {
    fileName.value  = name+'.'+type;

  }
  showDialog.value = showDialog.value === false;
}

const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示的条目数
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});//将数据分页

//页长度更改
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 当每页条目数变化时，通常回到第一页
};

//分页
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

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

const FileName = (name,type)=>{
  if(type==='Folder'||type===''){
    return name
  }
  else {
    return name+'.'+type;
  }
}

const typeName = (type) => {
  if(type==='Folder'){
    return '文件夹'
  }
  else {
    switch (type)
    {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'xls':
      case 'txt':
      case 'xml':
      case 'ppt':
      case 'xlsx':
      case 'pptx':
          return '文档'
      case 'jpg':
      case 'png':
      case 'gif':
        return '图片'
      case 'zip':
      case 'rar':
      case '7z':
        return '压缩文件'
      case 'mp3':
      case 'wav':
        return '音频'
      case 'mp4':
      case 'avi':
        return '视频'
      case '':
        return '文件'
      default:
        return type
    }
  }

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
    const response = await axios.get('http://127.0.0.1:8080/files');
    tableData.value = response.data;
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