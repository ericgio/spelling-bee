import axios from 'axios';
import { format } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import Tile from '../components/Tile';
import TileInput from '../components/TileInput';

import solutions from '../data/wordle-solutions.json';
import list from '../data/wordle.json';
import { useOnKeyDown } from '../hooks';
import { isLetter, wordleSolver } from '../utils';

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

const $Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

interface MultiInputProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
}

function MultiInput(props: MultiInputProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const inputs = containerRef.current.querySelectorAll('input');

    // Focus the next or previous input when typing or deleting letters.
    if (props.value.length < LETTER_COUNT) {
      inputs[props.value.length].focus();
      return;
    }

    inputs[props.value.length - 1].blur();
  }, [props.value.length]);

  return (
    <$Row ref={containerRef}>
      {Array.from(Array(LETTER_COUNT).keys()).map((idx) => {
        const value = props.value[idx] || '';
        return (
          <TileInput
            key={idx}
            onChange={() => {
              // No-op to avoid React warning.
            }}
            readOnly={props.disabled}
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

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      const char = e.key.toLowerCase();

      if (isLetter(char) && value.length < LETTER_COUNT) {
        setValue(value + char);
        return;
      }

      if (e.key === 'Backspace') {
        setValue(value.slice(0, -1));
        return;
      }

      if (
        e.key === 'Enter' &&
        value.length === LETTER_COUNT &&
        guesses.length < MAX_GUESSES &&
        list.includes(value)
      ) {
        setGuesses([...guesses, value]);
        setValue('');
      }
    },
    [guesses, value]
  );

  useOnKeyDown(onKeyDown);

  const { filterResults, getState } = wordleSolver(guesses, solution);
  const results = list.filter(filterResults);

  return (
    <Page faviconSrc="/wordle-favicon.ico" title={TITLE}>
      <Page.Main>
        <Page.Title icon="wordle">{TITLE}</Page.Title>
        <$Solution>
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
          {guesses.length < MAX_GUESSES && (
            <MultiInput onChange={(value) => setValue(value)} value={value} />
          )}
        </$Solution>
        {!!guesses.length && (
          <$Solution>
            <p>
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
            {results.map((word) => (
              <$Row key={word}>
                {word.split('').map((char, idx) => (
                  <Tile
                    key={`${word}-${char}-${idx}`}
                    state={
                      solutions.find(({ solution }) => solution === word)
                        ? 'correct'
                        : 'tbd'
                    }>
                    {char}
                  </Tile>
                ))}
              </$Row>
            ))}
          </$Solution>
        )}
      </Page.Main>
    </Page>
  );
}

export default WordleHelper;
