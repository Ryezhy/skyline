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
    boxShadow: `var(${getCssVarName('light')})`}">应用</el-header>
      <el-main >Main</el-main>
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