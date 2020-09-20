import React, { FC, useState } from 'react';
import {
  Button,
  Col,
  Collapse,
  Input,
  Modal,
  notification,
  Row,
  Space,
  Statistic,
  Typography,
  Upload,
} from 'antd';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import { useSelector, useDispatch } from 'react-redux';
import ReactJson from 'react-json-view';
import { DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import { getCurrentState } from '../../store';

import { loadAllFavourites } from '../../store/favs';
import { loadAllNotes } from '../../store/notes';

import { storeTypeText } from './storeType';
import { Fav } from '../../types/favs';
import { Note } from '../../types/notes';
import { StoreType } from '../../types/store';

const { Panel } = Collapse;
const { TextArea } = Input;

const Backup: FC = () => {
  const allState = useSelector(getCurrentState);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadText, setLoadText] = useState<string>('');

  const dispatch = useDispatch();

  const downloadString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(allState, null, 2),
  )}`;

  const loadData = (data: StoreType): [number, number] => {
    const newFavs: Fav[] = [];
    let newNotes: Note[] = [];
    if (Object.prototype.hasOwnProperty.call(data, 'favs')) {
      Object.keys(data.favs.items).forEach((id: string) => {
        newFavs.push(data.favs.items[id]);
      });
    }
    if (Object.prototype.hasOwnProperty.call(data, 'notes')) {
      newNotes = data.notes.noteList.reverse().map((id) => data.notes.notesById[id]);
    }
    if (newFavs.length) {
      dispatch(loadAllFavourites(newFavs));
    }
    if (newNotes.length) {
      dispatch(loadAllNotes(newNotes));
    }

    return [newFavs.length, newNotes.length];
  };

  const onLoadData = (): void => {
    try {
      const obj = JSON.parse(loadText);
      // console.log('PARSED DATA', obj);
      const [f, n] = loadData(obj);
      notification.success({
        message: 'Complete',
        description: (
          <div>
            <p>The data has been loaded</p>
            <Row>
              <Col span={12}>
                <Statistic title="Favourites" value={f} />
              </Col>
              <Col span={12}>
                <Statistic title="Notes" value={n} />
              </Col>
            </Row>
          </div>
        ),
      });
      setShowModal(false);
    } catch (e) {
      // console.error(e);
      Modal.error({
        title: 'Invalid JSON',
      });
    }
  };

  const onUpload = (uploadCfg: RcCustomRequestOptions): void => {
    if (uploadCfg.file.size > 102400) {
      Modal.error({
        title: 'File too large',
        content: `File is ${uploadCfg.file.size}kb`,
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent): void => {
      notification.success({
        message: 'Loaded and parsed successfully',
        description: `Successfully loaded file ${uploadCfg.file.name} (${e.loaded} / ${uploadCfg.file.size}kb) `,
      });
      setLoadText(reader.result?.toString() || '');
    };
    reader.readAsText(uploadCfg.file, 'utf-8');
  };

  return (
    <>
      <Button
        type="primary"
        onClick={(): void => {
          setShowModal(true);
        }}
      >
        Backup
      </Button>
      <Modal
        title="Backup"
        style={{ top: 20 }}
        centered
        visible={showModal}
        width="80%"
        destroyOnClose
        onCancel={(): void => {
          setShowModal(false);
        }}
        footer={
          <Button
            type="text"
            onClick={(): void => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        }
      >
        <p>Backup/Restore the local data</p>
        <Collapse accordion>
          <Panel header="Load" key="1">
            <Row>
              <Col span={14}>
                <TextArea
                  placeholder={storeTypeText}
                  rows={8}
                  value={loadText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setLoadText(e.target.value);
                  }}
                />
              </Col>
              <Col span={10}>
                <Upload.Dragger accept=".json" showUploadList={false} customRequest={onUpload}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Only .json files allowed</p>
                </Upload.Dragger>
              </Col>
            </Row>

            <Space>
              <Button type="primary" onClick={onLoadData}>
                Load
              </Button>
            </Space>
          </Panel>
          <Panel header="Backup" key="2">
            <div>
              <Button
                icon={<DownloadOutlined />}
                type="link"
                href={downloadString}
                download="notepad_data.json"
              >
                Download
              </Button>
              <Typography.Title level={3}>Raw JSON Data</Typography.Title>
              <ReactJson src={allState} />
            </div>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

export default Backup;
