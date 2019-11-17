import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { getGifById, Gif } from '../api';
import LazyImage from './LazyImage';

const Title = styled.h1`
  font-weight: bold;
`;

const Details: React.FC = () => {
  const { gifId } = useParams();
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState<Gif | null>(null);

  const getGif = useCallback(async () => {
    if (gifId) {
      setLoading(true);
      const { data, meta } = await getGifById(gifId);
      if (meta && meta.status === 200 && data) {
        setGif(data);
      }
      setLoading(false);
    }
  }, [gifId]);

  useEffect(() => {
    getGif();
  }, [getGif]);

  return (
    <>
      <Title>{loading ? '' : gif && gif.title}</Title>
      {gif ? (
        <LazyImage
          src={gif.images.original.url}
          width={gif.images.original.width}
          height={gif.images.original.height}
          alt={gif.title}
        />
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Details;
