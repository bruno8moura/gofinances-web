import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import {
  Container,
  Title,
  ImportFileContainer,
  Footer,
  AlertMessage,
} from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState('');
  const [goHome, setGoHome] = useState(false);

  function clearMessageAndGoHome(): void {
    setAlertMessage('');
    if (goHome) history.push('/');
  }

  async function handleUpload(): Promise<void> {
    if (uploadedFiles.length === 0) {
      setAlertMessage('Favor selecionar um arquivo!');
      return;
    }

    const data = new FormData();
    data.append('file', uploadedFiles[0].file);

    try {
      await api.post('/transactions/import', data);
      setAlertMessage('Arquivo carregado com sucesso!');
      setGoHome(true);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const newFilesProps = files.map(file => {
      const item: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };

      return item;
    });

    setUploadedFiles([...uploadedFiles, ...newFilesProps]);
  }

  return (
    <>
      {alertMessage && (
        <AlertMessage onClick={clearMessageAndGoHome}>
          {alertMessage}
        </AlertMessage>
      )}
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
