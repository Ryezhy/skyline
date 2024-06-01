<template>

  <div class="common-layout content">
    <el-container>
      <el-header class="head">
        <el-menu
            :default-active="activeIndex"
            :ellipsis="false"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="0">
            <el-icon>
              <MostlyCloudy/>
            </el-icon>
            Skyline
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="1" @click="downloadDrawer = true">下载列表</el-menu-item>
          <el-menu-item index="2" @click="uploadDrawer = true">上传列表</el-menu-item>
          <el-menu-item index="3">回收站</el-menu-item>

        </el-menu>
      </el-header>


      <!--内容!-->
      <el-main>

        <el-row>
          <el-col :span="3">
            <div class="grid-content ep-bg-purple-dark"/>
            <!--侧边栏！-->
            <el-aside width="180px">
              <el-radio-group v-model="isCollapse" style="margin-bottom: 25px">
                <el-radio-button :label="false" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">展开
                </el-radio-button>
                <el-radio-button :label="true" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">收起
                </el-radio-button>
              </el-radio-group>
              <el-menu
                  :collapse="isCollapse"
                  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"
                  class="el-menu-vertical-demo"
                  default-active="2"
                  @close="handleClose"
                  @open="handleOpen"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon :size="22" @click="$router.push('../index/home')">
                      <HomeFilled/>
                    </el-icon>
                    <span @click="$router.push('../index/home')">首页</span>
                  </template>
                  <el-sub-menu index="1-1">
                    <template #title>
                      <el-icon @click="$router.push('../index/file')">
                        <Files/>
                      </el-icon>
                      <span @click="$router.push('../index/file')">我的文件</span>
                    </template>
                    <el-menu-item index="1-1-1">
                      <el-icon>
                        <VideoCamera/>
                      </el-icon>
                      视频
                    </el-menu-item>
                    <el-menu-item index="1-1-2">
                      <el-icon>
                        <Picture/>
                      </el-icon>
                      图片
                    </el-menu-item>
                    <el-menu-item index="1-1-3">
                      <el-icon>
                        <Headset/>
                      </el-icon>
                      音频
                    </el-menu-item>
                    <el-menu-item index="1-1-4">
                      <el-icon>
                        <Document/>
                      </el-icon>
                      文档
                    </el-menu-item>
                    <el-menu-item index="1-1-5">
                      <el-icon>
                        <MoreFilled/>
                      </el-icon>
                      其他
                    </el-menu-item>

                  </el-sub-menu>
                  <el-sub-menu index="1-2">
                    <template #title>
                      <el-icon>
                        <Delete/>
                      </el-icon>
                      <span>回收站</span>
                    </template>
                    <el-menu-item index="1-2-1">
                      <el-icon>
                        <Close/>
                      </el-icon>
                      清空
                    </el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="1-3">
                    <template #title>
                      <el-icon>
                        <Star/>
                      </el-icon>
                      <span>快捷方式</span>
                    </template>
                    <el-menu-item index="1-3-1">
                      <el-icon>
                        <Star/>
                      </el-icon>
                      购买会员
                    </el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>

                <el-sub-menu index="2">
                  <template #title>
                    <el-icon :size="22" @click="$router.push('../index/file')">
                      <Files/>
                    </el-icon>
                    <span @click="$router.push('../index/file')">文件</span>
                  </template>
                  <el-menu-item index="2-1">
                    <el-icon>
                      <VideoCamera/>
                    </el-icon>
                    视频
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <el-icon>
                      <Picture/>
                    </el-icon>
                    图片
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <el-icon>
                      <Headset/>
                    </el-icon>
                    音频
                  </el-menu-item>
                  <el-menu-item index="2-4">
                    <el-icon>
                      <Document/>
                    </el-icon>
                    文档
                  </el-menu-item>
                  <el-menu-item index="2-5">
                    <el-icon>
                      <MoreFilled/>
                    </el-icon>
                    其他
                  </el-menu-item>

                </el-sub-menu>
                <el-menu-item index="3" @click="$router.push('../index/application')">
                  <el-icon :size="22">
                    <icon-menu/>
                  </el-icon>
                  <template #title>应用</template>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon :size="22" @click="$router.push('../index/setting')">
                    <setting/>
                  </el-icon>
                  <template #title><span @click="$router.push('../index/setting')"> 设置</span></template>
                </el-menu-item>
                <el-menu-item index="5" @click="$router.push('../index/user')">
                  <el-icon :size="22" @click="$router.push('../index/user')">
                    <user/>
                  </el-icon>
                  <template #title><span @click="$router.push('../index/user')">个人</span></template>
                </el-menu-item>
                <el-menu-item index="6">
                  <el-icon :size="22" @click="$router.push('../index/about')">
                    <paperclip/>
                  </el-icon>
                  <template #title>
                    <span @click="$router.push('../index/about')">关于</span></template>
                </el-menu-item>
                <el-menu-item index="7" @click="exit ">
                  <el-icon :size="22">
                    <SwitchButton/>
                  </el-icon>
                  <template #title>退出</template>
                </el-menu-item>
              </el-menu>
            </el-aside>
          </el-col>

          <!--内容-->
          <el-col :span="20">
            <div class="grid-content ep-bg-purple-dark"/>
            <RouterView @changeRouter="changeRouter" @clickDownload="handleDownload"></RouterView>
          </el-col>

        </el-row>
        <el-row style="margin-top: 6px">
          <el-col :offset="20" :span="4">
            <el-button @click="notiyDrawer=true">消息中心</el-button>
          </el-col>
        </el-row>
        <!--消息列表!-->
        <el-drawer
            v-model="notiyDrawer"
            title="I am the title"
        >
        </el-drawer>
      </el-main>

      <!--下载列表!-->
      <el-drawer
          v-model="downloadDrawer"
          title="下载列表"
      >
        <el-row v-for="(item,index) in fileList" class="file-row">
          <el-col :span=10>
            <el-text>
              文件名：{{ item.value.file.file_name + '.' + item.value.file.file_type }}
            </el-text>
          </el-col>
          <el-col :span=7>
            <el-text>
              大小：{{ formatSize(item.value.file.file_size) }}
            </el-text>
          </el-col>
          <el-col :span=7>
            <el-text>
              速度：{{ formatSpeed(item.value.speed) }}
            </el-text>
          </el-col>
          <el-col :span=12 style="margin-top: 2px">
            <el-progress :percentage=item.value.progress
                         :stroke-width="20"
                         :text-inside="true"
                         striped
                         striped-flow/>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="item.value.isPauseDownload" size="small" type="warning" @click="pauseDownload(index)">
              暂停
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="!item.value.isPauseDownload" size="small" type="primary"
                       @click="resumeDownload(index)">继续
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="danger" @click="cancelDownload(index)">取消</el-button>
          </el-col>
        </el-row>
      </el-drawer>

      <!--上传列表!-->
      <el-drawer
          v-model="uploadDrawer"
          :title= "formatRouter()"
      >
        <el-row v-for="(item,index) in fileList" class="file-row">
          <el-col :span=12>
            <el-text>
              文件名：{{ item.value.file.file_name + '.' + item.value.file.file_type }}
            </el-text>
          </el-col>
          <el-col :span="12">
            <el-text size="default" style="color: red">
              上传路径：/test/test
            </el-text>
          </el-col>
          <el-col :span=12>
            <el-text>
              大小：{{ formatSize(item.value.file.file_size) }}
            </el-text>
          </el-col>
          <el-col :span=12>
            <el-text>
              速度：{{ formatSpeed(item.value.speed) }}
            </el-text>
          </el-col>

          <el-col :span=12 style="margin-top: 2px">
            <el-progress :percentage=item.value.progress
                         :stroke-width="20"
                         :text-inside="true"
                         striped
                         striped-flow/>
          </el-col>

          <el-col :span="4">
            <el-button :disabled="item.value.isPauseDownload" size="small" type="warning" @click="pauseDownload(index)">
              暂停
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="!item.value.isPauseDownload" size="small" type="primary"
                       @click="resumeDownload(index)">继续
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="danger" @click="cancelDownload(index)">取消</el-button>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="warning" @click="diyUploadPath(1)">自定义上传地址</el-button>
            <el-button type="primary" @click="handleUpload(0)">上传单文件</el-button>
            <el-button type="primary" @click="handleUpload(1)">上传多文件</el-button>
          </el-col>

        </el-row>

      </el-drawer>
      <el-drawer v-model="drawer2
