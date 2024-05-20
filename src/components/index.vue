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
          <el-sub-menu index="1">
            <template #title>
              上传文件
            </template>
            <el-menu-item index="1-1">单文件上传</el-menu-item>
            <el-menu-item index="1-2">批量上传</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" @click="transferDrawer = true">传输列表</el-menu-item>
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
            <RouterView @clickDownload="handleDownload"></RouterView>
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

      <!--传输列表!-->
      <el-drawer
          v-model="transferDrawer"
          :before-close="handleClose1"
          title="传输列表"
      >
        <el-row class="file-row" v-for="(item, index) in fileList" :key="index">
          <el-col :span=10>
            <el-text>
              文件名：{{item.file.file_name+'.'+item.file.file_type}}
            </el-text>
          </el-col>
          <el-col :span=7>
            <el-text>
              大小：{{ item.file.file_size}}b
            </el-text>
          </el-col>
          <el-col :span=7>
            <el-text>
              速度：{{ item.speed.value}}
            </el-text>
          </el-col>
          <el-col :span=12 style="margin-top: 2px">
            <el-progress :percentage="item.progress.value"
                         :stroke-width="20"
                         :text-inside="true"
                         striped
                         striped-flow/>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="item.isPauseDownload.value" size="small" type="warning" @click="pauseDownload(item)">暂停</el-button>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="!item.isPauseDownload.value" size="small" type="primary" @click="resumeDownload(item)">继续</el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="danger" @click="cancelDownload(item)">取消</el-button>
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
  Document, Download,
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
import {useStore} from 'vuex';
import {ElMessageBox, ElNotification as notify} from 'element-plus'
import {useRouter} from "vue-router";
import {reactive, ref} from 'vue'


const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const transferDrawer = ref(false)
const drawer2 = ref(false)
const notiyDrawer = ref(false)
const radio1 = ref('Option 1')
const router = useRouter()

interface File {
  file_UUid: string;
  file_name: string;
  file_type: string;
  upload_time: string;
  file_path: string;
  file_size: string;
}

interface FileInfo {
  file_UUid: string,
  start: number, // 开始字节
  length: number, // 结束长度字节
  state: number
}


const handleClose1 = (done: () => void) => {
  done()
}

