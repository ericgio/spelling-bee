import { addDays, format, parseISO } from 'date-fns';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import Tile from '../components/Tile';
import Title from '../components/Title';
import Spinner from '../components/Spinner';

const MAX_DATE = format(addDays(new Date(), -1), 'yyyy-MM-dd');
const MIN_DATE = '2021-06-19';
const TITLE = 'Wordle Solutions';

interface WordleData {
  days_since_launch: number;
  editor: string;
  id: number;
  print_date: string;
  solution: string;
}

const $Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const $Main = styled.main`
  max-width: 360px;
  margin: 0 auto;
  padding: 64px 0;
  text-align: center;
`;

const $Logo = styled.div`
  background-image: url('./wordle-icon.svg');
  height: 48px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 12px;
`;

const $DateInput = styled.input.attrs({ type: 'date' })`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.25rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  padding: 8px 12px;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.wordle.green};
    outline: 2px solid ${({ theme }) => theme.colors.wordle.green}40;
  }
`;

const $Metadata = styled.div`
  font-size: 1em;
  line-height: 1.25;
  letter-spacing: 0.005em;
  margin-bottom: 24px;

  & > :first-child {
    font-weight: 600;
  }
`;

const $Solution = styled.div`
  margin: 24px auto;
`;

const $Board = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const $Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

function getValidatedDate(e: React.ChangeEvent<HTMLInputElement>) {
  const { value } = e.target;

  if (value < MIN_DATE) {
    return MIN_DATE;
  }

  if (value > MAX_DATE) {
    return MAX_DATE;
  }

  return value;
}

function Wordle() {
  const [data, setData] = React.useState<WordleData | null>(null);
  const [date, setDate] = React.useState<string>(MAX_DATE);

  React.useEffect(() => {
    async function fetchSolution() {
      const result = await fetch(`/api/wordle?date=${date}`);
      const data = await result.json();
      setData(data);
    }

    fetchSolution();
  }, [date]);

  return (
    <$Page>
      <$Main>
        <Head>
          <title>{TITLE}</title>
          <link rel="shortcut icon" href="/wordle-favicon.ico" />
        </Head>
        <$Logo />
        <Title>{TITLE}</Title>
        <$DateInput
          onChange={(e) => setDate(getValidatedDate(e))}
          max={MAX_DATE}
          min={MIN_DATE}
          value={date}
        />
        {data ? (
          <>
            <$Solution>
              <$Row>
                {Array.from(Array(5).keys()).map((idx) => (
                  <Tile key={idx} state="correct">
                    {data.solution[idx]}
                  </Tile>
                ))}
              </$Row>
            </$Solution>
            <$Metadata>
              <div>
                Solution for{' '}
                {format(parseISO(data.print_date), 'MMMM dd, yyyy')}
              </div>
              <div>No. {data.days_since_launch}</div>
              <div>Edited by {data.editor}</div>
            </$Metadata>
          </>
        ) : (
          <$Solution>
            <Spinner />
          </$Solution>
        )}
      </$Main>
    </$Page>
  );
}

export default Wordle;