">
        <template #header>
          <h4>set title by slot</h4>
        </template>
        <template #default>
          <div>
            <el-radio v-model="radio1" label="Option 1" size="large"
            >Option 1
            </el-radio
            >
            <el-radio v-model="radio1" label="Option 2" size="large"
            >Option 2
            </el-radio
            >
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick1">cancel</el-button>
            <el-button type="primary" @click="confirmClick1">confirm</el-button>
          </div>
        </template>
      </el-drawer>
      <el-dialog
          v-model="diyDialogVisible"
          :before-close="divDialogHandleClose"
          :title="diyDialogTitle"
          style="align-items: center;border-radius: 10px;padding: 20px"
          width="670"
      >
        <span>
              <el-table :data="diyTableData" style="width: 100%;margin-bottom: 10px">
                  <el-table-column label="文件名" width="230">
                    <template v-slot:default="scope">{{ scope.row.file_name }}</template>
                  </el-table-column>
                  <el-table-column label="创建日期" width="300">
                    <template v-slot:default="scope">{{ scope.row.upload_time }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                     <template v-slot:default="scope">
                        <el-button type="text" @click="diyGetFolder(scope.row)">打开</el-button>
                       <el-button type="text"
                                  @click="diySelectFolder(scope.row.file_path+'/'+scope.row.file_name)">选择</el-button>
                     </template>
                  </el-table-column>
              </el-table>
              <el-button type="warning" @click="toLastDivPath">
                返回上一级
              </el-button>
              <el-button type="primary" @click="diySelectFolder(diyDialogTitle)">
                选择当前目录
              </el-button>
              <el-button type="success" @click="diyToRoot">
                返回根目录
              </el-button>
              <el-button type="danger">
                创建新的文件夹
              </el-button>
        </span>
      </el-dialog>
      <el-dialog
          v-model="mUploadDialogVisible"
          :before-close="mUploadDialogHandleClose"
          :title="mUploadDialogTitle"
          style="align-items: center;border-radius: 10px;padding: 20px"
          width="670"
      >
        <span>
          <el-upload
              ref="mUploadRef"
              :auto-upload="false"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          >
            <template #tip>
              <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </template>
            <template #trigger>
                  <el-button type="primary">选择文件</el-button>
            </template>
            <div style="padding: 0;margin: 0 0  0 10px;display: inline-flex">
              <el-button type="primary" @click="submitUpload">上传文件</el-button>
            </div>
          </el-upload>
        </span>
      </el-dialog>
      <el-dialog
          v-model="sUploadDialogVisible"
          :before-close="sUploadDialogHandleClose"
          :title="sUploadDialogTitle"
          style="align-items: center;border-radius: 10px;padding: 20px"
          width="670"
      >
        <el-upload
            ref="sUploadRef"
            v-loading="isLoading"
            :auto-upload="false"
            :data="uploadData"
            :limit="1"
            :multiple="false"
            :on-change=" changeFile"
            :on-exceed="handleExceed"
            element-loading-text="计算MD5中，切勿关掉对话框..."
        >
          <template #tip>
            <div>只能上传jpg/png文件，且不超过500kb</div>
          </template>
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <div style="padding: 0;margin: 0 0  0 10px;display: inline-flex">
            <el-button type="primary" @click="submitUpload">上传文件</el-button>
          </div>
        </el-upload>
      </el-dialog>
    </el-container>
  </div>
</template>
<style scoped>

.common-layout {
  padding: 0;
  width: 100vw;
  height: 100%;

  background-color: #f8f8f8;
}
</style>

<script lang="ts" setup>
import {
  Close,
  Delete,
  Document,
  Files,
  Headset,
  HomeFilled,
  Menu as IconMenu,
  MoreFilled,
  MostlyCloudy,
  Paperclip,
  Picture,
  Setting,
  Star,
  SwitchButton,
  User,
  VideoCamera,
} from '@element-plus/icons-vue'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {ElMessage, ElMessageBox, ElNotification as notify, ElTable, genFileId} from 'element-plus'
import {useRouter} from "vue-router";
import {ref, UnwrapRef} from 'vue'
import axios from "axios";
import {useUpload} from '@/ts/index/upload';
import {useFormat} from '@/ts/index/format';
import {useDiyUpload} from '@/ts/index/diyUpload';
//-----------------------------------------类型定义-------------------------------------------------
type  File = {
  file_UUid: string;
  file_name: string;
  file_type: string;
  upload_time: string;
  file_path: string;
  file_size: string;
  file_hash: string;
}
type FileInfo = {
  file_UUid: string,
  start: number, // 开始字节
  length: number, // 结束长度字节
  state: number
}
type DownLoadFile = {
  file: File;
  fileInfo: FileInfo;
  progress: number;
  speed: number;
  isPauseDownload: boolean;
  isCancelDownload: boolean;
  fileTemp: Blob | null; // 假设初始时 fileTemp 可能是 null
  controller: AbortController | null; // 同样，controller 也可能是 null
}
type UploadFile = {
  file: File;
  fileInfo: FileInfo;
  progress: number;
  speed: number;
}
const isLoading = ref(false)
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const downloadDrawer = ref(false)
const uploadDrawer = ref(false)
const drawer2 = ref(false)
const notiyDrawer = ref(false)
const radio1 = ref('Option 1')
const router = useRouter()

//---------------------------------------------------页面跳转操作-----------------------------------
const exit = () => { //退出
  localStorage.removeItem('rememberMe');
  router.push('../login')
}

function cancelClick1() {
  drawer2.value = false
}

function confirmClick1() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
      .then(() => {
        drawer2.value = false
      })
      .catch(() => {
        // catch error
      })
}

