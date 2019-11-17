import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import GifList from './GifList';
import { searchGifs, Gif } from '../api';

const Title = styled.h1``;

const Search: React.FC = () => {
  const { query = '' } = useParams();
  const history = useHistory();
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(query);
  const [debouncedSearch, setDebouncedSearch] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  const getMoreGifs = useCallback(async () => {
    setIsLoading(true);
    const { data, pagination, meta } = await searchGifs(search, offset);
    if (meta && meta.status === 200 && data && pagination && pagination.count) {
      setGifs(gifs.concat(data));
      setOffset(pagination.offset + pagination.count);
      setTotal(pagination.total_count);
    }
    setIsLoading(false);
  }, [search, offset, gifs]);

  const onSubmit = useCallback(() => {
    history.push(`/search/${search}`);
  }, [search, history]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    return history.listen(location => {
      const query = (location.pathname.match(/\/search\/(.*)/) || [])[1];
      setSearch(query);
      setDebouncedSearch(query);
    });
  }, [history]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, pagination, meta } = await searchGifs(debouncedSearch, 0);
      if (meta && meta.status === 200 && data && pagination && pagination.count) {
        setGifs(data);
        setOffset(pagination.offset + pagination.count);
        setTotal(pagination.total_count);
      }
      setIsLoading(false);
    })();
  }, [debouncedSearch]);

  return (
    <>
      <Title>Search GIFs</Title>
      <SearchBar search={search} onSearch={setSearch} onSubmit={onSubmit} />
      <GifList gifs={gifs} loadMore={getMoreGifs} hasMore={offset < total} isLoading={isLoading} />
    </>
  );
};

export default Search;
