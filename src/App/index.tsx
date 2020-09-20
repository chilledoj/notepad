import React, { FC } from 'react';
import { Provider } from 'react-redux';
import AppLayout from './Layout';

import './app.less';

import Favourites from '../features/Favourites';
import Notes from '../features/Notes';
import store from '../store';

const App: FC = () => (
  <Provider store={store}>
    <AppLayout favs={<Favourites />} notes={<Notes />} />
  </Provider>
);

export default App;
