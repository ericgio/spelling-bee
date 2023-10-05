import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import Icon from '../components/Icon';

const $List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const $ListItemLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
`;

const $Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-size: 1.1875rem;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 1.75rem;
  }
`;

const $Description = styled.p`
  color: ${({ theme }) => theme.colors.greyText};
  line-height: 20px;
  margin: 0;
`;

interface ListItemProps {
  description?: string;
  href: string;
  name: string;
  src: string;
}

function GameCard({ description, href, name, src }: ListItemProps) {
  return (
    <li>
      <$ListItemLink href={href}>
        <Icon src={src} />
        <$Title>{name}</$Title>
        {description && <$Description>{description}</$Description>}
      </$ListItemLink>
    </li>
  );
}

function Home() {
  return (
    <Page faviconSrc="/wordle-favicon.ico" title="WordGames">
      <Page.Main>
        <$List>
          <GameCard
            description="Generate today’s answers."
            href="/spelling-bee"
            name="Spelling Bee Solver"
            src="/spelling-bee.svg"
          />
          <GameCard
            description="Every Wordle solution."
            href="/wordle-solutions"
            name="Wordle Solutions"
            src="/wordle.svg"
          />
          <GameCard
            description="Get a list of possible Wordle solutions."
            href="/wordle-helper"
            name="Wordle Helper"
            src="/wordle.svg"
          />
        </$List>
      </Page.Main>
    </Page>
  );
}

export default Home;
