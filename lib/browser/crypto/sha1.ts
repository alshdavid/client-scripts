export async function sha1(input: string): Promise<string> {
  const utf8 = new TextEncoder().encode(input)
  return crypto.subtle.digest('SHA-1', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  })
}
