<template>
  <span class="custom-image-wrapper">
    <img :src="src" :alt="alt" class="custom-image" @click="handleClick" @error="handleError"
      :class="{ 'image-error': hasError }" />
    <span v-if="hasError" class="error-message">
      图片加载失败
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import debug from 'debug'

const log = debug('jovay:custom-image')
log('CustomImage mounted')

interface ImagePreviewService {
  openPreview: (src: string) => void;
}

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const hasError = ref(false)
const imagePreview = inject<ImagePreviewService>('imagePreview')

onMounted(() => {
  log('CustomImage mounted, imagePreview service:', !!imagePreview)
})

const handleClick = () => {
  if (!hasError.value && imagePreview?.openPreview) {
    try {
      imagePreview.openPreview(props.src)
    } catch (error) {
      log('Failed to open image preview:', error)
    }
  } else {
    log('Cannot open preview:', {
      hasError: hasError.value,
      hasPreviewService: !!imagePreview?.openPreview
    })
  }
}

const handleError = () => {
  log('Image load error:', props.src)
  hasError.value = true
}
</script>

<style scoped>
.custom-image-wrapper {
  display: inline-block;
  position: relative;
}

.custom-image {
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 100%;
  height: auto;
}

.custom-image:hover {
  transform: scale(1.02);
}

.custom-image.image-error {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff4d4f;
  font-size: 14px;
  white-space: nowrap;
}
</style>
