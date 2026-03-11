<template>
  <div
    v-if="shouldShowButton"
    ref="rootRef"
    class="copy-page-container"
  >
    <div class="copy-page-dropdown" :class="{ open: menuOpen }">
      <button
        type="button"
        class="copy-page-trigger"
        :aria-expanded="menuOpen"
        aria-haspopup="true"
        @click.stop="menuOpen = !menuOpen"
      >
        <span class="copy-page-trigger-label">Copy page</span>
        <svg class="chevron" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="currentColor" d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      <div v-show="menuOpen" class="copy-page-menu" role="menu">
        <button type="button" class="menu-item" role="menuitem" @click="onCopyForLLM">
          <span class="menu-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          </span>
          <span>Copy page as Markdown for LLMs</span>
        </button>
        <button type="button" class="menu-item" role="menuitem" @click="onViewMarkdown">
          <span class="menu-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </span>
          <span>View as Markdown</span>
        </button>
        <button type="button" class="menu-item" role="menuitem" @click="onOpenIn('claude')">
          <span class="menu-icon icon-claude" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="flex-shrink-0 mr-3 text-gray-400 dark:text-white" style="width: 16px; height: 16px; fill: currentcolor;"><title>Claude</title><path fill="currentColor" d="m4.709 15.955 4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a3 3 0 0 1-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312z"></path></svg>
          </span>
          <span>Open in Claude</span>
        </button>
        <button type="button" class="menu-item" role="menuitem" @click="onOpenIn('chatgpt')">
          <span class="menu-icon icon-chatgpt" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" class="flex-shrink-0 mr-3 text-gray-400 dark:text-white" style="width: 16px; height: 16px; fill: currentcolor;"><title>OpenAI</title><path d="M21.55 10.004a5.42 5.42 0 0 0-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.6 5.6 0 0 0 10.831 1C8.39.995 6.224 2.546 5.473 4.838A5.55 5.55 0 0 0 1.76 7.496a5.49 5.49 0 0 0 .691 6.5 5.42 5.42 0 0 0 .477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.59 5.59 0 0 0 13.168 23c2.443.006 4.61-1.546 5.361-3.84a5.55 5.55 0 0 0 3.715-2.66 5.49 5.49 0 0 0-.693-6.497zm-8.381 11.558a4.2 4.2 0 0 1-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 0 0 .364-.623v-6.176l1.877 1.069q.03.017.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123M4.192 17.78a4.06 4.06 0 0 1-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.07.07 0 0 1-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 0 1 5.198 6.41l-.002.151v5.06a.71.71 0 0 0 .364.624l5.42 3.087-1.876 1.07a.07.07 0 0 1-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54-5.42-3.088L14.896 7.6a.07.07 0 0 1 .063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.16 4.16 0 0 1-2.174 1.807V12.38a.71.71 0 0 0-.363-.623zm1.867-2.773-.132-.078-4.44-2.53a.73.73 0 0 0-.729 0l-5.42 3.088V7.325a.07.07 0 0 1 .027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757zm-11.741 3.81-1.877-1.068a.07.07 0 0 1-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 0 0-.365.623zv.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375z"></path></svg>
          </span>
          <span>Open in ChatGPT</span>
        </button>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="toast" class="copy-toast">{{ toast }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import { copyToClipboard } from '../utils/clipboard'

const { page, frontmatter } = useData()
const route = useRoute()
const menuOpen = ref(false)
const toast = ref('')
const rootRef = ref<HTMLElement | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null

const shouldShowButton = computed(() => {
  const isDocPage = page.value.filePath &&
    page.value.filePath.endsWith('.md') &&
    !page.value.filePath.includes('index.md')
  const hasContent = page.value.title || frontmatter.value.title
  return isDocPage && hasContent
})

function showToast(msg: string) {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = msg
  toastTimer = setTimeout(() => { toast.value = '' }, 2200)
}

function onClickOutside(e: MouseEvent) {
  if (!menuOpen.value || !rootRef.value) return
  if (!rootRef.value.contains(e.target as Node)) menuOpen.value = false
}

/**
 * VPNavBar 里 nav-bar-content-after 实际在 menu/appearance 之后。
 * 把本组件 DOM 挪到 #local-search（或 #docsearch）后面，才能紧挨搜索框。
 */
function moveAfterLocalSearch() {
  const el = rootRef.value
  if (!el) return
  const anchor =
    document.getElementById('local-search') || document.getElementById('docsearch')
  if (!anchor?.parentNode) return
  // 已在 #local-search 后则不再动
  if (anchor.nextSibling === el) return
  anchor.parentNode.insertBefore(el, anchor.nextSibling)
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  nextTick(() => {
    moveAfterLocalSearch()
    // 导航栏有时晚于当前 tick 渲染
    requestAnimationFrame(() => moveAfterLocalSearch())
    setTimeout(moveAfterLocalSearch, 100)
  })
})
onUnmounted(() => document.removeEventListener('click', onClickOutside))

