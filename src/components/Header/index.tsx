import React from 'react';
import InputSearch from '../InputSearch';

import { Container, HeaderContainer, SearchTitle } from './styles';

interface HeaderProps {
  onChangeSearch(value?: string): void;
  searchValue?: string;
  onPressEnter?(): void;
  onCleanSearch?(): void;
}

const Header: React.FC<HeaderProps> = ({
  onChangeSearch,
  onPressEnter,
  onCleanSearch,
  searchValue,
}) => {
  return (
    <Container>
      <HeaderContainer>
        <h3>mmartan</h3>
        <InputSearch
          name="search"
          placeholder="Buscar produto"
          value={searchValue}
          onChangeSearch={onChangeSearch}
          onPressEnter={onPressEnter}
          onCleanSearch={onCleanSearch}
        />
      </HeaderContainer>
      <SearchTitle>{searchValue || 'Produtos'}</SearchTitle>
    </Container>
  );
};

export default Header;
