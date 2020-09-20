/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const searchTermSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchText = action.payload || ''
    }
  },
});

export const {setSearchTerm} = searchTermSlice.actions;

export const getSearchTerm = (state) => {
  return state.search.searchText
}
