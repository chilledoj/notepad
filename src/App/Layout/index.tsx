import React, { FC, ReactElement, ReactNode } from 'react';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';

import { getSearchTerm, setSearchTerm } from '../../store/searchTerm';

import Header from './Header';
import Sides from './Sides';
import Tabs from './Tabs';
import SearchBox from '../../features/SearchBox';
import TagCloud from '../../features/TagCloud';

const { Content } = Layout;

type JustChildren = {
  children: ReactElement;
};

const LargeDesktop: FC<JustChildren> = ({ children }: JustChildren) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  return isDesktop ? children : null;
};
const SmallerDesktop: FC<JustChildren> = ({ children }: JustChildren) => {
  const isDesktop = useMediaQuery({ maxWidth: 1200 });
  return isDesktop ? children : null;
};

type LayoutProps = {
  favs: ReactNode;
  notes: ReactNode;
};

const ResponsiveLayout: FC<LayoutProps> = ({ favs, notes }: LayoutProps) => {
  const searchTerm = useSelector(getSearchTerm);
  const dispatch = useDispatch();
  const onSearch = (val: string): void => {
    dispatch(setSearchTerm(val));
  };
  return (
    <Layout style={{ minHeight: '100vh', height: '100vh' }}>
      <Layout.Header>
        <Header>
          <SearchBox val={searchTerm} onSearch={onSearch} />
        </Header>
      </Layout.Header>
      <Content style={{ minHeight: '100%', height: '100%' }}>
        <TagCloud />
        <LargeDesktop>
          <Sides left={favs} right={notes} />
        </LargeDesktop>
        <SmallerDesktop>
          <Tabs favs={favs} notes={notes} />
        </SmallerDesktop>
      </Content>
    </Layout>
  );
};

export default ResponsiveLayout;
