import showdown from "showdown";

const showdownConverter = new showdown.Converter();

/**
 * 
 * @param {String} rawText 
 */
export const mdToHtml = (rawText) => {
  return showdownConverter.makeHtml(rawText);
}