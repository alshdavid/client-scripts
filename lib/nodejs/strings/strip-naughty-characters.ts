export function stripNaughtyCharacters(text: string) {
  return text
    .replaceAll('’', "'")
    .replaceAll(' ', ' ')
    .replaceAll('–', '-')
    .replaceAll('‘', "'")
}
