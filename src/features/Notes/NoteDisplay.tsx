import React, { FC, ReactNode } from 'react';
import { Card, Divider, Empty } from 'antd';
import { Note } from '../../types/notes';

import { Viewer } from '../Markdown';
import NoteForm from './NoteForm';
import { SimpleTagList } from '../TagCloud';

type NoteCardProps = {
  note: Note;
  editButton: ReactNode;
  deleteButton: ReactNode;
};

const NoteCard: FC<NoteCardProps> = ({ note, editButton, deleteButton }: NoteCardProps) => {
  return (
    <Card title={note.title} style={{ width: '100%' }} extra={[editButton, deleteButton]}>
      <SimpleTagList tags={note.tags} />
      <Divider />
      <Viewer src={note.rawData || ''} />
    </Card>
  );
};

type NoteDisplayProps = {
  note: Note | null;
  editButton: ReactNode;
  isEdit: boolean;
  cancelEdit: ReactNode;
  onSubmit: {
    (val: Note): void;
  };
  deleteButton: ReactNode;
};

const NoteDisplay: FC<NoteDisplayProps> = ({
  note,
  editButton,
  isEdit,
  cancelEdit,
  onSubmit,
  deleteButton,
}: NoteDisplayProps) => {
  if (note === null) return <Empty />;
  if (!isEdit) return <NoteCard note={note} editButton={editButton} deleteButton={deleteButton} />;
  return <NoteForm note={note} onSubmit={onSubmit} cancelEdit={cancelEdit} />;
};

export default NoteDisplay;
