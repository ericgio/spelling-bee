import axios from 'axios';
import { addDays, format, parseISO } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';

import Icon from '../components/Icon';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import Tile from '../components/Tile';
import Title from '../components/Title';

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

const $DateInput = styled.input.attrs({ type: 'date' })`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.black};
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.wordle.green};
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.wordle.green}40;
    outline: 0;
  }
`;

const $Metadata = styled.div`
  font-size: 1em;
  line-height: 1.25;
  letter-spacing: 0.005em;
  margin-bottom: 1.5rem;

  & > :first-child {
    font-weight: 600;
  }
`;

const $Solution = styled.div`
  margin: 1.5rem 0;
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

function getPuzzleNumber({ days_since_launch, id }: WordleData) {
  if (!days_since_launch) {
    return id;
  }

  return id - days_since_launch === 1 ? id : days_since_launch;
}

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
      const { data } = await axios.get(`/api/wordle?date=${date}`);
      setData(data);
    }

    fetchSolution();
  }, [date]);

  return (
    <Page faviconSrc="/wordle-favicon.ico" title={TITLE}>
      <Page.Main>
        <Icon src="/wordle.svg" />
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
              <div>No. {getPuzzleNumber(data)}</div>
              <div>Edited by {data.editor}</div>
            </$Metadata>
          </>
        ) : (
          <$Solution>
            <Spinner />
          </$Solution>
        )}
      </Page.Main>
    </Page>
  );
}

export default Wordle;
