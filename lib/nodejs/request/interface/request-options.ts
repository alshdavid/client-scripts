export type RequestOptions = RequestInit & {
  storeInCache?: boolean
  retries?: number
}

export type RequestFunc = (
  input: RequestInit,
  init?: RequestOptions
) => Promise<Response>
