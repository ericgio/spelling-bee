import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Input from '../components/Input';

import words from '../data/spellingBee.json';

const LETTER_COUNT = 7;

const $Main = styled.main`
  max-width: 500px;
  margin: 32px auto;
  text-align: center;
`;

const $Bee = styled.div`
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
  justify-content: space-between;
  gap: 8px;
  margin: 32px 0;
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
          disabled={props.disabled}
          key={idx}
          maxLength={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            // TODO: Better validation:
            // - Letters only
            // - No duplicate letters
            if (value === ' ') {
              return;
            }

            const newValue = [...props.value];
            newValue[idx] = value.toLowerCase();

            props.onChange(newValue);
          }}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            if (props.disabled) {
              return;
            }
            // TODO: Assumes content is being pasted in the first input.
            // Make this work for other inputs.
            const pastedStr = e.clipboardData.getData('Text').toLowerCase();
            props.onChange(pastedStr.split('').slice(0, LETTER_COUNT));
          }}
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

  function onSubmit() {
    setShowResults(true);
  }

  function onReset() {
    setShowResults(false);
    setLetters([]);
  }

  let results: string[] = [];
  if (showResults) {
    results = words.filter((word) => {
      // Filter out words that don't inckude the required letter.
      if (!word.includes(letters[0])) {
        return false;
      }

      // Filter out words that contain invalid letters.
      return word.split('').every((letter) => letters.includes(letter));
    });
  }

  return (
    <$Main>
      <Head>
        <title>Spelling Bee Solver</title>
      </Head>
      <$Bee />
      <$Title>Spelling Bee Solver</$Title>
      <p>Enter today{"'"}s letters</p>
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
              <$Item
                $isPangram={letters.every((ch) => result.indexOf(ch) > -1)}
                key={result}>
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
