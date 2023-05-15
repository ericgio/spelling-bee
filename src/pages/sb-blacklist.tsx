import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Page from '../components/Page';

import { dedupeString, getSortedSpellingBeeResults, isPangram } from '../utils';

const TITLE = 'Spelling Bee Blacklist';

const $Main = styled(Page.Main)`
  max-width: 360px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    max-width: 640px !important;
  }
`;

const $Textarea = styled.textarea`
  resize: vertical;
`;

const $Results = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  text-align: left;
`;

const $DailyLetters = styled.div`
  font-weight: 800;
  font-family: 'nyt-franklin';
  line-height: 1.25;
  letter-spacing: 0.4em;
  margin: 0.5rem 0;
  text-transform: uppercase;

  &::first-letter {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

const $List = styled.ul`
  column-count: 3;
  list-style: none;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    column-count: 4;
  }
`;

const $Item = styled.li<{ $isPangram?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-weight: ${({ $isPangram }) => ($isPangram ? 700 : 500)};
  margin-bottom: 7px;
  padding: 4px 0 4px 1px;
  text-transform: capitalize;
`;

/**
 * Infer the 7 letters from the answer set.
 */
function getDailyLetters(answers: string[]) {
  // Generate a map of all the letters that appear in the answers.
  const letterMap: Record<string, number> = {};
  answers.forEach((word) => {
    // Don't count multiple occurences of a letter in a word.
    dedupeString(word)
      .split('')
      .forEach((char) => {
        if (!letterMap[char]) {
          letterMap[char] = 1;
          return;
        }
        letterMap[char] += 1;
      });
  });

  // Sorts the letters by frequency. This *should* put the required letter in
  // the first position, though if another letter happens to have the same
  // frequency, the results may be wrong.
  return Object.keys(letterMap)
    .sort((a, b) => letterMap[b] - letterMap[a])
    .join('');
}

function BlacklistGenerator() {
  const [value, setValue] = React.useState<string>('');

  const solutionArr = value
    .split('\n')
    .filter((word) => !!word)
    .map((word) => word.toLowerCase());

  const letters = getDailyLetters(solutionArr);
  const sorted = getSortedSpellingBeeResults(letters);
  const blacklist = sorted.filter((word) => !solutionArr.includes(word));

  return (
    <Page faviconSrc="/spelling-bee-favicon.ico" title={TITLE}>
      <$Main>
        <Page.Title icon="spelling-bee">{TITLE}</Page.Title>
        <p>Enter answer set</p>
        <$Textarea
          className="spelling-bee"
          rows={8}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {!!blacklist.length && (
          <$Results>
            <$DailyLetters>{letters.split('')}</$DailyLetters>
            <$List>
              {blacklist.map((result) => (
                <$Item $isPangram={isPangram(letters, result)} key={result}>
                  {result}
                </$Item>
              ))}
            </$List>
          </$Results>
        )}
      </$Main>
    </Page>
  );
}

export default BlacklistGenerator;
