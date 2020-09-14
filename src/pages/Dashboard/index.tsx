import React, { useState, useCallback, useEffect } from 'react';
import { Pagination } from 'antd';
import formatValue from '../../utils/formatValue';
import Header from '../../components/Header';
import { DELAY_SEARCH } from '../../constants/grid';
import api from '../../services/api';
import useDebounce from '../../hooks/useDebounce';

import {
  Container,
  ProductsContainer,
  MetaTitle,
  ProductTableList,
  OriginalPriceText,
  DiscoutedPrice,
  PaginationContainer,
} from './styles';

interface ProductImage {
  id: number;
  url: string;
}

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  discount?: number;
  images: ProductImage[];
}

interface MetaResponse {
  total: number;
  per_page: number;
  current_page?: number | null;
}

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [fetching, setFetching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<MetaResponse>({} as MetaResponse);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const debouncedSearchTerm = useDebounce(searchValue, DELAY_SEARCH);

  const loadItems = useCallback(
    async (params?: object) => {
      setFetching(true);

      const { data } = await api.get('/products', {
        params: {
          ...pagination,
          ...params,
        },
      });

      setProducts(data.data);
      setMeta(data.meta);
      setFetching(false);
    },
    [pagination],
  );

  useEffect(() => {
    loadItems({
      search: debouncedSearchTerm,
      page: 1,
    });
  }, [debouncedSearchTerm, loadItems]);

  const handleChangeSearch = useCallback(value => {
    setSearchValue(value);
  }, []);

  const handleCleanSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleChangePage = useCallback(
    pageNumber => {
      loadItems({ page: pageNumber, search: debouncedSearchTerm });
    },
    [loadItems, debouncedSearchTerm],
  );

  const handlePageSizeChange = useCallback(
    (current, pageSize) => {
      const newPagination = { page: 1, limit: pageSize };
      setPagination(newPagination);
      loadItems(newPagination);
    },
    [loadItems],
  );

  return (
    <Container>
      <Header
        onChangeSearch={handleChangeSearch}
        onCleanSearch={handleCleanSearch}
        searchValue={searchValue}
      />
      <ProductsContainer>
        {fetching && <strong>Carregando...</strong>}
        {meta?.total != null && (
          <MetaTitle>{`${meta?.total} PRODUTOS ENCONTRADOS`}</MetaTitle>
        )}
        <ProductTableList>
          {products.map(product => (
            <tr key={product.id}>
              <td width="370">
                {product?.images.length > 0 &&
                  product.images.map(image => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={`${product.title} img ${image.id}`}
                    />
                  ))}
              </td>
              <td>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
              </td>
              <td width="200" className="column--price">
                <OriginalPriceText>
                  {formatValue(product.price)}
                </OriginalPriceText>
                por
                {product.discount && (
                  <DiscoutedPrice>
                    {formatValue(
                      product.price - (product.price * product.discount) / 100,
                    )}
                  </DiscoutedPrice>
                )}
              </td>
            </tr>
          ))}
        </ProductTableList>
        <PaginationContainer>
          <Pagination
            defaultCurrent={meta.current_page ?? 1}
            total={meta.total}
            current={meta.current_page ?? 1}
            pageSize={pagination.limit}
            onShowSizeChange={handlePageSizeChange}
            onChange={handleChangePage}
            showSizeChanger
          />
        </PaginationContainer>
      </ProductsContainer>
    </Container>
  );
};

export default Dashboard;
