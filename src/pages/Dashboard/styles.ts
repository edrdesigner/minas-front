import styled from 'styled-components';

export const Container = styled.div``;

export const ProductsContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

export const MetaTitle = styled.div`
  display: inline-flex;
  border-bottom: 3px solid #dfbe7f;
  margin-bottom: 24px;
  color: #666666;
  font-size: 16px;
`;

export const ProductTableList = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 12px;

  tr + tr {
    border-top: 1px solid #ccc;
  }

  td {
    padding: 5px;
    font-size: 14px;
  }

  strong {
    color: #000;
    font-size: 18px;
  }

  p {
    color: #666666;
    font-size: 14px;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  td.column--price {
    text-align: right;
    padding-right: 16px;
  }

  img + img {
    margin-left: 10px;
  }
`;

export const OriginalPriceText = styled.span`
  font-size: 14px;
  color: #666;
  text-decoration: line-through;
  margin-right: 5px;
`;

export const DiscoutedPrice = styled.span`
  font-size: 14px;
  color: #000;
  margin-left: 5px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding-bottom: 18px;
  justify-content: flex-end;

  .ant-pagination {
    display: flex;
    flex-grow: 1;
  }

  .ant-pagination-prev {
    order: 1;
    flex-shrink: 0;
  }

  .ant-pagination-item {
    order: 2;
    flex-shrink: 0;
  }

  .ant-pagination-next {
    order: 3;
    flex-shrink: 0;
  }

  .ant-pagination-options {
    order: 0;
    flex-grow: 1;
    margin-right: 0;
    margin-left: 0;
  }
`;
