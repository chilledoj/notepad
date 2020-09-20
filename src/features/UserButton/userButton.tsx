import React, { FC, useState } from 'react';
import { Button, Form, Modal, Input, Avatar } from 'antd';
import Gravatar from 'react-gravatar';
import { UserOutlined } from '@ant-design/icons';
import { useLocalStorageState } from 'ahooks';

const UserButton: FC = () => {
  const [useremail, setUseremail] = useLocalStorageState('user-email', '');
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const handleShowModal = (): void => {
    setShowModal(true);
  };

  const handleCancel = (): void => {
    setShowModal(false);
  };
  const handleOk = (): void => {
    const { tempEmail } = form.getFieldsValue();
    setUseremail(tempEmail);
    setShowModal(false);
  };

  return (
    <>
      {useremail ? (
        <Avatar size="large" icon={<Gravatar email={useremail} onClick={handleShowModal} />} />
      ) : (
        <Button icon={<UserOutlined />} onClick={handleShowModal}>
          Set User
        </Button>
      )}
      <Modal title="Set user email" visible={showModal} onCancel={handleCancel} onOk={handleOk}>
        <Form form={form} initialValues={{ tempEmail: useremail }}>
          <Form.Item
            name="tempEmail"
            rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserButton;
