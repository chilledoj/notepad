import React, { FC, ReactNode } from 'react';
import { Badge, Card, Col, List, Row, Space, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/searchTerm';
import { getAllTags } from '../../store';

type SimpleTagListProps = {
  tags: string[];
  vertical?: boolean;
};

export const SimpleTagList: FC<SimpleTagListProps> = ({
  tags,
  vertical = false,
}: SimpleTagListProps) => {
  if (vertical) {
    return (
      <List
        size="small"
        split={false}
        dataSource={tags}
        renderItem={(tag): ReactNode => (
          <List.Item>
            <Tag>{tag}</Tag>
          </List.Item>
        )}
      />
    );
  }
  return (
    <Space>
      {tags?.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Space>
  );
};

const TagCloudCard: FC = () => {
  const tags = useSelector(getAllTags);
  const dispatch = useDispatch();

  const setSearch = (val: string): void => {
    dispatch(setSearchTerm(val));
  };

  return (
    <div>
      <Card title="Tags">
        <Row gutter={[12, 24]}>
          {tags?.map((tag) => (
            <Col key={tag.title}>
              <Badge count={tag.num}>
                <Tag
                  onClick={(): void => {
                    setSearch(tag.title.toLocaleLowerCase());
                  }}
                >
                  {tag.title}
                </Tag>
              </Badge>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default TagCloudCard;
