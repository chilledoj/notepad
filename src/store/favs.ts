/* eslint-disable no-param-reassign */
import { createSlice, nanoid } from '@reduxjs/toolkit';

import { Fav, Tag } from '../types/favs';

interface FavState {
  items: {
    [id: string]: Fav;
  };
};

type FavStore = {
  favs: FavState
}

export const favInit: FavState = {
  items: {},
};

export const favSlice = createSlice({
  name: 'favs',
  initialState: favInit,
  reducers: {
    addFavourite: (state, action): void => {
      const newFav = action.payload;
      newFav.id = nanoid();
      state.items[newFav.id] = newFav;
    },
    updateFavourite: (state, { payload: updFav }): void => {
      state.items[updFav.id] = updFav;
    },
    deleteFavourite: (state, { payload: id }): void => {
      delete state.items[id];
    },
    loadAllFavourites: (state, { payload: favs }): void => {
      favs.forEach((fav) => {
        if (!fav.id || fav.id === '') {
          fav.id = nanoid();
        }
        state.items[fav.id] = fav;
      });
    },
  },
});

export const {
         addFavourite,
         updateFavourite,
         deleteFavourite,
         loadAllFavourites,
       } = favSlice.actions;

export const getFavCollection = (favStore: FavStore): Fav[] => {
         return Object.keys(favStore.favs.items).map((prop) => favStore.favs.items[prop]);
       };

// export const getTagCollection = (favStore) => favStore.favs.tags;
export const getFavTagCollection = (favStore: FavStore): Tag[] => {
  const favs = getFavCollection(favStore);
  const tags = new Map();
  favs
    .map((f) => f.tags)
    .flat()
    .forEach((t) => {
      if (!t) {
        return;
      }
      if (!tags.has(t)) {
        tags.set(t, 1);
      } else {
        tags.set(t, tags.get(t) + 1);
      }
    });
  return Array.from(tags.entries())
    .map((arr) => ({ title: arr[0], num: arr[1] }))
    .sort((a, b) => {
      return b.num - a.num;
    });
};
