import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import { searchTermSlice } from './searchTerm';
import { favSlice, favInit, getFavTagCollection } from './favs';
import { noteSlice, noteInit, getNoteTagCollection } from './notes';

import { Tag } from '../types/favs';

const lsKey = 'NOTEPAD_DATA';
const savedData = JSON.parse(localStorage.getItem(lsKey) || '{}');

const storeInit = {
  favs: favInit,
  notes: noteInit,
  search: {
    searchText: '',
  },
  ...savedData,
};

const store = configureStore({
  reducer: {
    favs: favSlice.reducer,
    notes: noteSlice.reducer,
    search: searchTermSlice.reducer,
  },
  preloadedState: storeInit,
});

// store.subscribe(listener(store))
store.subscribe(() => {
  localStorage.setItem(lsKey, JSON.stringify(store.getState()));
});

export default store;

export const getAllTags = (stor: typeof storeInit): Tag[] => {
  const favs = getFavTagCollection(stor);
  const notes = getNoteTagCollection(stor);
  const tags = new Map();

  [favs, notes].forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (!tags.has(arr[i].title)) {
        tags.set(arr[i].title, arr[i].num);
      } else {
        tags.set(arr[i].title, tags.get(arr[i].title) + arr[i].num);
      }
    }
  });
  return Array.from(tags.entries())
    .map((arr) => ({ title: arr[0], num: arr[1] }))
    .sort((a, b) => {
      return b.num - a.num;
    });
};

export const getCurrentState = (state: EnhancedStore): EnhancedStore =>state
