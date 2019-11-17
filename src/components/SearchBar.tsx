import React, { useRef, useCallback, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 20px;
  height: 100%;
  outline: none;
`;

const Button = styled.button`
  height: 100%;
  border: none;
  background-image: linear-gradient(
    45deg,
    rgb(153, 51, 255) 0%,
    rgb(255, 102, 102) 50%,
    rgb(153, 51, 255) 100%
  );
  cursor: pointer;
  width: 50px;
  color: white;
  font-size: 20px;
`;

interface SearchBarProps {
  search: string;
  onSearch: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search = '', onSearch, onSubmit }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onSearch(value);
    },
    [onSearch]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <SearchContainer>
      <Input
        placeholder="Search..."
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
      ></Input>
      <Button onClick={onSubmit}>Go</Button>
    </SearchContainer>
  );
};

export default SearchBar;
