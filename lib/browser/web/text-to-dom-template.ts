export function textToDomTemplate(text: string) {
  const template = document.createElement('template')
  template.innerHTML = text
  return template.content
}
