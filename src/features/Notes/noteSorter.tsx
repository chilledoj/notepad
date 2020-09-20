import React, { FC } from 'react';
import { Button, Card, List } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { useSelector, useDispatch } from 'react-redux';

import {
  getNoteCollection, // READ
  setNoteOrder, // UPDATE
} from '../../store/notes';

const SortItem = SortableElement(({ value }) => <List.Item>{value.title}</List.Item>);

const SortableNotes = SortableContainer(({ items: data }) => {
  return (
    <List>
      {data.map((item, idx) => (
        <SortItem key={`item-${item.id}`} index={idx} value={item} />
      ))}
    </List>
  );
});

type SortNoteWrapperProps = {
  onClose: {
    (): void;
  };
};

const SortNoteWrapper: FC<SortNoteWrapperProps> = ({ onClose }: SortNoteWrapperProps) => {
  const notes = useSelector(getNoteCollection);
  const dispatch = useDispatch();

  const onSortEnd = ({ oldIndex: prevIdx, newIndex: newIdx }): void => {
    // console.log('%d => %d', prevIdx, newIdx);
    dispatch(setNoteOrder({ prevIdx, newIdx }));
  };

  return (
    <Card
      title="Reorder notes"
      actions={[
        <Button type="primary" onClick={(): void => onClose()}>
          OK
        </Button>,
      ]}
    >
      <SortableNotes items={notes} onSortEnd={onSortEnd} />
    </Card>
  );
};

export default SortNoteWrapper;
