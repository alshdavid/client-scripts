import { PromiseSubject } from "../rxjs/index.js"
import { sleep } from "../web/sleep.js"

export function retry<T>(fn: () => T | undefined | null, timeout: number = 5000): Promise<T> {
  const onResult = new PromiseSubject<T>()
  
  let running = true
  let timerTimeout: any
  let resultTimeout: any
  
  timerTimeout = globalThis.setTimeout(() => {
    running = false
    window.clearTimeout(resultTimeout)
    onResult.reject("Selector Timed Out")
  }, timeout)

  resultTimeout = setTimeout(async () => {
    while (running) {
      const result = fn()
      if (result === undefined || result === null) {
        await sleep(250)
        continue
      }

      running = false
      window.clearTimeout(timerTimeout)
      onResult.resolve(result)
      return
    }
  }, 0)

  return onResult
}