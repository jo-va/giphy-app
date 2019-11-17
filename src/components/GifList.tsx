import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Masonry, { MasonryOptions } from 'react-masonry-component';
import { useScrollYPosition } from 'react-use-scroll-position';
import LazyImage from './LazyImage';
import useDebounce from '../hooks/useDebounce';
import { Gif } from '../api';

const GifPreviewLink = styled(Link)`
  margin-bottom: 5px;
`;

const Message = styled.div`
  padding: 20px;
`;

const masonryOptions: MasonryOptions = {
  fitWidth: true,
  columnWidth: 200,
  gutter: 5,
  transitionDuration: 0,
  resize: true,
};

interface GifListProps {
  gifs: Gif[];
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

const GifList: React.FC<GifListProps> = ({ gifs, hasMore, isLoading, loadMore }) => {
  const scrollY = useScrollYPosition();
  const debouncedScrollY = useDebounce(scrollY, 100);

  useEffect(() => {
    const scrolledToBottom =
      window.innerHeight + debouncedScrollY >= document.documentElement.offsetHeight - 50;

    if (!isLoading && hasMore && scrolledToBottom) {
      loadMore();
    }
  }, [loadMore, debouncedScrollY, isLoading, hasMore]);

  if (!isLoading && (!gifs || gifs.length === 0)) {
    return <div>No Results</div>;
  }

  return (
    <>
      <Masonry
        className={'grid'}
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {gifs.map((gif, i) => (
          <GifPreviewLink key={i} to={`/gifs/${gif.id}`}>
            <LazyImage
              src={gif.images.fixed_width.url}
              width={gif.images.fixed_width.width}
              height={gif.images.fixed_width.height}
              alt={gif.title}
            ></LazyImage>
          </GifPreviewLink>
        ))}
      </Masonry>
      <Message>
        {isLoading || hasMore ? 'Loading...' : null}
        {!isLoading && !hasMore ? 'End of results' : null}
      </Message>
    </>
  );
};

export default GifList;
