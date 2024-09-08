/**
 * Extracts all URLs from a given string.
 *
 * This function uses a regular expression to find and extract all URLs within the provided text.
 * It supports various URL formats, including HTTP, HTTPS, FTP, and URLs with or without schemes.
 *
 * @param {string} text - The input string from which to extract URLs.
 * @returns {string[]} An array of URLs found in the input string. Returns an empty array if no URLs are found.
 *
 * @example
 * const text = `
 * Here are some links:
 * - http://example.com
 * - https://www.example.com/path?query=string#fragment
 * - ftp://example.com/resource/file.txt
 * - Just a plain text here
 * - www.example.co.uk
 * `;
 *
 * const urls = extractUrls(text);
 * console.log(urls);
 * // Output: [
 * //   'http://example.com',
 * //   'https://www.example.com/path?query=string#fragment',
 * //   'ftp://example.com/resource/file.txt',
 * //   'www.example.co.uk'
 * // ]
 */
export function extractUrls(text: string): string[] {
  const urlRegex =
    /\b((?:(https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:www\.)?(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,6}(?:\.[A-Za-z]{2,6})?(?::\d{1,5})?(?:\/\S*)?)\b/g;
  const urls = text.match(urlRegex) || [];
  return [...new Set(urls)];
}

/**
 * Removes all punctuation and symbol characters from the start and end of a string.
 *
 * @param {string} str - The input string from which to remove punctuation.
 * @returns {string} - The resulting string with punctuation removed from the start and end.
 *
 * @example
 * // Returns "Hello, world"
 * removePunctuation("!Hello, world!");
 */
export function removePunctuation(str: string): string {
  // Regular expression to match punctuation at the start and end of a string
  const punctuationRegex = /^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu;
  return str.replace(punctuationRegex, '');
}
