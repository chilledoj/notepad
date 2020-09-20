import React, { FC, ReactNode } from 'react';
import { Tabs } from 'antd';
import { useLocalStorageState } from 'ahooks';

const { TabPane } = Tabs;

const fullHeight = {
  height: '100%',
  minHeight: '90%',
  marginBottom: 64,
};

type TabsProps = {
  favs: ReactNode;
  notes: ReactNode;
};

const TabLayout: FC<TabsProps> = ({ favs, notes }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useLocalStorageState<string>('NP_TAB', 'favs');
  return (
    <Tabs
      defaultActiveKey="favs"
      size="large"
      style={{ ...fullHeight }}
      type="card"
      activeKey={selectedTab}
      onTabClick={(key) => {
        setSelectedTab(key);
      }}
    >
      <TabPane tab="Favourites" key="favs" style={fullHeight}>
        {favs}
      </TabPane>
      <TabPane tab="Notes" key="notes">
        {notes}
      </TabPane>
    </Tabs>
  );
};

export default TabLayout;
