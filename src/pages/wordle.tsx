import { format, parseISO } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import * as React from 'react';
import styled from 'styled-components';

type TileState = 'empty' | 'tbd' | 'absent' | 'present' | 'correct';

interface WordleData {
  days_since_launch: number;
  editor: string;
  id: number;
  print_date: string;
  solution: string;
}

const $Main = styled.main`
  max-width: 360px;
  margin: 32px auto;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    max-width: 640px;
  }
`;

const $Logo = styled.div`
  background-image: url('./wordle-icon.svg');
  height: 48px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 12px;
`;

const $Title = styled.h1`
  font-family: 'nyt-karnakcondensed', Arial, Helvetica, sans-serif;
  font-size: 42px;
  margin: 0 0 16px 0;
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
  margin: 0 auto;
  width: 360px;
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

const $Tile = styled.div<{ $state: TileState }>`
  aspect-ratio: 1;
  box-sizing: border-box;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: 'nyt-franklin';
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  width: 100%;

  ${({ $state, theme }) => {
    switch ($state) {
      case 'empty':
        return `
          border: 2px solid ${theme.colors.borderColor};
        `;
      case 'tbd':
        return `
          border: 2px solid #878a8c;
          color: #000;
        `;
      case 'absent':
        return `
          background-color: #787c7e;
        `;
      case 'present':
        return `
          background-color: #c9b458;
        `;
      case 'correct':
        return `
          background-color: #6aaa64;
        `;
    }
  }}
`;

function Wordle() {
  const { asPath, pathname } = useRouter();
  const [data, setData] = React.useState<WordleData | null>(null);

  let date = '2023-04-21';
  const queryString = asPath.split('?').at(-1);
  if (queryString && queryString !== pathname) {
    date = qs.parse(queryString).d as string;
  }

  React.useEffect(() => {
    fetch(`/api/wordle?date=${date}`)
      .then((results) => results.json())
      .then((data) => setData(data));
  }, []);

  return (
    <$Main>
      <Head>
        <title>Wordle Solver</title>
      </Head>
      <$Logo />
      <$Title>Wordle Solver</$Title>
      {data && (
        <>
          <$Metadata>
            <div>
              Solution for {format(parseISO(data.print_date), 'MMMM dd, yyyy')}
            </div>
            <div>No. {data.days_since_launch}</div>
            <div>Edited by {data.editor}</div>
          </$Metadata>
          <$Solution>
            <$Row>
              {Array.from(Array(5).keys()).map((idx) => (
                <$Tile key={idx} $state="correct">
                  {data.solution[idx]}
                </$Tile>
              ))}
            </$Row>
          </$Solution>
        </>
      )}
    </$Main>
  );
}

export default Wordle;
