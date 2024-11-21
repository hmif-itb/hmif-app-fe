import { Link } from '@tanstack/react-router';
import { Fragment } from 'react';
import { OgObject } from '~/api/generated';
import { removePunctuation } from '~/lib/url-parser';

const MAX_MINIMUM_LENGTH = 300;

export function renderInfoContent(
  infoId: string,
  content: string,
  urls: string[],
  minimum?: boolean,
) {
  let contentIdx = 0;
  const result = content.split(/[\s\n]/).map((word, idx) => {
    const cleanedWord = removePunctuation(word);
    const isLink = urls.includes(cleanedWord);
    contentIdx += word.length;
    word += content[contentIdx] ?? '';
    contentIdx += 1;
    if (contentIdx > MAX_MINIMUM_LENGTH && minimum) return null;
    return isLink ? (
      <a
        key={idx}
        href={
          cleanedWord.startsWith('http')
            ? cleanedWord
            : `https://${cleanedWord}`
        }
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

  if (contentIdx > MAX_MINIMUM_LENGTH && minimum) {
    result.push(
      <Fragment key={result.length}>
        ...
        <Link
          to="/timeline/$infoId"
          params={{ infoId: infoId }}
          className="font-semibold text-green-400"
        >
          show more
        </Link>
      </Fragment>,
    );
  }

  return result;
}

/**
 * Checks if the given open graph object is a google form
 */
export function isGoogleForm(og: OgObject | undefined) {
  if (!og) return false;

  return (
    og.ogTitle?.toLowerCase().includes('google forms') ||
    og.ogDescription?.toLowerCase().includes('google forms') ||
    og.requestUrl?.toLowerCase().includes('docs.google.com/forms')
  );
}
