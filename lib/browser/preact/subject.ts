export class Subject<T> {
  #callbacks

  constructor() {
    this.#callbacks = new Set<(value: T) => any | Promise<any>>()
  }

  next(value: T) {
    for (const callback of this.#callbacks) {
      setTimeout(callback, 0, value)
    }
  }

  subscribe(callback: (value: T) => any | Promise<any>) {
    this.#callbacks.add(callback)
    return () => this.#callbacks.delete(callback)
  }
}

const UNSET = Symbol('UNSET')

export class ReplaySubject<T> {
  #callbacks: Set<(value: T) => any | Promise<any>>
  #state: T | typeof UNSET

  get value() {
    return this.#state
  }

  constructor(initialValue?: T) {
    this.#state = initialValue || UNSET
    this.#callbacks = new Set()
  }

  get() {
    return this.#state
  }

  next(value: T) {
    this.#state = value
    for (const callback of this.#callbacks) {
      setTimeout(callback, 0, value)
    }
  }

  subscribe(callback: (value: T) => any | Promise<any>) {
    if (this.#state !== UNSET) callback(this.#state)
    this.#callbacks.add(callback)
    return () => this.#callbacks.delete(callback)
  }

  tx(callback: (value: T) => T): void 
  tx(callback: (value: T) => Promise<T>): Promise<void>
  tx(callback: (value: T) => T | Promise<T>): void | Promise<void> {
    if (this.#state === UNSET) throw new Error('Value unset')
    const update = callback(this.#state)
  
    if (update instanceof Promise) {
      return update.then(update => {
        if (update === this.#state) return
        this.next(update)
      })
    }

    if (update === this.#state) return
    this.next(update)
  }
}
