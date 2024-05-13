
<template>

  <div class="common-layout content">
    <el-container>
      <el-header class="head">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="0">
            <el-icon><MostlyCloudy /></el-icon>
            Skyline
          </el-menu-item>
          <div class="flex-grow" />
          <el-sub-menu index="1" >
            <template #title>
              上传文件
            </template>
              <el-menu-item index="1-1" >单文件上传</el-menu-item>
              <el-menu-item index="1-2" >批量上传</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2"  @click="transferDrawer = true" >传输列表</el-menu-item>
          <el-menu-item index="3" >回收站</el-menu-item>

        </el-menu>
      </el-header>


      <!--内容!-->
      <el-main>

        <el-row>
          <el-col :span="3"><div class="grid-content ep-bg-purple-dark" />
            <!--侧边栏！-->
            <el-aside width="180px" >
              <el-radio-group v-model="isCollapse" style="margin-bottom: 25px" >
                <el-radio-button :label="false" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">展开</el-radio-button>
                <el-radio-button :label="true" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">收起</el-radio-button>
              </el-radio-group>
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse"
                  @open="handleOpen"
                  @close="handleClose"
                  :style="{
    boxShadow: `var(${getCssVarName('light')})`}"
              >
                <el-sub-menu index="1" >
                  <template #title  >
                    <el-icon  :size="22" @click="$router.push('../index/home')"><HomeFilled /></el-icon>
                    <span @click="$router.push('../index/home')" >首页</span>
                  </template>
                  <el-sub-menu index="1-1" >
                    <template #title>
                      <el-icon  @click="$router.push('../index/file')"><Files /></el-icon>
                      <span @click="$router.push('../index/file')">我的文件</span>
                    </template>
                    <el-menu-item index="1-1-1">
                      <el-icon><VideoCamera /></el-icon>
                      视频
                    </el-menu-item>
                    <el-menu-item index="1-1-2">
                      <el-icon><Picture /></el-icon>
                      图片
                    </el-menu-item>
                    <el-menu-item index="1-1-3">
                      <el-icon><Headset /></el-icon>
                      音频
                    </el-menu-item>
                    <el-menu-item index="1-1-4">
                      <el-icon><Document /></el-icon>
                      文档
                    </el-menu-item>
                    <el-menu-item index="1-1-5">
                      <el-icon><MoreFilled /></el-icon>
                      其他
                    </el-menu-item>

                  </el-sub-menu>
                  <el-sub-menu index="1-2">
                    <template #title>
                      <el-icon ><Delete /></el-icon>
                      <span>回收站</span>
                    </template>
                    <el-menu-item index="1-2-1">
                      <el-icon><Close /></el-icon>
                      清空</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="1-3">
                    <template #title>
                      <el-icon><Star /></el-icon>
                      <span>快捷方式</span>
                    </template>
                    <el-menu-item index="1-3-1">
                      <el-icon><Star /></el-icon>
                      购买会员</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>

                <el-sub-menu index="2">
                  <template #title>
                    <el-icon  :size="22" @click="$router.push('../index/file')"><Files/></el-icon>
                    <span @click="$router.push('../index/file')">文件</span>
                  </template>
                    <el-menu-item index="2-1">
                      <el-icon><VideoCamera /></el-icon>
                      视频
                    </el-menu-item>
                    <el-menu-item index="2-2">
                      <el-icon><Picture /></el-icon>
                      图片</el-menu-item>
                    <el-menu-item index="2-3">
                      <el-icon><Headset /></el-icon>
                      音频</el-menu-item>
                    <el-menu-item index="2-4">
                      <el-icon><Document /></el-icon>
                      文档
                    </el-menu-item>
                    <el-menu-item index="2-5">
                      <el-icon><MoreFilled /></el-icon>
                      其他
                    </el-menu-item>

                </el-sub-menu>
                <el-menu-item index="3" @click="$router.push('../index/application')">
                  <el-icon :size="22"><icon-menu /></el-icon>
                  <template #title>应用</template>
                </el-menu-item>
                <el-menu-item index="4" >
                  <el-icon :size="22" @click="$router.push('../index/setting')"><setting /></el-icon>
                  <template #title><span @click="$router.push('../index/setting')"> 设置</span></template>
                </el-menu-item>
                <el-menu-item index="5" @click="$router.push('../index/user')">
                  <el-icon  :size="22" @click="$router.push('../index/user')" ><user /></el-icon>
                  <template #title><span  @click="$router.push('../index/user')">个人</span></template>
                </el-menu-item>
                <el-menu-item index="6" >
                  <el-icon  :size="22" @click="$router.push('../index/about')"><paperclip/></el-icon>
                  <template #title>
                    <span @click="$router.push('../index/about')">关于</span></template>
                </el-menu-item>
                <el-menu-item index="7" @click="exit ">
                  <el-icon :size="22"><SwitchButton /></el-icon>
                  <template #title>退出</template>
                </el-menu-item>
              </el-menu>
            </el-aside>
          </el-col>

          <!--内容-->
          <el-col :span="20"><div class="grid-content ep-bg-purple-dark" />
                <RouterView></RouterView>
          </el-col>

        </el-row>
        <el-row style="margin-top: 6px">
            <el-col :span="4" :offset="20">
              <el-button @click="notiyDrawer=true" >消息中心</el-button>
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
          title="传输列表"
          :before-close="handleClose1"
      >
        <div>
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
            >Option 1</el-radio
            >
            <el-radio v-model="radio1" label="Option 2" size="large"
            >Option 2</el-radio
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

.common-layout{
  padding: 0;
  width: 100vw;
  height: 100%;

  background-color: #f8f8f8;
}
</style>

<script lang="ts" setup>

import {Store, useStore} from 'vuex';

const store = useStore();


import {ref, watch} from 'vue'
import {
  Document,
  Menu as IconMenu,
  HomeFilled,
  Setting,
  SwitchButton,
  Files,
  Delete,
  Star,
  VideoCamera,
  Picture,
  Headset,
  MoreFilled,
  Close,
  MostlyCloudy,
  User,
  Paperclip, Upload, Folder,
} from '@element-plus/icons-vue'

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


import { ElMessageBox } from 'element-plus'
import {useRouter} from "vue-router";
import axios from "axios";

const transferDrawer = ref(false)
const drawer2 = ref(false)
const notiyDrawer = ref(false)
const direction = ref('rtl')
const radio1 = ref('Option 1')

const router = useRouter()
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
const progress = ref(0);
watch(() => store.state.parentId, (newValue) => {
  progress.value = newValue;
});
</script>

<style>
.common-layout{
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 700px;
  max-height: 1200px;
  background-color: white;
}

.head{
  margin-bottom: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 670px;
}
.flex-grow {
  flex-grow: 1;
}

.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>