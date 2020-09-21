import React, { FC, ReactNode, useState } from 'react';
import { Layout, Typography, Popconfirm, Space, Button, Drawer, List } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, deleteFavourite, updateFavourite, getFavCollection } from '../../store/favs';
import { getSearchTerm } from '../../store/searchTerm';

import { SimpleTagList } from '../TagCloud';

import { Fav } from '../../types/favs';

import FavForm from './favForm';

const { Content } = Layout;

const searchFav = (f: Fav, searchTerm = ''): boolean => {
  if (searchTerm === '') return true;
  const found = f.tags?.map((t) => t.toLocaleLowerCase()).filter((t) => t.includes(searchTerm));
  return (
    f.title.toLocaleLowerCase().includes(searchTerm) ||
    f.subtitle?.toLocaleLowerCase().includes(searchTerm) ||
    f.url.toLocaleLowerCase().includes(searchTerm) ||
    (!!found && found.length > 0)
  );
};

const Favourites: FC = () => {
  const favs = useSelector(getFavCollection);

  const searchTerm = useSelector(getSearchTerm);

  const [showDrawer, setShowDrawer] = useState(false);
  const [currFav, setCurrFav] = useState<Fav | null>(null);
  const dispatch = useDispatch();

  const filtFavs = favs.filter((f) => searchFav(f, searchTerm));

  const onCloseDrawer = (): void => {
    setShowDrawer(false);
    setCurrFav(null);
  };

  const onSelectFav = (fav: Fav): void => {
    setCurrFav(fav);
    setShowDrawer(true);
  };

  const onDeleteFav = (id: string): void => {
    // console.log('Deleting Favourite');
    dispatch(deleteFavourite(id));
  };

  const onSubmit = (val: Fav): void => {
    if (currFav === null && !val.id) {
      // console.log('Creating Favourite');
      dispatch(addFavourite(val));
    } else {
      // console.log('Updating Favourite');
      dispatch(updateFavourite(val));
    }

    setShowDrawer(false);
    setCurrFav(null);
  };

  return (
    <Layout style={{ minHeight: '100%', padding: '1rem' }}>
      <Content>
        <Typography.Title type="secondary">Favourites</Typography.Title>
        <div style={{ backgroundColor: 'white' }}>
          {/* <SearchBox val={searchTerm} onSearch={setSearch} /> */}
          <Button
            block
            icon={<PlusOutlined />}
            type="primary"
            onClick={(): void => {
              setShowDrawer(true);
            }}
          >
            Add
          </Button>
          <Space
            direction="horizontal"
            align="end"
            style={{ width: '100%', justifyContent: 'flex-end' }}
          >
            <Typography.Text>
              displaying {filtFavs.length} of {favs.length}
            </Typography.Text>
          </Space>

          <List
            itemLayout="horizontal"
            size="large"
            dataSource={filtFavs}
            renderItem={(fav: Fav): ReactNode => (
              <List.Item
                key={fav.id}
                actions={[
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={(): void => {
                      onSelectFav(fav);
                    }}
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    icon={<DeleteOutlined />}
                    onConfirm={(): void => {
                      onDeleteFav(fav.id);
                    }}
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a href={fav.url} target="_blank" rel="noreferrer">
                      {fav.title}
                    </a>
                  }
                  description={fav.subtitle}
                />
                <Button type="link" href={fav.url} target="_blank" rel="noreferrer" style={{ whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', }}>
                  {fav.url}
                </Button>
                <SimpleTagList tags={fav.tags} vertical />
              </List.Item>
            )}
          />
        </div>
        <Drawer
          title={currFav ? 'Edit Favourite' : 'Add Favourite'}
          width="50%"
          onClose={onCloseDrawer}
          visible={showDrawer}
          placement="left"
          destroyOnClose
        >
          {currFav ? (
            <FavForm onSubmit={onSubmit} fav={currFav} />
          ) : (
            <FavForm onSubmit={onSubmit} />
          )}
        </Drawer>
      </Content>
    </Layout>
  );
};
export default Favourites;
