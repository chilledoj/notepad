import React, { FC, ReactNode } from 'react';
import SplitPane from 'react-split-pane';
import { Tabs } from 'antd';
import './sides.less';

const { TabPane } = Tabs;

const overflow = {
  overflow: 'auto'
}

type SidesProps = {
  left: ReactNode;
  right: ReactNode;
};

const Sides: FC<SidesProps> = ({ left, right }: SidesProps) => {
  return (
    <SplitPane split="vertical" defaultSize="40%" primary="first" style={overflow}>
      <div>
        <Tabs defaultActiveKey="favs" size="large" style={{ marginBottom: 32 }} type="card">
          <TabPane tab="Favourites" key="favs">
            {left}
          </TabPane>
        </Tabs>
      </div>
      <div >
        <Tabs defaultActiveKey="favs" size="large" style={{ marginBottom: 32 }} type="card">
          <TabPane tab="Notes" key="notes">
            {right}
          </TabPane>
        </Tabs>
      </div>
    </SplitPane>
  );
};

export default Sides;
