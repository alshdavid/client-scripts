export async function loadScript(src: string) {
  if (!src) {
    throw new Error('No script source provided')
  }
  const script = document.createElement('script')
  script.src = src
  const onload = new Promise((r) => (script.onload = r))
  document.head.appendChild(script)
  await onload
}
