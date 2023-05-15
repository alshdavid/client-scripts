import { removeNaughtyCharacters } from "./remove-naughty-characters";

const HeadingsWithProps = new RegExp("<h[1-6][^>].*?</h[1-6]>", "g");
const HeadingsWithoutProps = new RegExp("<h[1-6]>.*?</h[1-6]>", "g");
const PreTags = new RegExp("<pre>.*?</pre>", "g");
const PreTagsWithProps = new RegExp("<pre[^>].*?</pre>", "g");
const CodeTags = new RegExp("<code>.*?</code>", "g");
const CodeTagsWithPros = new RegExp("<code[^>].*?</code>", "g");
const SpecialCharacters = new RegExp("&.*?;", "g");
const Sanitize = new RegExp("(<([^>]+)>)", "g");

export function stripHtml(text: string, limit: number = -1) {
  let result = text
    .replaceAll(HeadingsWithProps, "")
    .replaceAll(HeadingsWithoutProps, "")
    .replaceAll(PreTagsWithProps, "")
    .replaceAll(PreTags, "")
    .replaceAll(CodeTagsWithPros, "")
    .replaceAll(CodeTags, "")
    .replaceAll(Sanitize, "")
    .replaceAll(SpecialCharacters, "")
    .replaceAll("\n", " ")
    .replaceAll("\t", "")
    .replaceAll("\r", "")
  
  if (limit !== -1) {
    result = result.substring(0, limit)
  }

  return removeNaughtyCharacters(result)
}
