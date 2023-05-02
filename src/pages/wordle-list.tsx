import * as React from 'react';
import styled from 'styled-components';

import Input from '../components/Input';
import Page from '../components/Page';
import Tile from '../components/Tile';

import solutions from '../data/wordle-solutions.json';
import list from '../data/wordle.json';

const TITLE = 'Wordle Helper';

const $Solution = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 1.5rem 0;
`;

const $Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

function Wordle() {
  const [value, setValue] = React.useState<string>('');
  const [excludes, setExcludes] = React.useState<string>('');

  const results = list.filter((word) => {
    // Word contains all the letters
    return (
      value.split('').every((ch) => word.includes(ch)) &&
      excludes.split('').every((ch) => !word.includes(ch))
    );
  });

  return (
    <Page faviconSrc="/wordle-favicon.ico" title={TITLE}>
      <Page.Main>
        <Page.Title icon="wordle">{TITLE}</Page.Title>
        <label>Includes</label>
        <Input
          maxLength={5}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
        />
        <label>Excludes</label>
        <Input
          maxLength={26}
          onChange={(e) => setExcludes(e.target.value)}
          value={excludes}
          type="text"
        />
        <$Solution>
          <TileInput />
          <TileInput />
          <TileInput />
          <TileInput />
          <TileInput />
        </$Solution>
        {value.length > 1 && (
          <$Solution>
            <p>{results.length} results</p>
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

export default Wordle;
