import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import Icon from '@/components/Icon';

const $List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const $ListItemLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 24px;
  text-align: center;
  text-decoration: none;
`;

const $Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-size: 28px;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 36px;
  }
`;

interface ListItemProps {
  href: string;
  name: string;
  src: string;
}

function ListItem({ href, name, src }: ListItemProps) {
  return (
    <li>
      <$ListItemLink href={href}>
        <Icon size={36} src={src} />
        <$Title>{name}</$Title>
      </$ListItemLink>
    </li>
  );
}

function Home() {
  return (
    <Page faviconSrc="/wordle-favicon.ico" title="WordGames">
      <Page.Main>
        <$List>
          <ListItem
            href="/spelling-bee"
            name="Spelling Bee Solver"
            src="/spelling-bee.svg"
          />
          <ListItem href="/wordle" name="Wordle Solutions" src="/wordle.svg" />
        </$List>
      </Page.Main>
    </Page>
  );
}

export default Home;
