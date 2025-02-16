import { ReplaySubject } from './subject.js'

const REACTIVE = Symbol('REACTIVE')

export function reactive<T>(target: any, initialValue: T): ReplaySubject<T> {
  let store = Reflect.get(target, REACTIVE)
  if (!store) {
    store = [[],[]]
    Reflect.set(target, REACTIVE, store)
    
    const componentDidMount = Reflect.get(target, 'componentDidMount') || function () {}
    Reflect.set(target, 'componentDidMount', function() {
      for (const $ of store[0]) store[1].push($.subscribe(() => target.forceUpdate()))
      return componentDidMount.bind(target)()
    })

    const componentWillUnmount = Reflect.get(target, 'componentWillUnmount') || function () {}
    Reflect.set(target, 'componentWillUnmount', function() {
      for (const $ of store[1]) $()
      return componentWillUnmount.bind(target)()
    })
  }
  
  const $ = new ReplaySubject(initialValue)
  store[0].push($)
  return $
}