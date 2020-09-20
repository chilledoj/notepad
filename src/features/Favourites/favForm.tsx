import React, { FC } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import { useSelector } from 'react-redux';

import { getAllTags } from '../../store';

import { Fav } from '../../types/favs';

type FavFormProps = {
  fav?: Fav;
  onSubmit: {
    (fav: Fav): void;
  };
};

const FavForm: FC<FavFormProps> = ({ fav, onSubmit }: FavFormProps) => {
  const [form] = Form.useForm();
  const tags = useSelector(getAllTags);

  const onReset = (): void => {
    form.resetFields();
  };

  const handleSubmit = (): void => {
    const fval = form.getFieldsValue();
    onSubmit(fval as Fav);
  };

  return (
    <Form form={form} name="fav-form" layout="vertical" initialValues={fav} onFinish={handleSubmit}>
      <Form.Item name="id" label="id" hidden>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        required
        rules={[
          {
            required: true,
            message: 'Please input a title',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="subtitle" label="Subtitle">
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
        label="URL"
        required
        rules={[
          {
            required: true,
            message: 'Please input a url',
          },
          {
            type: 'url',
            message: 'Must be a valid url',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        rules={[
          {
            type: 'array',
            max: 4,
            message: 'Limit to 4 tags',
          },
        ]}
      >
        <Select mode="tags">
          {tags?.map((t) => (
            <Select.Option value={t.title} key={t.title}>
              {t.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FavForm;
