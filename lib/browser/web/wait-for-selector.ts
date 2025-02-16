import { PromiseSubject } from "../rxjs/index.js"
import { sleep } from "../web/sleep.js"

export function querySelectorAll(
  target: ParentNode = globalThis.document, 
  query: string | (string | number)[], 
  timeout: number = 5000,
): Promise<Element[]> {
  const onElement = new PromiseSubject<Element[]>()
  
  let running = true
  let timerTimeout: any
  let elementTimeout: any
  
  timerTimeout = globalThis.setTimeout(() => {
    running = false
    window.clearTimeout(elementTimeout)
    onElement.reject("Selector Timed Out")
  }, timeout)

  elementTimeout = setTimeout(async () => {
    while (running) {
      let result: Element[]
      if (Array.isArray(query)) {
        result = [$$(query, target)]
      } else {
        result = Array.from(target.querySelectorAll(query))
      }
      if (result && result.length) {
        running = false
        window.clearTimeout(timerTimeout)
        onElement.resolve(result)
        return
      }
      await sleep(250)
    }
  }, 0)

  return onElement
}

export async function querySelector(
  target: ParentNode = globalThis.document, 
  query: string | (string | number)[], 
  timeout: number = 5000,
): Promise<Element> {
  const result = await querySelectorAll(target, query, timeout)
  console.log({result})
  return result[0]
}

export const $$ = <T extends HTMLElement>(s: (string | number)[], target: ParentNode): T => {
  let els: HTMLElement[] = [document as any]

  for (const s1 of s) {
    if (els.length === 0) {
      throw new Error(`SelectorNotFound ${s.join(' then ')}`)
    }
    if (typeof s1 === 'string') {
      els =  Array.from(els[0].querySelectorAll(s1))
    } else {
      els =  [els[s1]]
    }
  }
  
  if (els.length === 0) {
    throw new Error(`SelectorNotFound ${s.join(' then ')}`)
  }

  return els[0] as T
}