import * as React from 'react';
import styled from 'styled-components';

const $Icon = styled.div<{ $size: number; $src: string }>`
  aspect-ratio: 1;
  background-image: url(${({ $src }) => $src});
  height: ${({ $size }) => $size}px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 4px;
`;

interface IconProps {
  src: string;
  size?: number;
}

function Icon({ size = 48, src }: IconProps) {
  return <$Icon $size={size} $src={src} />;
}

export default Icon;
