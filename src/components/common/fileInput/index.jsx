import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { isCoordinatesInRange } from '../../../utils/util';
import * as S from './styles'

const FileInput = ({ onFileUpload, disabled }) => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (disabled) return;

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (file.type === 'text/csv') {
          // Parse CSV
          Papa.parse(result, {
            complete: (parsedData) => {
              onFileUpload(parsedData.data);
              if (!isCoordinatesInRange(parsedData?.data, false)) setError(true)
            },
            header: true,
          });

        } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          // Parse XLSX
          const workbook = XLSX.read(result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_row_object_array(sheet, { header: 0 });
          onFileUpload(data);
          if (!isCoordinatesInRange(data, false)) setError(true)

        }
      };

      if (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        reader.readAsBinaryString(file);
        setFileName(file?.name)
      } else {
        toast.error('Unsupported file type')
      }
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['.csv', '.xlsx'],
  });

  return (
    <S.InputWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <S.ChooseFile disabled={disabled}>Choose file {!error ? <span>{fileName}</span> : null}</S.ChooseFile>
    </S.InputWrapper>
  );
};

export default FileInput;
