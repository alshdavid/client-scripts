import { request } from '../request'
import { textToDomTemplate } from './text-to-dom-template'

export async function getPageDocument(url: string) {
  const response = await request(url)
  const text = await response.text()
  return [text, textToDomTemplate(text)]
}
