import React, { InputHTMLAttributes, useCallback } from 'react';
import { Input } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  onChangeSearch(value?: string): void;
  onPressEnter?(): void;
  onCleanSearch?(): void;
}

const InputSearch: React.FC<InputProps> = ({
  value,
  name,
  onChangeSearch,
  onPressEnter,
  onCleanSearch,
}) => {
  const handleCleanSearch = useCallback(() => {
    if (typeof onCleanSearch === 'function') {
      onCleanSearch();
    }
  }, [onCleanSearch]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { value: inputValue } = event?.currentTarget;
      if (typeof onChangeSearch === 'function') {
        onChangeSearch(inputValue);
      }
    },
    [onChangeSearch],
  );

  const handlePressEnter = useCallback(() => {
    if (typeof onPressEnter === 'function') {
      onPressEnter();
    }
  }, [onPressEnter]);

  return (
    <Container>
      <Input
        size="small"
        prefix={<SearchOutlined />}
        suffix={
          value ? <CloseCircleFilled onClick={handleCleanSearch} /> : <span />
        }
        value={value}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
        type="text"
        id={name}
        name={name}
      />
    </Container>
  );
};

export default InputSearch;
