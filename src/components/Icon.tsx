import * as React from 'react';
import styled from 'styled-components';

const $Icon = styled.div<{ $size: string; $src: string }>`
  aspect-ratio: 1;
  background-image: url(${({ $src }) => $src});
  height: ${({ $size }) => $size};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

interface IconProps {
  src: string;
  size?: string;
}

function Icon({ size = '3rem', src }: IconProps) {
  return <$Icon $size={size} $src={src} />;
}

export default Icon;
