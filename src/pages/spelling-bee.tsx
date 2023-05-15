import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import HexInput from '../components/HexInput';
import Page from '../components/Page';

import { dedupeString, getSortedSpellingBeeResults, isPangram } from '../utils';

import { useMultiInput, UseMultiInputOptions } from '../hooks';

const LETTER_COUNT = 7;
const TITLE = 'Spelling Bee Solver';

const $Main = styled(Page.Main)`
  max-width: 360px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    max-width: 640px !important;
  }
`;

const $InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin: 1rem 0 2rem;
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

interface MultiInputProps extends Omit<UseMultiInputOptions, 'count'> {
  disabled?: boolean;
}

function MultiInput({ disabled, ...props }: MultiInputProps) {
  const containerRef = useMultiInput({
    ...props,
    count: LETTER_COUNT,
  });

  return (
    <$InputContainer ref={containerRef}>
      {Array.from(Array(LETTER_COUNT).keys()).map((idx) => (
        <HexInput
          key={idx}
          maxLength={1}
          onChange={() => {
            // No-op to avoid React warning.
          }}
          readOnly={disabled}
          required={idx === 0}
          value={props.value[idx] || ''}
        />
      ))}
    </$InputContainer>
  );
}

function SpellingBee() {
  const [showResults, setShowResults] = React.useState(false);
  const [value, setValue] = React.useState<string>('');

  const onChange = React.useCallback(
    (value: string) => {
      if (!showResults) {
        setValue(dedupeString(value));
      }
    },
    [showResults]
  );

  function onSubmit() {
    setShowResults(true);
  }

  function onReset() {
    setShowResults(false);
    setValue('');
  }

  const results = showResults ? getSortedSpellingBeeResults(value) : [];

  return (
    <Page faviconSrc="/spelling-bee-favicon.ico" title={TITLE}>
      <$Main>
        <Page.Title icon="spelling-bee">{TITLE}</Page.Title>
        <p>Enter today{'’'}s letters</p>
        <MultiInput
          disabled={!!results.length}
          onChange={onChange}
          value={value}
        />
        <$ButtonGroup>
          <Button
            $primary
            disabled={value.length !== LETTER_COUNT}
            onClick={onSubmit}>
            Solve
          </Button>
          <Button disabled={!value.length} onClick={onReset}>
            Reset
          </Button>
        </$ButtonGroup>
        {!!results.length && (
          <$Results>
            <p>{results.length} words</p>
            <$List>
              {results.map((result) => (
                <$Item $isPangram={isPangram(value, result)} key={result}>
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

export default SpellingBee;
