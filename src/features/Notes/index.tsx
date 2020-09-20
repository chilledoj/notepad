/* eslint-disable import/no-unresolved */
import React, { FC, useState } from 'react';
import { Button, Layout, Popconfirm, Menu, Typography, Divider } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  addNote, // CREATE
  getNoteCollection, // READ
  updateNote, // UPDATE
  // setNoteOrder, // UPDATE
  deleteNote, // DELETE
} from '../../store/notes';
import { getSearchTerm, setSearchTerm } from '../../store/searchTerm';

import NoteDisplay from './NoteDisplay';
import NoteSorter from './noteSorter';

import { Note } from '../../types/notes';

const { Content, Sider } = Layout;

const searchNote = (n: Note, searchTerm = ''): boolean => {
  if (searchTerm === '') return true;
  const found = n.tags?.map((t) => t.toLocaleLowerCase()).filter((t) => t.includes(searchTerm));
  return (
    n.title.toLocaleLowerCase().includes(searchTerm) ||
    n.rawData.toLocaleLowerCase().includes(searchTerm) ||
    (!!found && found.length > 0)
  );
};

const Notes: FC = () => {
  const notes = useSelector(getNoteCollection);
  const searchTerm = useSelector(getSearchTerm);
  const dispatch = useDispatch();
  const [reorder, setReorder] = useState(false);

  const filteredNotes = notes.filter((note) => {
    return searchNote(note, searchTerm.toLocaleLowerCase());
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currNote, setCurrNote] = useState<Note | null>(null);

  const onDeleteNote = (id): void => {
    dispatch(deleteNote(id));
    setCurrNote(null);
  };
  const onSubmit = (val: Note): void => {
    // console.log('Updating Note');
    dispatch(updateNote(val));
    // console.log(val);
    setIsEdit(false);
    setCurrNote(val);
  };

  const toggleOrder = (): void => {
    setCurrNote(null);
    setIsEdit(false);
    setReorder(!reorder);
  };

  return (
    <Layout style={{ minHeight: '100%', padding: '1rem' }}>
      <Typography.Title type="secondary">Notes</Typography.Title>
      <Content>
        <Layout style={{ minHeight: '100%' }}>
          <Sider>
            <Button
              icon={<PlusOutlined />}
              block
              type="primary"
              onClick={(): void => {
                setCurrNote(null);
                dispatch(addNote({ id: '', title: 'New Note', rawData: '**TODO**', tags: [] }));
                dispatch(setSearchTerm(''));
                // setShowDrawer(true);
              }}
            >
              Add
            </Button>
            <Divider />
            <Button
              icon={<BarsOutlined />}
              block
              onClick={(): void => {
                toggleOrder();
              }}
            >
              Re-order
            </Button>

            <Menu theme="dark" selectedKeys={currNote ? [currNote.id] : []}>
              {notes.map((note: Note) => (
                <Menu.Item
                  key={note.id}
                  onClick={(): void => {
                    setCurrNote(note);
                  }}
                  disabled={reorder || isEdit || !filteredNotes.map((n) => n.id).includes(note.id)}
                >
                  {note.title}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '1rem' }}>
            {reorder && <NoteSorter onClose={(): void => toggleOrder()} />}
            {!reorder && (
              <NoteDisplay
                editButton={
                  <Button
                    key={`edit-${currNote?.id}`}
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={(): void => {
                      setIsEdit(true);
                    }}
                  />
                }
                isEdit={isEdit}
                cancelEdit={
                  <Button
                    key={`cncledit-${currNote?.id}`}
                    type="text"
                    danger
                    icon={<StopOutlined />}
                    onClick={(): void => {
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                }
                onSubmit={onSubmit}
                deleteButton={
                  <Popconfirm
                    key={`del-${currNote?.id}`}
                    title="Are you sure you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    icon={<DeleteOutlined />}
                    onConfirm={(): void => {
                      onDeleteNote(currNote?.id);
                    }}
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                }
                note={currNote}
              />
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default Notes;