function getCssVarName(type: any) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}


//--------------------------------------------下载逻辑处理----------------------------------------------------------------------

const fileRouter = ref<string[]>([]);//路径路由数组
const changeRouter = (content) => {//改变路由操作
  fileRouter.value = content;
  console.log(fileRouter.value)
}

let fileList = ref<ref<DownLoadFile>[]>([]) //下载文件列表
const handleDownload = async (content) => { //点击下载逻辑
  if (checkUUIDISExits(content.file.file_UUid)) {
    notify({
      title: '提示',
      message: '该文件已存在',
      type: 'warning',
      duration: 2000
    })
  } else {
    const item = ref<DownLoadFile>({
      file: content.file,
      fileInfo: {
        file_UUid: content.file_UUid,
        start: 0,
        length: Number(content.file.file_size),
        state: 0
      },
      progress: 0,
      speed: 0,
      isPauseDownload: false,
      isCancelDownload: false,
      fileTemp: new Blob(),
      controller: new AbortController()
    })
    fileList.value.push(item)
    await startDownLoad(item)
  }
};
const checkUUIDISExits = (fUuid: String) => {//检查重复下载逻辑
  for (let i in fileList.value) {
    if (fUuid == fileList.value[i].value.file.file_UUid) {
      return true;
    }
  }
  return false;
}
const startDownLoad = async (item: ref<DownLoadFile>) => { //开始下载逻辑
  const signal = item.value.controller.signal;
  let chunks: BlobPart[] = [];
  try {
    const requestData = {
      user: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      },
      file: item.value.file,
      fileInfo: item.value.fileInfo
    };
    // 发起POST请求并处理响应
    const response: Response = await fetch('http://localhost:8080/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
      signal // 绑定信号
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const reader = response.body.getReader();
    let receivedLength = 0;
    let lastReceivedLength = 0;
    if (item.value.fileTemp.size !== 0) {
      receivedLength = item.value.fileTemp.size
      lastReceivedLength = receivedLength;
    }
    let count = 0;
    let date = new Date();
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
      if (count == 800) {
        let newDate = new Date();
        let seconds = (newDate - date) / 1000;
        let totalLength = receivedLength - lastReceivedLength
        if (totalLength < 10 * 1024) {
          item.value.speed = Number(((totalLength) / seconds).toFixed(2));
        } else if (totalLength < 10 * 1024 * 1024) {
          item.value.speed = Number(((totalLength) / 1024 / seconds).toFixed(2));
        } else {
          item.value.speed = Number(((totalLength) / 1024 / 1024 / seconds).toFixed(2));
        }
        item.value.progress = Number(((receivedLength / item.value.file.file_size) * 100).toFixed(2));
        lastReceivedLength = receivedLength;
        count = 0;
        date = newDate;
      } else {
        count++;
      }
    }
    let blob;
    if (item.value.fileTemp.size !== 0) {
      const fileTemp1 = new Blob(chunks)
      blob = new Blob([item.value.fileTemp, fileTemp1])
      item.fileTemp = new Blob();// 组合文件
    } else {
      blob = new Blob(chunks);
    }
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${item.value.file.file_name}.${item.value.file.file_type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    //重置参数
    chunks = [];
    chunks.length = 0;
    item.value.speed = 0;
    item.value.progress = 100;
    console.log(fileList.value)
    const index = fileList.value.indexOf(item);
    if (index !== -1) {
      fileList.value = fileList.value.filter((_, i) => i !== index);
    }
    console.log(fileList.value)
    //格式化网速
    if (blob < 1024) {
      notify(`下载成功，本次下载一共:${(blob.size).toFixed(2)}b`)
    } else if (blob < 1024 * 1024) {
      notify(`下载成功，本次下载一共:${(blob.size / 1024).toFixed(2)}Kb`)
    } else {
      notify(`下载成功，本次下载一共:${(blob.size / (1024 * 1024)).toFixed(2)}Mb`)
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      if (!item.value.isCancelDownload) {
        console.log(item)
        if (item.value.isPauseDownload) {
          const blob = new Blob(chunks);
          if (item.value.fileTemp.size == 0) {
            item.value.fileTemp = blob
          } else {
            item.value.fileTemp = new Blob([item.value.fileTemp, blob]) //继续下载
          }
          item.value.fileInfo.start = item.value.fileTemp.size;
          notify(`下载暂停，保存已下载部分,一共:${(item.value.fileTemp.size / (1024 * 1024)).toFixed(2)}Mb`)
        } else {
          notify("继续下载错误:" + error.name)
        }
      } else {
        notify("取消下载:" + error)
      }
    } else {
      // 错误处理
      console.error('下载文件时出错:', error);
    }
  }
}
//暂停下载
const pauseDownload = (index: number) => { //暂停下载逻辑
  const item = fileList.value[index]
  console.log("Object：")
  console.log(item)
  item.value.isPauseDownload = true//植入暂停状态
  if (item.value == null) {
    notify("不存在此下载请求")
  } else {
    if (item.value.controller) {
      notify("暂停")
      item.value.isCancelDownload = false;
      item.value.controller.abort();
    }
  }
};
const resumeDownload = (index: number) => {//继续下载逻辑
  const item = fileList.value[index]
  console.log("OBject：")
  if (item.value == null) {
    notify("不存在此下载请求")

  } else {
    notify('继续下载从' + item.value.fileInfo.start + "比特开始")
    item.value.controller = new AbortController()
    item.value.isCancelDownload = false
    item.value.isPauseDownload = false
    startDownLoad(item)
  }
};
const cancelDownload = (index: number) => { //取消下载逻辑
  const item = fileList.value[index]
  console.log(item)
  if (!item.value.isCancelDownload) {
    item.value.isCancelDownload = true;
    if (item.value == null) {
      notify("不存在此下载请求")
    } else {
      if (item.value.controller) {
        item.value.controller.abort();
        item.value.fileInfo.start = 0;
        item.value.speed = 0;
        item.value.progress = 0;
        item.value.controller = null;
        if (index !== -1) {
          fileList.value = fileList.value.filter((_, i) => i !== index);
        }
      }
    }
  } else {
    notify("嗯，其实已经取消了，重复操作没有意义")
  }
}

