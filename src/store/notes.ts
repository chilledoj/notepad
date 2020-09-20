/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */
import { createSlice, nanoid } from '@reduxjs/toolkit';
import arrayMove from 'array-move';

import { Tag } from '../types/favs';
import { Note } from '../types/notes';

interface NoteStore {
  notes: NoteState;
}

type NoteState = {
  notesById: {
    [id: string]: Note;
  };
  noteList: string[];
};

export const noteInit: NoteState = {
  notesById: {},
  noteList: [],
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState: noteInit,
  reducers: {
    addNote: (state, action) => {
      const newNote = action.payload;
      newNote.id = nanoid();
      state.notesById[newNote.id] = newNote;
      state.noteList.unshift(newNote.id);
    },
    updateNote: (state, { payload: updNote }) => {
      state.notesById[updNote.id] = updNote;
    },
    setNoteOrder: (state, { payload }) => {
      // console.log(payload)
      // console.log(state.noteList);
      state.noteList = arrayMove(state.noteList, payload.prevIdx, payload.newIdx);
      // console.log(state.noteList);
    },
    deleteNote: (state, { payload: id }) => {
      for (let i = 0; i < state.noteList.length; i++) {
        if (state.noteList[i] === id) {
          state.noteList.splice(i, 1);
          break;
        }
      }
      delete state.notesById[id];
    },
    loadAllNotes: (state, { payload: notes }) => {
      notes.forEach((newNote) => {
        if (!newNote.id || newNote.id === '' || state.notesById.hasOwnProperty) {
          newNote.id = nanoid();
        }
        state.notesById[newNote.id] = newNote;
        state.noteList.unshift(newNote.id);
      });
    },
  },
});

export const { addNote, updateNote, deleteNote, setNoteOrder, loadAllNotes } = noteSlice.actions;

export const getNoteCollection = (noteStore: NoteStore): Note[] => {
  return noteStore.notes.noteList.map((id) => noteStore.notes.notesById[id]);
};

// export const getTagCollection = (favStore) => favStore.favs.tags;
export const getNoteTagCollection = (noteStore: NoteStore): Tag[] => {
  const favs = getNoteCollection(noteStore);
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
