<template>
  <el-dialog
      class="dialog"
      v-model="internalDialogVisible"
      :title="title"
      width="500"
      @close="handleDialogClose"
  >
    <el-row>
      <el-col :span="4" :offset="1">
        <el-text>选择类型</el-text>
      </el-col>
      <el-col :span="19">
        <el-radio-group v-model="shareType">
          <el-radio  :label="1">无密码</el-radio>
          <el-radio  :label="2">四位密码</el-radio>
          <el-radio  :label="3">长密码</el-radio>
        </el-radio-group>
      </el-col>
      <el-col  v-if="shareType===2"  :span="6" :offset="9">
        <el-input v-model="fourPassword" maxlength="4" minlength="4"></el-input>
      </el-col>
      <el-col  v-if="shareType===3"   :span="8" :offset="8">
        <el-input v-model="longPassword" maxlength="11" minlength="4"></el-input>
      </el-col>
      <el-col :span="2" v-if="shareType!==1">
        <el-button type="primary" style="margin-left: 5px"  @click="generateRandomPassword"> 随机</el-button>
      </el-col>

    </el-row>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="internalDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAction">分享</el-button>
      </div>
    </template>
  </el-dialog>
  <!--分享成功跳出的链接!-->
  <el-dialog
      v-model="shareDialogVisible"
      :title="'文件名'+title"
      width="500"
      @close="handleDialogClose"
  >
    <el-row>
      <el-col :span="4" :offset="1">
        <el-text>分享链接-------</el-text>
      </el-col>
      <el-col   :span="6" :offset="9">
        <el-text >密码：{{password}}</el-text>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {Share} from "@element-plus/icons-vue";

//参数
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: ''
  }
})

let shareType = ref(1)
const emit = defineEmits(['update:modelValue']) // 通知父组件更新modelValue

const internalDialogVisible = ref(props.modelValue) // 初始化为 props 中的值
const shareDialogVisible = ref(false)
const title = ref(props.fileName)
const fourPassword = ref(Math.random().toString().slice(-4))
const longPassword = ref(Math.random().toString(36).slice(-11))
let password = ref('')

// 监听 prop 中 modeValue的变化并更新对话框的显示和隐藏
watch(() => props.modelValue, (newVal) => {
  internalDialogVisible.value = newVal
})
// 监听 prop 中 fileName的变化并更新对话框的标题
watch(() => props.fileName, (newVal) => {
  title.value = newVal
})

// 当关闭对话框时触发的事件
const handleDialogClose = () => {
  // 这里可以添加确认逻辑，比如使用 ElMessageBox
  // 假设我们允许关闭，则通知父组件
  //shareType.value= 1
  emit('update:modelValue', false) // 正确使用 emit 函数来通知父组件
}

const confirmAction = () => {
  // 执行确认操作后，可能关闭对话框并通知父组件
  if (shareType.value===2){
    password.value = fourPassword.value
  }
  if (shareType.value===3){
    //生成4~11位的随机密码
    password.value = longPassword.value
  }
  if(shareType.value===1){
    password.value = ''
  }
  shareDialogVisible.value = true
  shareType.value= 1
  emit('update:modelValue', false) // 正确使用 emit 函数来通知父组件
}

const generateRandomPassword = () => {
  if (shareType.value===2){
    fourPassword.value = Math.random().toString().slice(-4)
    password.value = fourPassword.value
  }
  if (shareType.value===3){
    //生成4~11位的随机密码
    longPassword.value = Math.random().toString(36).slice(-11)
    password.value = longPassword.value
  }
  if(shareType.value===1){
    password.value = ''
  }
}
</script>