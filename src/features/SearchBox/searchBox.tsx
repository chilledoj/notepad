import React, { FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useThrottleEffect } from 'ahooks';

const { Search } = Input;

interface SearchBoxProps {
  val: string;
  onSearch(value: string): void;
}

// eslint-disable-next-line react/prop-types
const SearchBox: FC<SearchBoxProps> = ({ val, onSearch }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(val);

  useThrottleEffect(
    () => {
      onSearch(searchTerm);
    },
    [searchTerm],
    { wait: 1000 },
  );
  useEffect(()=>{
    setSearchTerm(val)
  },[val])

  return (
    <div style={{ marginBottom: '1rem', padding: '0 5px' }}>
      <Search
        allowClear
        width="100%"
        placeholder="Search..."
        value={searchTerm}
        defaultValue={val}
        onChange={(e: React.SyntheticEvent): void => {
          const ip = e.target as HTMLInputElement;
          setSearchTerm(ip.value);
        }}
        onKeyUp={(e: React.KeyboardEvent): void => {
          if (e.key === 'Escape') {
            // console.log("Clear");
            setSearchTerm('');
          }
        }}
        onSearch={(value) => {
          onSearch(value);
        }}
      />
    </div>
  );
};

export default SearchBox;
