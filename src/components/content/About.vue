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
    boxShadow: `var(${getCssVarName('light')})`}">关于我们</el-header>
      <el-main >
        <!--主内容!-->
        <el-descriptions title="开发者1">
          <el-descriptions-item label="姓名">何思诗</el-descriptions-item>
          <el-descriptions-item label="电话">17260059850</el-descriptions-item>
          <el-descriptions-item label="地区">中国</el-descriptions-item>
          <el-descriptions-item label="标识">
            <el-tag size="small">校园开发者</el-tag>
            <el-tag size="small" style="margin-left:5px ">后端开发</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址"
          >惠州学院, 计算机系, 软件工程, 21届,1班,
          </el-descriptions-item
          >
        </el-descriptions>

        <el-descriptions title="开发者2" style="margin-top: 20px">
          <el-descriptions-item label="姓名">黄祥</el-descriptions-item>
          <el-descriptions-item label="电话">xxxxxxxxxxx</el-descriptions-item>
          <el-descriptions-item label="地区">中国</el-descriptions-item>
          <el-descriptions-item label="标识">
            <el-tag size="small">校园开发者</el-tag>
            <el-tag size="small" style="margin-left:5px ">前端开发</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址"
          >惠州学院, 计算机系, 软件工程, 21届,1班,
          </el-descriptions-item
          >
        </el-descriptions>

        <el-descriptions title="开发者3" style="margin-top: 20px">
          <el-descriptions-item label="姓名">周宇</el-descriptions-item>
          <el-descriptions-item label="电话">xxxxxxxxxxx</el-descriptions-item>
          <el-descriptions-item label="地区">中国</el-descriptions-item>
          <el-descriptions-item label="标识">
            <el-tag size="small">校园开发者</el-tag>
            <el-tag size="small" style="margin-left:5px ">算法优化</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址"
          >惠州学院, 计算机系, 软件工程, 21届,1班,
          </el-descriptions-item
          >
        </el-descriptions>

        <el-descriptions title="开发者4" style="margin-top: 20px">
          <el-descriptions-item label="姓名">李骏浩</el-descriptions-item>
          <el-descriptions-item label="电话">xxxxxxxxxxx</el-descriptions-item>
          <el-descriptions-item label="地区">中国</el-descriptions-item>
          <el-descriptions-item label="标识">
            <el-tag size="small">校园开发者</el-tag>
            <el-tag size="small" style="margin-left:5px ">需求分析</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址"
          >惠州学院, 计算机系, 软件工程, 21届,1班,
          </el-descriptions-item
          >
        </el-descriptions>

        <el-descriptions title="开发者5" style="margin-top: 20px">
          <el-descriptions-item label="姓名">孔希睿</el-descriptions-item>
          <el-descriptions-item label="电话">xxxxxxxxxxx</el-descriptions-item>
          <el-descriptions-item label="地区">中国</el-descriptions-item>
          <el-descriptions-item label="标识">
            <el-tag size="small">校园开发者</el-tag>
            <el-tag size="small" style="margin-left:5px ">调试反馈</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="地址"
          >惠州学院, 计算机系, 软件工程, 21届,1班,
          </el-descriptions-item
          >
        </el-descriptions>


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