console.log(fileRouter.value.length)
//-----------------------------------------------------上传逻辑处理-------------------------------------------------------------------------
const uploadPath = ref<string>("")//上传路径
const { formatRouter,formatSpeed, formatSize} = useFormat(uploadPath)
const diyDialogTitle = ref("Null")//自定义路径
const diyDialogVisible = ref(false)//自定义路径选择对话框的可视化
const diyTableData = ref<File[]>([]) //定义文件列表数据
diyTableData.value = [  //根目录初始化
  {
    file_UUid: '',
    file_name: '',
    file_type: '',
    upload_time: '',
    file_path: '',
    file_size: '',
    file_hash: '',
  }
]
const diyPathList = ref<string[]>([localStorage.getItem('username')]) //路径列表，最后一个节点是当前访问的文件夹
const {diySelectFolder,
  diyToRoot,
  diyUploadPath,
  toLastDivPath,
  diyGetFolder,
  divDialogHandleClose,} = useDiyUpload(diyDialogVisible,uploadPath,diyPathList,diyTableData,diyDialogTitle)


const mUploadDialogVisible = ref(false)
const mUploadDialogTitle = ref("上传多文件")
const mUploadDialogHandleClose = () => {
  mUploadDialogVisible.value = false

}
const sUploadDialogVisible = ref(false)
const sUploadDialogTitle = ref("上传单文件")
const sUploadDialogHandleClose = () => {
  sUploadDialogVisible.value = false
}
const handleUpload = (val) => {
  if (val == 0) {
    sUploadDialogVisible.value = true
  } else {
    mUploadDialogVisible.value = true
  }
}

const sUploadRef = ref<UploadInstance>()

const testFile = ref<UploadFile>()
const isUploadCancel = ref(false);
let chuckSize = 1024 * 1024 * 10 //分片大小 10MB
let uploadStart = 0;//开始的碎片
let uploadEnd = 0;//结束的碎片
let uploadOther = 0;//剩余的碎片
let md5Hash = ref("null")
const uploadData = ref<UploadFile>()
const {
  submitUpload,
  changeFile
} = useUpload(chuckSize, uploadPath, uploadStart, uploadEnd, uploadOther, testFile, md5Hash, isLoading,sUploadRef);
</script>

<style>
.common-layout {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 700px;
  max-height: 1200px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}

.head {
  margin-bottom: 20px;
}

.flex-grow {
  flex-grow: 1;
}

.file-row {
  border: 2px solid var(--el-border-color);
  border-radius: 10px;
  padding: 18px;
  margin-top: 6px;
}

</style>