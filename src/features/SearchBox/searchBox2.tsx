import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
import { useThrottleEffect } from 'ahooks';
import { SelectValue } from 'antd/lib/select';

import { useSelector } from 'react-redux';
import { getAllTags } from '../../store';

const { Option } = Select;

interface SearchBoxProps {
  val: string;
  onSearch(value: string): void;
}

// eslint-disable-next-line react/prop-types
const SearchBox: FC<SearchBoxProps> = ({ val, onSearch }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(val);
  const tags = useSelector(getAllTags);

  useThrottleEffect(
    () => {
      onSearch(searchTerm);
    },
    [searchTerm],
    { wait: 1000 },
  );
  useEffect(() => {
    setSearchTerm(val);
  }, [val]);

  return (
    <div style={{ marginBottom: '1rem', padding: '0 5px' }}>
      <Select
        allowClear
        showSearch
        style={{ width: '100%' }}
        showArrow={false}
        placeholder="Search..."
        value={searchTerm}
        defaultValue={val}
        onChange={(value: SelectValue): void => {
          // const ip = e.target as HTMLInputElement;
          console.log('Select value:', value);
          setSearchTerm(value?.toString());
        }}
        onKeyUp={(e: React.KeyboardEvent): void => {
          if (e.key === 'Escape') {
            // console.log("Clear");
            setSearchTerm('');
          }
        }}
        onSearch={(value) => {
          console.log();
          onSearch(value);
        }}
      >
        {tags?.map((tag) => (
          <Option key={tag.title} value={tag?.title.toLowerCase()}>
            {tag?.title.toLowerCase()}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchBox;
