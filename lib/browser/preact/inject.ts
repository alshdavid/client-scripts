import { createContext, h } from 'preact'

export class DependencyContainer {
  static Context = createContext(null)
  static Provider = DependencyContainer.Context.Provider
  static Consumer = DependencyContainer.Context.Consumer

  #inner

  constructor(initial = {}) {
    this.#inner = new Map()
    for (const [k, v] of Object.entries(initial)) this.#inner.set(k, v)
  }

  provide(token: any, value: any): DependencyContainer {
    this.#inner.set(token, value)
    return this
  }

  get<T>(token: any): T {
    return this.#inner.get(token)
  }
}

const CONTEXT = Symbol('CONTEXT')

export class InjectRef<T> {
  #state
  #token

  constructor(state: { ref: Record<string| symbol| number, any> }, token: any) {
    this.#state = state
    this.#token = token
  }

  get(): T {
    return this.#state.ref.get(this.#token)
  }
}

export function inject<T = unknown>(target: any, token: any): InjectRef<T> {
  let state = { ref: Reflect.get(target, CONTEXT) }
  if (!state.ref) {
    Reflect.set(target, CONTEXT, state)

    const render = Reflect.get(target, 'render') || function () {}
    Reflect.set(target, 'render', function() {
      return h(
        DependencyContainer.Consumer, 
        { 
          children: (ctx) => {
            state.ref = ctx
            return render.bind(target)()
          }
        }, 
      )
    })
  }

  return new InjectRef(state, token)
}
