import { request } from '../request/index.js'
import { textToDomTemplate } from './text-to-dom-template.js'

export async function getPageDocument(url: string) {
  const response = await request(url)
  const text = await response.text()
  return [text, textToDomTemplate(text)]
}
