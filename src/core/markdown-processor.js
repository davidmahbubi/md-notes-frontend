import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify/lib";
import remarkParse from "remark-parse/lib";
import remarkGfm from "remark-gfm";

/**
 * 
 * @param {String} rawText 
 * @returns Promise<String>
 */
export const mdToHtml = async rawText => {
  return unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(rawText);
}