import React from 'react';
import styled from 'styled-components';

const Rectangle = styled.div`
  background-color: #222;
`;

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height }) => (
  <Rectangle style={{ width: `${width}px`, height: `${height}px` }}>
    <img src={src} alt={alt} />
  </Rectangle>
);

export default LazyImage;
