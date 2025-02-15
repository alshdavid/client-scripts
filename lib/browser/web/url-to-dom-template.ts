import { RequestOptions, fetch } from '../fetch/index.js'
import { textToDomTemplate } from './text-to-dom-template.js'

export async function getPageDocument(url: string, options: RequestOptions) {
  const response = await fetch(url, options)
  const text = await response.text()
  return textToDomTemplate(text)
}
