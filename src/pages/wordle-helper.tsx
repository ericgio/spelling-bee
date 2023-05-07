import axios from 'axios';
import { format } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import Tile from '../components/Tile';
import TileInput from '../components/TileInput';

import solutions from '../data/wordle-solutions.json';
import list from '../data/wordle.json';
import { useMultiInput, UseMultiInputOptions } from '../hooks';
import { wordleSolver } from '../utils';

const LETTER_COUNT = 5;
const MAX_DATE = format(new Date(), 'yyyy-MM-dd');
const MAX_GUESSES = 6;
const TITLE = 'Wordle Helper';

const $Solution = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 1.5rem 0;
`;

const $RowButton = styled.a.attrs({
  href: '#',
  role: 'button',
})`
  text-decoration: none;
`;

const $Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

interface MultiInputProps extends Omit<UseMultiInputOptions, 'count'> {
  disabled?: boolean;
}

function MultiInput({ disabled, ...props }: MultiInputProps) {
  const containerRef = useMultiInput({
    ...props,
    count: LETTER_COUNT,
  });

  return (
    <$Row ref={containerRef}>
      {Array.from(Array(LETTER_COUNT).keys()).map((idx) => {
        const value = props.value[idx] || '';

        return (
          <TileInput
            key={idx}
            maxLength={1}
            onChange={() => {
              // No-op to avoid React warning.
            }}
            readOnly={disabled}
            state={value ? 'tbd' : 'empty'}
            value={value}
          />
        );
      })}
    </$Row>
  );
}

function WordleHelper() {
  const [guesses, setGuesses] = React.useState<string[]>([]);
  const [solution, setSolution] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    // Fetch today's solution
    async function fetchSolution() {
      const { data } = await axios.get(`/api/wordle?date=${MAX_DATE}`);
      setSolution(data.solution);
    }

    fetchSolution();
  }, []);

  const onSetGuess = React.useCallback(
    (guess: string) => {
      setGuesses([...guesses, guess]);
    },
    [guesses]
  );

  const onEnter = React.useCallback(() => {
    if (
      value.length === LETTER_COUNT &&
      guesses.length < MAX_GUESSES &&
      list.includes(value)
    ) {
      onSetGuess(value);
      setValue('');
    }
  }, [guesses.length, onSetGuess, value]);

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const { filterResults, getState } = wordleSolver(guesses, solution);
  const results = list.filter(filterResults);
  const isPuzzleSolved = guesses.at(-1) === solution;

  return (
    <Page faviconSrc="/wordle-favicon.ico" title={TITLE}>
      <Page.Main>
        <Page.Title icon="wordle">{TITLE}</Page.Title>
        <$Solution>
          <p>Enter a guess for today’s puzzle</p>
          {guesses.map((guess) => (
            <$Row key={guess}>
              {guess.split('').map((char, idx) => (
                <Tile
                  key={`${guess}-${char}-${idx}`}
                  state={getState(guess, idx)}>
                  {char}
                </Tile>
              ))}
            </$Row>
          ))}
          {guesses.length < MAX_GUESSES && !isPuzzleSolved && (
            <MultiInput onChange={onChange} onEnter={onEnter} value={value} />
          )}
        </$Solution>
        {!!guesses.length && (
          <$Solution>
            <p>
              {results.length}{' '}
              {results.length === 1 ? 'possibility' : 'possibilities'} remaining
            </p>
            {results.map((word) => {
              const isPastSolution = solutions.find(
                ({ solution }) => solution === word
              );

              const row = (
                <$Row key={word}>
                  {word.split('').map((char, idx) => (
                    <Tile
                      key={`${word}-${idx}`}
                      state={isPastSolution ? 'correct' : 'tbd'}>
                      {char}
                    </Tile>
                  ))}
                </$Row>
              );

              return !isPastSolution && !isPuzzleSolved ? (
                <$RowButton
                  key={word}
                  onClick={(e) => {
                    e.preventDefault();
                    !isPastSolution && !isPuzzleSolved && onSetGuess(word);
                  }}>
                  {row}
                </$RowButton>
              ) : (
                row
              );
            })}
          </$Solution>
        )}
      </Page.Main>
    </Page>
  );
}

export default WordleHelper;
