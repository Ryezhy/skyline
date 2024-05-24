
<template >
  <div class="content" :style="{
    boxShadow: `var(${getCssVarName('light')})`}" >
    <el-container >
      <el-header class="head" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">文件</el-header>
      <el-row style="margin-left: 4px">
        <el-col :span="2" :offset="0">
          <el-button size="small" style="margin-top: -10px" @click="handleRouterBack" >返回上一级</el-button>
        </el-col>
        <!--文件路径!-->
        <el-col :span="10">
          <el-breadcrumb   separator="">
            <el-breadcrumb-item
                v-for="(item, index) in formattedBreadcrumbItems"
                :key="index"
                :class="{ 'last-breadcrumb-item': index === formattedBreadcrumbItems.length - 1 }"
                @click="handleRouterClick(item, index)"
                style="margin-left: -11px"
            >
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="5" :offset="7" style="">
          <el-tag  style="margin-top: -10px">查找:</el-tag>
          <el-input label="查找" style=" margin-top: -10px;margin-left:10px;width: 200px;"></el-input>
        </el-col>
      </el-row>
      <el-main  v-loading="isLoading" >
        <!--内容!-->
            <!--当前路径的所有文件！-->
            <el-table
                ref="multipleTableRef"
                :data="paginatedData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label=" " width="100">
                <template #default="scope">
                  <el-icon ><component :is="getIconName(scope.row.file_type)"/></el-icon>
                </template>
              </el-table-column>
              <el-table-column label="文件名" width="200">
                <template #default="scope">{{ FileName(scope.row.file_name, scope.row.file_type)}}</template>
              </el-table-column>
              <el-table-column property="type" label="类型" width="200">
                <template #default="scope">{{ typeName(scope.row.file_type) }}</template>
              </el-table-column>
              <el-table-column property="date" label="日期" width="250">
                <template #default="scope">{{ scope.row.upload_time}}</template>
              </el-table-column>
              <el-table-column property="size" label="大小" width="250" show-overflow-tooltip>
                <template #default="scope">{{formatSize(scope.row.file_size) }}</template>
              </el-table-column>
              <el-table-column   label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作">
                <template #default="scope">
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="打开"
                      placement="bottom"
                  >
                    <el-button  size="small" style="margin-left: 6px" @click="openFile(scope.row)">
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
                    <el-button alt="分享"  size="small" style="margin-left: 6px"  @click="handleShare(scope.row.file_name,scope.row.file_type)">
                      <el-icon><Share /></el-icon>
                    </el-button>

                  </el-tooltip>
                  <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="下载"
                      placement="bottom"
                  >
                    <el-button  size="small" style="margin-left: 6px"  @click="handleDownload(scope.row, 0)">
                      <el-icon><Download /></el-icon>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
        <!--分页组件!-->
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
          <el-button @click="toggleSelection(tableData)"
          >全部选择</el-button
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
import {computed, ref} from "vue";
import {ElMessage, ElTable} from 'element-plus'
import axios, {Canceler,AxiosResponse} from "axios";
import {ElNotification as notify} from "element-plus/es/components/notification/index";
import ShareDialog from "@/components/content/Files/ShareDialog.vue";
import {
  Delete,
  DeleteFilled,
  Document,
  DocumentCopy,
  Download,
  Edit,
  Folder,
  FolderOpened,
  Headset,
  List,
  Picture,
  QuestionFilled,
  Scissor,
  Share,
  VideoCamera,
  Wallet
} from '@element-plus/icons-vue'
import {useStore} from 'vuex';
let index = 0;
let select = ref(0)
let options = ref([ // 定义选项列表
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' }
])
//资源定义
type  File= {
  file_UUid: string;
  file_name: string;
  file_type: string;
  upload_time: string;
  file_path: string;
  file_size: string;
}
function getCssVarName(type: any) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}
//----------------------------------------------- 以下显示映射逻辑---------------------------------------------//
function getIconName(fileType: any) {//根据文件类型获取文件图标
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
      return  Document; // 假设Element UI图标库中有一个名为'document'的图标
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
const FileName = (name:string,type:string)=>{ //区分文件名的显示，文件夹为文件名，其他为文件名.类型
  if(type==='Folder'||type===''){
    return name
  }
  else {
    return name+'.'+type;
  }
}

const typeName = (type:string) => { //定义文件类型映射
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

const formatSize = (size:number) => {//处理文件大小显示
  if(size>1024*1024*1024){
    return (size/(1024*1024*1024)).toFixed(2)+"GB";
  }
  else if (size > (1024 * 1024)) {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  }
  else if (size > 1024) {
    return (size / 1024).toFixed(2) + "KB";
  }
  else {
    return size + "B";
  }
}

//--------------------列表操作逻辑--------------------------
const showDialog = ref(false) //显示分享文件对话框
const tableData = ref<File[] >([] ) //定义文件列表数据
tableData.value=[  //根目录初始化
  {
      file_UUid: '',
      file_name: '',
      file_type: '',
      upload_time: '',
      file_path: '',
      file_size: ''
  }
]

const isLoading = ref(true)//网络读取标识，防止未读取数据使用云盘
const multipleTableRef = ref<InstanceType<typeof ElTable>>() // 表格实例
const multipleSelection = ref<File[]>([]) // 选中的行
const toggleSelection = (rows?: File[]) => {  // 选中行
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      multipleTableRef.value!.toggleRowSelection(row, Boolean)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: File[]) => { // 选中行
  multipleSelection.value = val
}
const fileRouter = ref<string[]>([]);//路径路由数组
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示的条目数
const paginatedData = computed(() => { // 计算分页后的数据
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});//将数据分页

const handleSizeChange = (val: number) => {//页长度更改
  pageSize.value = val;
  currentPage.value = 1; // 当每页条目数变化时，通常回到第一页
};

//分页
const handleCurrentChange = (val: number) => { //页码更改
  currentPage.value = val;
};
const handleRouterBack = () => {  //路径后退事件
  if(fileRouter.value.length>1) {
    fileRouter.value.pop();
    emit("changeRouter",fileRouter.value)
  }
  const routerArray = fileRouter.value;
  let path =  routerArray.join('');    // 使用join方法将数组元素用''连接起来

  if(fileRouter.value.length==1){
    path = '/admin'
    notify("主目录")
  }
  let user = {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password')
  };
  let file = {
    file_UUid: '',
    file_name: '',
    file_type: '',
    upload_time: '',
    file_path: path,
    file_size: ''
  };
  // 在这里，你可以替换为实际的 API 调用或其他数据加载逻辑
  axios.post('http://localhost:8080/files', {user,file})
      .then(response => {
        isLoading.value = false;
        // 检查HTTP状态码
        if (response.status === 200) {
          tableData.value = response.data;
        } else {
          // 其他未知错误
          notify("发生未知错误，请重试");
          console.log('发生未知错误，请重试');
        }
      })
      .catch(error => {
        isLoading.value = false;
        // 请求已发出，服务器也响应了状态码，但不是2xx
        // 其他状态码错误，比如404, 500等
        notify("服务器返回错误状态码：" + error.response.status);
        console.log('服务器返回错误状态码：', error.response.status);
      });

}
   //----------------------------以下是对列表文件的操作逻辑-------------------------------------------------//
  const openFile = (item:File) => {//打开逻辑
    if(item.file_type==='Folder'){
    // notify('打开文件')
      fetchDataFromServer(item)
    }
    else {
      //这里缺少了对普通文件的处理
    }

  }
  const handDelete = (row:File) => { //删除文件
    const index = tableData.value.findIndex(item => item.file_name=== row.file_name); // 假设每行数据都有一个唯一的 'name' 属性
    if (index !== -1) {
      tableData.value.splice(index, 1); // 删除找到的行
      notify('删除成功')
      //注意这里还缺少删除逻辑
    }
  }

  const handCopy = (row:File) => {
    notify('复制成功')
  }

  const handUpload = (row:File) => {
      notify('上传成功')
  }

  const handStickup = (row:File) => {
    notify('粘贴成功')
  }

  const handCut = (row:File) => {
    notify('剪切成功')
  }
//分享的文件信息
const fileName = ref('');
//处理分享
const handleShare = (name: string, type: string) => {
  if(type==='Folder'){
    fileName.value  = name+"(文件夹)"
  }
  else {
    fileName.value  = name+'.'+type;

  }
  showDialog.value = showDialog.value === false;
}

let param = {
  file: null as File | null,
  start:0,
  length:0,
  state:0,
}

// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['clickDownload','changeRouter'])
const handleDownload = async (row:File,state:number) => {
  //传递param到父组件
  param.file = row
  param.length = Number(row.file_size)
  param.state = state
  emit('clickDownload', param)
}

const formattedBreadcrumbItems = computed(() => {// 计算属性来格式化路径数组
  const items = [...fileRouter.value]; // 创建数组的一个副本
  if (items.length > 3) {
    // 如果路径段数超过三段，只保留前三段，并添加省略号
    const lastThreeItems = items.slice(-3); // 获取最后三段
    return ['...'].concat(lastThreeItems); // 在前面添加省略号
  }
  return items;
});
const handleRouterClick= (item: any, index: any) => { //路径点击事件
}

//----------------------以下为aiox获取数据-----------------------------------------------------------------//
async function fetchData() { //获取根目录
  try {
    // 模拟数据加载过程
    await new Promise(resolve => setTimeout(resolve, 500));
    fileRouter.value= []
    const username = '/'+localStorage.getItem('username');
    fileRouter.value.push(username);
    emit("changeRouter",fileRouter.value)
    // 在这里，你可以替换为实际的 API 调用或其他数据加载逻辑
    const response = await axios.get('http://localhost:8080/files/root');
    tableData.value = response.data;
    // 数据加载成功，显示消息并设置 isLoading 为 false
    ElMessage.success('根目录数据加载成功');
    isLoading.value = false;
  } catch (error) {
    // 数据加载失败，显示错误消息并设置 isLoading 为 false
    ElMessage.error('数据加载失败');
    console.error(error);
    isLoading.value = false;
  }
}

async function fetchDataFromServer(fileItem:File) { //获取子目录
  try {
    // 模拟数据加载过程
    await new Promise(resolve => setTimeout(resolve, 500));
    fileRouter.value.push("/"+fileItem.file_name)
    emit("changeRouter",fileRouter.value)
    let user = { //获取存储的用户信息
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    let file = { //这里接收的对象名字不能修改，约束了对象的名字
      file_UUid: '',
      file_name: '',
      file_type: '',
      upload_time: '',
      file_path: fileItem.file_path+"/"+fileItem.file_name,
      file_size: ''
    };
    axios.post('http://localhost:8080/files', {user,file})
        .then(response => {
          isLoading.value = false;
          // 检查HTTP状态码
          if (response.status === 200) {
            // 登录成功
            tableData.value = response.data;
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
              notify("验证失败，账户或密码错误");
              console.log('验证败，账户或密码错误');
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

    // 数据加载成功，显示消息并设置 isLoading 为 false
    ElMessage.success('文件数据加载成功');
    isLoading.value = false;
  } catch (error) {
    // 数据加载失败，显示错误消息并设置 isLoading 为 false
    ElMessage.error('数据加载失败');
    console.error(error);
    isLoading.value = false;
  }
}


const store = useStore();
store.commit('setParentId', 0);
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
  min-height: 730px;
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

.last-breadcrumb-item {
  font-family: bold,sans-serif;
  font-size: 14px;

}

</style>