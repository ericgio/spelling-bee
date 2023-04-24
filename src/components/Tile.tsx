import styled from 'styled-components';

export type TileState = 'empty' | 'tbd' | 'absent' | 'present' | 'correct';

const $Tile = styled.div<{ state: TileState }>`
  aspect-ratio: 1;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  width: 100%;

  ${({ state, theme }) => {
    switch (state) {
      case 'empty':
        return `
          border: 2px solid ${theme.colors.borderColor};
        `;
      case 'tbd':
        return `
          border: 2px solid ${theme.colors.wordle.tbd};
          color: ${theme.colors.black};
        `;
      case 'absent':
        return `
          background-color: ${theme.colors.wordle.absent};
        `;
      case 'present':
        return `
          background-color: ${theme.colors.wordle.present};
        `;
      case 'correct':
        return `
          background-color: ${theme.colors.wordle.correct};
        `;
    }
  }}
`;

export default $Tile;
