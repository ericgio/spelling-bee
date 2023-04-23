import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Input from '../components/Input';

import {
  dedupeArray,
  getSortedSpellingBeeResults,
  isLetter,
  isPangram,
} from '../utils';

import { useOnKeyDown, useOnPaste } from '../hooks';

const LETTER_COUNT = 7;

const $Main = styled.main`
  max-width: 360px;
  margin: 32px auto;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    max-width: 640px;
  }
`;

const $Logo = styled.div`
  background-image: url('./spelling-bee-icon.svg');
  height: 56px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 4px;
`;

const $Title = styled.h1`
  font-family: 'nyt-karnakcondensed', Arial, Helvetica, sans-serif;
  font-size: 42px;
  margin: 0 0 16px 0;
`;

const $InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px 0;
  user-select: none;
`;

const $ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const $Results = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 32px;
  padding: 16px 24px;
  text-align: left;
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

interface LetterInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'value'> {
  onChange: (value: string[]) => void;
  value: string[];
}

function LetterInput(props: LetterInputProps) {
  return (
    <$InputContainer>
      {Array.from(Array(LETTER_COUNT).keys()).map((idx) => (
        <Input
          key={idx}
          maxLength={1}
          readOnly
          required={idx === 0}
          value={props.value[idx] || ''}
        />
      ))}
    </$InputContainer>
  );
}

function Home() {
  const [showResults, setShowResults] = React.useState(false);
  const [letters, setLetters] = React.useState<string[]>([]);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (showResults) {
        return;
      }

      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      const char = e.key.toLowerCase();

      if (
        isLetter(char) &&
        letters.length < LETTER_COUNT &&
        !letters.includes(char)
      ) {
        setLetters([...letters, char]);
      }

      if (e.key === 'Backspace') {
        setLetters(letters.slice(0, -1));
      }
    },
    [letters, setLetters, showResults]
  );

  useOnKeyDown(onKeyDown);

  const onPaste = React.useCallback(
    (e: ClipboardEvent) => {
      const pastedStr = e.clipboardData?.getData('Text').toLowerCase();

      if (showResults || !pastedStr) {
        return;
      }

      const newLetters = dedupeArray(pastedStr.split(''))
        .filter(isLetter)
        .slice(0, LETTER_COUNT);

      setLetters(newLetters);
    },
    [setLetters, showResults]
  );

  useOnPaste(onPaste);

  function onSubmit() {
    setShowResults(true);
  }

  function onReset() {
    setShowResults(false);
    setLetters([]);
  }

  const results = showResults ? getSortedSpellingBeeResults(letters) : [];

  return (
    <$Main>
      <Head>
        <title>Spelling Bee Solver</title>
        <link rel="shortcut icon" href="/spelling-bee-favicon.ico" />
      </Head>
      <$Logo />
      <$Title>Spelling Bee Solver</$Title>
      <p>Enter today{'’'}s letters</p>
      <LetterInput
        disabled={!!results.length}
        onChange={setLetters}
        value={letters}
      />
      <$ButtonGroup>
        <Button
          $primary
          disabled={letters.length !== LETTER_COUNT}
          onClick={onSubmit}>
          Solve
        </Button>
        <Button disabled={!letters.length} onClick={onReset}>
          Reset
        </Button>
      </$ButtonGroup>
      {!!results.length && (
        <$Results>
          <p>{results.length} words</p>
          <$List>
            {results.map((result) => (
              <$Item $isPangram={isPangram(letters, result)} key={result}>
                {result}
              </$Item>
            ))}
          </$List>
        </$Results>
      )}
    </$Main>
  );
}

export default Home;
