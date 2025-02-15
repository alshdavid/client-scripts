export async function createFrame(src: string, side: 'l' | 'r') {
  const frame = document.createElement('iframe')
  frame.src = src
  frame.style.position = 'fixed'
  frame.style.display = 'block'
  frame.style.top = '0'
  if (side === 'r') {
    frame.style.right = '0'
  } else {
    frame.style.left = '0'
  }
  frame.style.height = '50vh'
  frame.style.width = '50vw'
  frame.style.zIndex = '99999999999'
  const onload = new Promise((res) => (frame.onload = res))
  document.body.appendChild(frame)
  await onload
  const frameWindow = frame.contentWindow
  const frameDocument = frame.contentWindow!.document
  const dispose = () => frame.parentElement!.removeChild(frame)
  return [frameWindow, frameDocument, dispose]
}
