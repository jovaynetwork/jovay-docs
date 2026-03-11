/**
 * Clipboard API 仅在安全上下文（HTTPS / localhost）可用。
 * 非安全上下文下 navigator.clipboard 为 undefined，需 textarea + execCommand 降级。
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // 权限拒绝等，继续降级
    }
  }
  const ok = copyTextWithExecCommand(text)
  if (!ok) {
    throw new Error('复制失败：当前环境不支持剪贴板（请使用 HTTPS 或 localhost）')
  }
}

function copyTextWithExecCommand(text: string): boolean {
  if (typeof document === 'undefined') return false
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  ta.style.top = '0'
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  try {
    return document.execCommand('copy')
  } finally {
    document.body.removeChild(ta)
  }
}
