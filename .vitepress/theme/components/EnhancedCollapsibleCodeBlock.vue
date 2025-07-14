<template>
  <div class="enhanced-collapsible-code-block">
    <div class="code-block-header" @click="toggle">
      <span class="icon">{{ showCode ? "▼" : "▶" }}</span>
      <span class="title">{{ title }}</span>
      <div class="header-controls">
        <button
          v-if="showCopyButton"
          class="copy-btn"
          @click.stop="copyAllCode"
          :title="copyText"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        </button>
        <span v-if="showLanguageLabel && language" class="language-label">
          {{ language.toUpperCase() }}
        </span>
      </div>
    </div>
    
    <div 
      ref="codeContentRef"
      class="code-block-content" 
      :class="{ 
        'show': showCode,
        [`language-${language}`]: language
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  language?: string
  showCopyButton?: boolean
  showLanguageLabel?: boolean
  defaultExpanded?: boolean
  onToggle?: (isExpanded: boolean) => void
  onCopy?: (success: boolean) => void
}

const props = withDefaults(defineProps<Props>(), {
  language: '',
  showCopyButton: false,
  showLanguageLabel: false,
  defaultExpanded: false
})

const showCode = ref(props.defaultExpanded)
const codeContentRef = ref<HTMLElement>()
const copyText = ref('复制代码')

const copyAllCode = async () => {
  if (!codeContentRef.value) return
  
  try {
    const codeElements = codeContentRef.value.querySelectorAll('code')
    const texts = Array.from(codeElements).map(el => el.textContent || '').join('\n\n')
    
    await navigator.clipboard.writeText(texts)
    copyText.value = '已复制'
    
    setTimeout(() => {
      copyText.value = '复制代码'
    }, 2000)
    
    props.onCopy?.(true)
  } catch (error) {
    console.error('复制失败:', error)
    props.onCopy?.(false)
    // 降级方案
    fallbackCopyToClipboard()
  }
}

const fallbackCopyToClipboard = () => {
  if (!codeContentRef.value) return
  
  const codeElements = codeContentRef.value.querySelectorAll('code')
  const texts = Array.from(codeElements).map(el => el.textContent || '').join('\n\n')
  
  const textArea = document.createElement('textarea')
  textArea.value = texts
  document.body.appendChild(textArea)
  textArea.select()
  
  try {
    document.execCommand('copy')
    copyText.value = '已复制'
    setTimeout(() => {
      copyText.value = '复制代码'
    }, 2000)
    props.onCopy?.(true)
  } catch (error) {
    console.error('降级复制也失败:', error)
    props.onCopy?.(false)
  }
  
  document.body.removeChild(textArea)
}

const toggle = () => {
  showCode.value = !showCode.value
  props.onToggle?.(showCode.value)
}
</script>

<style scoped>
.enhanced-collapsible-code-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.enhanced-collapsible-code-block:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.code-block-header {
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background-color 0.3s ease;
  user-select: none;
}

.code-block-header:hover {
  background: var(--vp-c-bg-mute);
}

.code-block-header .title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  flex: 1;
}

.code-block-header .icon {
  margin-right: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: transform 0.3s ease;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-btn {
  background: transparent;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transform: scale(1.05);
}

.language-label {
  background: var(--vp-c-brand);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block-content {
  display: none;
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: 0;
  opacity: 0;
  border-top: unset;
}

.code-block-content.show {
  display: block;
  max-height: none;
  opacity: 1;
}

/* 内容区域样式 */
.code-block-content.show :deep(pre) {
  margin: 0;
  border-radius: 0;
  background: var(--vp-code-block-bg);
  border: none;
}

.code-block-content.show :deep([class*="language-"]) {
  margin: 0;
  border-radius: 0;
  border: none;
}

.code-block-content.show :deep(.line-numbers) {
  border-radius: 0;
}

/* 特定语言的主题色 */
.code-block-content.language-javascript .language-label {
  background: #f7df1e;
  color: #000;
}

.code-block-content.language-typescript .language-label {
  background: #3178c6;
  color: #fff;
}

.code-block-content.language-solidity .language-label {
  background: #363636;
  color: #fff;
}

.code-block-content.language-python .language-label {
  background: #3776ab;
  color: #fff;
}

.code-block-content.language-rust .language-label {
  background: #ce422b;
  color: #fff;
}

.code-block-content.language-go .language-label {
  background: #00add8;
  color: #fff;
}

.code-block-content.language-shell .language-label {
  background: #4EAA25;
  color: #fff;
}

.code-block-content.language-json .language-label {
  background: #000;
  color: #fff;
}

.code-block-content.language-yaml .language-label {
  background: #CB171E;
  color: #fff;
}

.code-block-content.language-dockerfile .language-label {
  background: #2496ED;
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .code-block-header {
    padding: 10px 12px;
  }
  
  .code-block-header .title {
    font-size: 13px;
  }
  
  .language-label {
    font-size: 10px;
    padding: 2px 6px;
  }
  
  .copy-btn {
    padding: 4px;
  }
  
  .header-controls {
    gap: 6px;
  }
}

/* 暗色主题适配 */
.dark .enhanced-collapsible-code-block {
  border-color: var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dark .enhanced-collapsible-code-block:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.dark .copy-btn:hover {
  background: var(--vp-c-bg-elv);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.code-block-content.show {
  animation: fadeIn 0.3s ease;
}

/* 聚焦状态 */
.code-block-header:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.copy-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}
</style>
