import { Fragment } from 'react';
import { removePunctuation } from '~/lib/url-parser';

export function renderInfoContent(content: string, urls: string[]) {
  let contentIdx = 0;
  return content.split(/[\s\n]/).map((word, idx) => {
    const cleanedWord = removePunctuation(word);
    const isLink = urls.includes(cleanedWord);
    contentIdx += word.length;
    word += content[contentIdx] ?? '';
    contentIdx += 1;
    return isLink ? (
      <a
        key={idx}
        href={cleanedWord}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400"
      >
        {word}
      </a>
    ) : (
      <Fragment key={idx}>{word}</Fragment>
    );
  });
}
