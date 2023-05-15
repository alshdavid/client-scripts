export function removeNaughtyCharacters(text: string) {
  return text
    .replaceAll('’', "'")
    .replaceAll(' ', ' ')
    .replaceAll('–', '-')
    .replaceAll('‘', "'")
}
