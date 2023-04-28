import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import HexInput from '../components/HexInput';

import {
  dedupeArray,
  getSortedSpellingBeeResults,
  isLetter,
  isPangram,
} from '../utils';

import { useOnKeyDown, useOnPaste } from '../hooks';
import Page from '@/components/Page';

const LETTER_COUNT = 7;
const TITLE = 'Spelling Bee Solver';

const $Main = styled(Page.Main)`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    max-width: 640px !important;
  }
`;

const $InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
  user-select: none;
`;

const $ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const $Results = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 2rem;
  padding: 1rem 1.5rem;
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
    <$InputContainer ref={containerRef}>
      {Array.from(Array(LETTER_COUNT).keys()).map((idx) => (
        <HexInput
          key={idx}
          maxLength={1}
          onChange={() => {
            // No-op to avoid React warning.
          }}
          readOnly={props.disabled}
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
    <Page faviconSrc="/spelling-bee-favicon.ico" title={TITLE}>
      <$Main>
        <Page.Title icon="spelling-bee">{TITLE}</Page.Title>
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
    </Page>
  );
}

export default Home;