watch(
  () => route.path,
  () => nextTick(() => moveAfterLocalSearch()),
)
watch(shouldShowButton, (show) => {
  if (show) nextTick(() => moveAfterLocalSearch())
})

async function fetchMarkdownFromUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const text = await res.text()
    return text.length > 0 ? text : null
  } catch {
    return null
  }
}

async function getMarkdownContent(): Promise<string> {
  const filePath = page.value.filePath
  if (!filePath) throw new Error('无法获取文件路径')
  const rel = filePath.split(/[/\\]/).join('/')
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  const primaryUrl = `${base}${rel}`

  const fromPrimary = await fetchMarkdownFromUrl(primaryUrl)
  if (fromPrimary !== null) return fromPrimary

  if (import.meta.env.DEV) {
    const cwd = process.cwd()
    for (const url of [
      `/@fs/${cwd}/${rel}`,
      `/${rel}?raw`,
      `/src/${rel}?raw`,
    ]) {
      const t = await fetchMarkdownFromUrl(url)
      if (t !== null) return t
    }
  }
  throw new Error('无法获取原始 Markdown')
}

function primaryMdUrl(): string {
  const filePath = page.value.filePath
  if (!filePath) return ''
  const rel = filePath.split(/[/\\]/).join('/')
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  if (typeof window !== 'undefined') {
    return new URL(base + rel, window.location.origin).href
  }
  return base + rel
}

async function onCopyForLLM() {
  menuOpen.value = false
  try {
    const raw = await getMarkdownContent()
    const title = page.value.title || frontmatter.value.title || 'Page'
    const source = typeof window !== 'undefined' ? window.location.href : ''
    const wrapped = `<!-- Source: ${source} -->\n# ${title}\n\n${raw}`
    await copyToClipboard(wrapped)
    showToast('Copied for LLMs')
  } catch (e) {
    console.error(e)
    alert('复制失败，请确认已构建并部署含 .md，或在 dev 下重试')
  }
}

function onViewMarkdown() {
  menuOpen.value = false
  const url = primaryMdUrl()
  if (!url) return
  // 直接打开当前页对应的 .md（与 buildEnd 镜像路径一致）
  window.open(url, '_blank', 'noopener,noreferrer')
}

const AI_URLS = {
  claude: 'https://claude.ai/new',
  chatgpt: 'https://chatgpt.com',
} as const

/**
 * 与 QuickNode 一致：q=Read from <md完整URL> so I can ask questions about it.
 * ChatGPT / Claude / Perplexity 均用同一句 encode 后拼在 q 上。
 */
function onOpenIn(which: keyof typeof AI_URLS) {
  menuOpen.value = false
  const mdUrl = primaryMdUrl()
  if (!mdUrl) return
  const base = AI_URLS[which]
  const qValue = encodeURIComponent(
    `Read from ${mdUrl} so I can ask questions about it.`,
  )
  const target = base.includes('?') ? `${base}&q=${qValue}` : `${base}?q=${qValue}`
  window.open(target, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* 由脚本插入到 #local-search 后，与 .VPNavBarSearch 内 flex 同一行 */
.copy-page-container {
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.copy-page-dropdown {
  position: relative;
}

.copy-page-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 40px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.copy-page-trigger:hover,
.copy-page-dropdown.open .copy-page-trigger {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border-color: var(--vp-c-brand);
}

.copy-page-trigger .chevron {
  opacity: 0.8;
}

.copy-page-dropdown.open .chevron {
  transform: rotate(180deg);
}

.copy-page-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 280px;
  padding: 6px;
  background: var(--vp-c-bg-elv, var(--vp-c-bg-alt));
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.menu-item:hover {
  background: var(--vp-c-bg-soft);
}

.menu-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
}

/* 简化版品牌色块，避免引入图片 */
.icon-claude {
  border-radius: 4px;
  width: 16px;
  height: 16px;
  margin: 2px;
}
.icon-chatgpt {
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin: 2px;
}
.icon-perplexity {
  border-radius: 4px;
  width: 16px;
  height: 16px;
  margin: 2px;
}

.copy-toast {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  padding: 8px 12px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 13px;
  border-radius: 10px;
  white-space: nowrap;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* 窄屏导航常收进菜单，content-after 可能不可见；若仍显示则缩小 */
@media (max-width: 768px) {
  .copy-page-container {
    margin-left: 8px;
  }
  .copy-page-menu {
    min-width: 240px;
    right: auto;
    left: 0;
  }
  .copy-page-trigger {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
