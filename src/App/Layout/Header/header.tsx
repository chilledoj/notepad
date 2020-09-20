import React, {FC} from 'react';
import { Typography, Row, Col, Grid, Space } from 'antd';

import UserButton from '../../../features/UserButton';
import Backup from '../../../features/Backup';

type HeaderProps = {
  children: React.ReactNode
}
const { useBreakpoint } = Grid;
const Header: FC<HeaderProps> = ({ children }: HeaderProps) => {
  const screens = useBreakpoint();
  const brand = (screens.xs)?'NP': 'Notepad'
  return (
    <Row justify="space-around">
      <Col>
        <Space align="center">
          <Typography.Title style={{ color: 'white' }} level={2}>
            {brand}
          </Typography.Title>
        </Space>
      </Col>
      <Col flex="auto">{children}</Col>
      <Col span={2}>
        <Space align="center">
          <Backup />
          <UserButton />
        </Space>
      </Col>
    </Row>
  );
};
export default Header;
