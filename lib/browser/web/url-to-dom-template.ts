import { RequestOptions, request } from '../request/index.js'
import { textToDomTemplate } from './text-to-dom-template.js'

export async function getPageDocument(url: string, options: RequestOptions) {
  const response = await request(url, options)
  const text = await response.text()
  return textToDomTemplate(text)
}
