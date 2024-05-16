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
        <div>
          <p></p>
          <p>下载进度: {{ progress }}%</p>
          <el-progress :percentage="progress"></el-progress>
        </div>

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
import {useStore} from 'vuex';
import {ElMessageBox, ElNotification as notify} from 'element-plus'
import {useRouter} from "vue-router";
import {ref} from 'vue'

const store = useStore();

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


const parentId = store.state.parentId
let fileBlog = new Blob();

let fileTemp = new Blob()
let start = 0
let controller: AbortController; // 用于控制请求取消
if (controller) {
  controller.abort();
}
let state = 0
const handleDownload = (content) => {
  const row = content.file

  if (!checkUUIDISExits(row.file_UUid)) {
    notify("该文件FUID不存在，给予下载")
    state = content.state
    start = content.start
    startDownLoad(row, state)
    FUUIUDs.push(row.file_UUid)
  } else {
    notify("该文件已在下载，切勿重新下载")
  }
};
//检查下载的FUUID是否存在
const checkUUIDISExits = (fUuid: String) => {
  for (let i in FUUIUDs) {
    if (fUuid == i) {
      return true;
    }
  }
  return false;

}
let progress = 0;
//FUUID数组
let FUUIUDs = []
const startDownLoad = async (row: File, state: number) => {
// 创建一个新的控制器
  controller = new AbortController();
  const signal = controller.signal;
  let chunks: BlobPart[] = [];

  try {
    const requestData = {
      user: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      },
      file: {
        file_UUid: row.file_UUid,
        file_name: row.file_name,
        file_type: row.file_type,
        upload_time: row.upload_time,
        file_path: row.file_path,
        file_size: row.file_size
      },
      fileInfo: {
        file_UUid: row.file_UUid,
        start: start, // 开始字节
        length: row.file_size, // 结束长度字节
        state: state
      }
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
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
    }
    let blob;
    if (fileBlog.size !== 0) {
      fileTemp = new Blob(chunks)
      blob = new Blob([fileBlog, fileTemp])
      fileBlog = new Blob();// 清空文件
    } else {
      blob = new Blob(chunks);
    }
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${row.file_name}.${row.file_type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    chunks = [];
    chunks.length = 0;
    start = 0
    notify(`下载，成功一共:${(blob.size / (1024 * 1024)).toFixed(2)}Mb`)
  } catch (error: any) {
    if (error.name === 'AbortError') {
      // 处理保存已经下载的部分 Blob
      const blob = new Blob(chunks);
      start = blob.size
      if (fileBlog.size == 0) {
        fileBlog = blob
      } else {
        fileBlog = new Blob([fileBlog, blob]) //继续下载
      }
      notify(`下载取消，保存已下载部分,一共:${(fileBlog.size / (1024 * 1024)).toFixed(2)}Mb`)
    } else {
      // 错误处理
      console.error('下载文件时出错:', error);
    }
  }
}
//暂停下载
const pauseDownload = () => {
  if (controller) {
    controller.abort();
  }
};
const resumeDownload = (row: File) => {
  notify('继续下载从' + start + "b开始")
  startDownLoad(row, 0)
};
</script>

<style>
.common-layout {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 700px;
  max-height: 1200px;
  background-color: white;
}

.head {
  margin-bottom: 20px;
}

.flex-grow {
  flex-grow: 1;
}

</style>