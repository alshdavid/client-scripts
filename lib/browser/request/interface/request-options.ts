export type RequestOptions = RequestInit & {
  storeInCache?: boolean
  retries?: number
}

export type RequestFunc = (
  input: RequestInfo,
  init?: RequestOptions
) => Promise<Response>
