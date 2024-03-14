<template>
  <el-dialog
      v-model="internalDialogVisible"
      :title="title"
      width="500"
      @close="handleDialogClose"
  >
    <span>选择分享方式</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="internalDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAction">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

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

const emit = defineEmits(['update:modelValue']) // 这里是错误的，不应该这样做

const internalDialogVisible = ref(props.modelValue) // 初始化为 props 中的值
const title = ref(props.fileName)

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
  emit('update:modelValue', false) // 正确使用 emit 函数来通知父组件
}

const confirmAction = () => {
  // 执行确认操作后，可能关闭对话框并通知父组件
  emit('update:modelValue', false) // 正确使用 emit 函数来通知父组件
}
</script>