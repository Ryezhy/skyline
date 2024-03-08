<script setup>
import { reactive } from 'vue'

function getCssVarName(type) {
  return `--el-box-shadow${type ? '-' : ''}${type}`

}


</script>

<template>
  <div class="content" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">
    <el-container>
      <el-header class="head" :style="{
    boxShadow: `var(${getCssVarName('light')})`}">设置</el-header>
      <el-main >
        <el-divider :content-position="'center'" style="margin-top: 10px">语言设置</el-divider>
        <el-row >
          <el-col :span="24">
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="中文"></el-radio-button>
              <el-radio-button label="English"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-divider :content-position="'center'" style="margin-top: 40px">主题设置</el-divider>
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="radio2" size="medium">
              <el-radio-button label="浅色"></el-radio-button>
              <el-radio-button label="深色"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-divider :content-position="'center'" style="margin-top: 40px">背景设置</el-divider>
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="radio3" size="medium" >
              <el-radio-button label="图片"></el-radio-button>
              <el-radio-button label="颜色"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-divider :content-position="'center'" style="margin-top: 40px">背景图片设置</el-divider>
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="radio4" size="medium" >
              <el-radio-button label="图片"></el-radio-button>
              <el-radio-button label="颜色"></el-radio-button>
            </el-radio-group>
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