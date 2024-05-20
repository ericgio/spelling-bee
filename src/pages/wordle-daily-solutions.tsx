import axios from 'axios';
import { addDays, format, parseISO } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';

import Input from '../components/Input';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import Tile from '../components/Tile';

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

function WordleSolutions() {
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
        <Page.Title icon="wordle">{TITLE}</Page.Title>
        <Input
          onChange={(e) => setDate(getValidatedDate(e))}
          max={MAX_DATE}
          min={MIN_DATE}
          type="date"
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

export default WordleSolutions;
