import React, { FC, ReactNode } from 'react';
import { Button, Card, Col, Divider, Form, Input, Row, Select } from 'antd';
import { useSelector } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';

import { format } from '../Markdown';

import 'react-markdown-editor-lite/lib/index.css';

import { getAllTags } from '../../store';

import { Note } from '../../types/notes';

type NoteFormProps = {
  note: Note | null;
  onSubmit: {
    (note: Note): void;
  };
  cancelEdit: ReactNode;
};

const NoteForm: FC<NoteFormProps> = ({ note, onSubmit, cancelEdit }: NoteFormProps) => {
  const [form] = Form.useForm();
  const tags = useSelector(getAllTags);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = () => {
    const nval = form.getFieldsValue();
    onSubmit(nval as Note);
  };

  return (
    <Form
      form={form}
      name="fav-form"
      layout="horizontal"
      initialValues={{
        id: '',
        title: '',
        rawData: '',
        tags: [],
        ...note,
      }}
      onFinish={handleSubmit}
    >
      <Card
        title={
          <Row>
            <Col span={18}>
              <Form.Item
                name="title"
                // label="Title"
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
            </Col>
            <Col span={6}>
              <Form.Item name="id" hidden>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        }
        extra={[cancelEdit]}
        actions={[
          <Button type="primary" htmlType="submit">
            Submit
          </Button>,
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>,
        ]}
      >
        <Form.Item name="tags" label="Tags">
          <Select mode="tags">
            {tags?.map((t) => (
              <Select.Option value={t.title} key={t.title}>
                {t.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item name="rawData" noStyle getValueFromEvent={(e): string => e.text}>
          <MdEditor renderHTML={format} style={{ height: '500px' }} />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default NoteForm;