const exit = () => {
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



interface DownLoadFile {
  file: File,
  fileInfo: FileInfo,
  progress: ref<number>,
  speed: ref<string>,
  isPauseDownload: ref<Boolen>,
  isCancelDownload: ref<Boolean>,
  fileTemp: Blob,
  controller: AbortController
}

let fileList =  ref<DownloadFile[]>
const handleDownload = (content) => {
  if (!checkUUIDISExits(content.file.file_UUid)) {
    notify(content.file.file_UUid + "该文件UUID不存在，给予下载")
    let item: DownLoadFile = {
      file: content.file,
      fileInfo: {
        file_UUid: content.file.file_UUid, // 通常和 file.file_UUid 保持一致
        start: content.start,
        length: content.length,
        state: content.state, // 表示下载状态，例如 0 为未开始，1 为下载中，2 为已完成等
      },
      progress: ref(0),
      speed: ref("0"),
      isPauseDownload: ref(false), // 创建一个响应式引用表示是否暂停下载
      isCancelDownload: ref(false),
      fileTemp: new Blob([]),
      controller: new AbortController()
    }
    fileList.push(item)
    startDownLoad(item)
  } else {
    notify("该文件已在下载，切勿重新下载")
  }
};
//检查下载的FUUID是否存在
const checkUUIDISExits = (fUuid: String) => {
  for (let i in fileList) {
    if (fUuid == fileList[i].file.file_UUid) {
      return true;
    }
  }
  return false;
}
const startDownLoad = async (row: DownLoadFile) => {
// 创建一个新的控制器
  const signal = row.controller.signal;
  let chunks: BlobPart[] = [];
  try {
    const requestData = {
      user: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      },
      file: row.file,
      fileInfo: row.fileInfo
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
    if (row.fileTemp.size !== 0) {
      receivedLength = row.fileTemp.size;
      lastReceivedLength = receivedLength;
    }
    let count = 0;
    let date = new Date();
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
      if (count == 50) {
        let newDate = new Date();
        let seconds = (newDate - date) / 1000;
        let totalLength = receivedLength - lastReceivedLength
        if (totalLength < 10 * 1024) {
          row.speed.value = ((totalLength) / seconds).toFixed(2) + "b/s";
        }
        else if (totalLength < 10 * 1024 * 1024) {
          row.speed.value = ((totalLength) / 1024 / seconds).toFixed(2) + 'Kb/s';
        }
        else {
          row.speed.value=  ((totalLength) / 1024 / 1024 / seconds).toFixed(2) + "Mb/s";
        }
        row.progress.value = Number((receivedLength / row.file.file_size) * 100).toFixed(2);
        lastReceivedLength = receivedLength;
        count = 0;
        date = newDate;
      } else {
        count++;
      }
    }
    let blob;
    if (row.fileTemp.size !== 0) {
      const fileTemp1 = new Blob(chunks) //注意这里
      blob = new Blob([row.fileTemp, fileTemp1])
      row.fileTemp = new Blob();// 组合文件
    } else {
      blob = new Blob(chunks);
    }
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${row.file.file_name}.${row.file.file_type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    //重置参数
    chunks = [];
    chunks.length = 0;
    row.progress.value = 100;
    row.speed.value = "0b/s"
    row.fileTemp = new Blob();
    row.isPauseDownload = false;
    const uuidToRemove = row.fileInfo.file_UUid;
    fileList= fileList.filter(item => item.fileInfo.file_UUid !== uuidToRemove)//去除
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
      if (!row.isCancelDownload.value) {
        if (row.isPauseDownload.value){
          const blob = new Blob(chunks);
          if (row.fileTemp.size == 0) {
            row.fileTemp = blob
          } else {
            row.fileTemp = new Blob([row.fileTemp, blob]) //继续下载
          }
          row.fileInfo.start = row.fileTemp.size;
          notify(`下载暂停，保存已下载部分,一共:${(row.fileTemp.size / (1024 * 1024)).toFixed(2)}Mb`)
        }
        else {
          notify("继续下载错误"+error)
        }

      }
      else {
        notify("取消下载"+error)
      }
    } else {
      // 错误处理
      console.error('下载文件时出错:', error);
    }
  }
}
//暂停下载
const pauseDownload = (row:DownLoadFile) => {
  row.isPauseDownload.value = true //植入暂停状态
  if (row == null) {
    notify("不存在此下载请求")
  } else {
    if (row.controller) {
      notify("暂停")
      row.isCancelDownload.value = false
      row.controller.abort();
    }
  }

};
const resumeDownload = (row: DownLoadFile) => {
 // row.isCancelDownload = false;//继续时，取消状态返回默认值
  console.log(row)
  if (row == null) {
    notify("不存在此下载请求")

  } else {
    notify('继续下载从' + row.fileInfo.start + "比特开始")
    row.controller = new AbortController
    row.isCancelDownload.value = false
    row.isPauseDownload.value =  false
    startDownLoad(<DownLoadFile>row)
  }
};
const cancelDownload = (row) => {
  if (!row.isCancelDownload.value) {
    row.isCancelDownload.value= true;
    if (row == null) {
      notify("不存在此下载请求")
    } else {
      if (row.controller) {
        row.controller.abort();
        row.fileInfo.start = 0;
        row.progress.value= 0
        row.speed.value = "0b/s"
        row.fileTemp = new Blob();
        const uuidToRemove = row.fileInfo.file_UUid;
        fileList= fileList.filter(item => item.fileInfo.file_UUid !== uuidToRemove)//去除
      }
    }
  } else {
    notify("嗯，其实已经取消了，重复操作没有意义")
  }
}
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