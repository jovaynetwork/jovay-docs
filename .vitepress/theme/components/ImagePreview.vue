<template>
  <div class="image-preview" @click="closePreview" v-if="showPreview" @keydown.esc="closePreview" tabindex="0"
    ref="previewRef">
    <div class="preview-content" @click.stop>
      <img :src="previewImage" class="preview-image" :class="{ 'loading': isLoading }" @load="handleImageLoad"
        @error="handleImageError" />
      <div v-if="isLoading" class="loading-spinner"></div>
      <div v-if="hasError" class="error-message">图片加载失败</div>
      <button class="close-button" @click="closePreview" aria-label="关闭预览">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import debug from 'debug'

const log = debug('jovay:image-preview')

interface EventBus {
  on: (event: string, callback: Function) => void;
}

const showPreview = ref(false)
const previewImage = ref('')
const isLoading = ref(false)
const hasError = ref(false)
const previewRef = ref<HTMLElement | null>(null)
const eventBus = inject<EventBus>('eventBus')

const openPreview = (src: string) => {
  previewImage.value = src
  showPreview.value = true
  isLoading.value = true
  hasError.value = false
  document.body.style.overflow = 'hidden'

  // 自动聚焦以支持键盘事件
  setTimeout(() => {
    previewRef.value?.focus()
  }, 100)
}

const closePreview = () => {
  showPreview.value = false
  document.body.style.overflow = ''
}

const handleImageLoad = () => {
  isLoading.value = false
}

const handleImageError = () => {
  log('Image load error')
  isLoading.value = false
  hasError.value = true
}

// 添加键盘事件监听
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showPreview.value) {
    closePreview()
  }
}

onMounted(() => {
  log('ImagePreview mounted')
  document.addEventListener('keydown', handleKeyDown)
  if (eventBus) {
    eventBus.on('preview-image', (src: string) => {
      log('Received preview event:', src)
      openPreview(src)
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

// 确保方法被正确暴露
defineExpose({
  openPreview,
  closePreview
})
</script>

<style scoped>
.image-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  outline: none;
}

.preview-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.preview-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-image:not(.loading) {
  opacity: 1;
}

.loading-spinner {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  color: #ff4d4f;
  font-size: 16px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
