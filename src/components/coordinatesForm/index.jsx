import React, { useState, useEffect } from 'react';

import * as S from './styles.js'
import Input from '../common/input';
import DateTimeInput from '../common/dateTimeInput';
import Button from '../common/button/index';
import FileInput from '../common/fileInput/index.jsx';

const CoordinateForm = ({
  coordinateList,
  editIndex,
  setCoordinateList,
  setEditIndex,
}) => {
  const [time, setTime] = useState();
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  useEffect(() => {
    if (editIndex === null || editIndex < 0) return;

    const editableCoord = coordinateList[editIndex];

    setLatitude(editableCoord?.latitude)
    setLongitude(editableCoord?.longitude)
    setTime(editableCoord?.time)
  }, [editIndex])

  const handleLatitudeChange = (e) => {
    setLatitude(e?.target?.value)
  }

  const handleLongitudeChange = (e) => {
    setLongitude(e?.target?.value)
  }

  const addCoordinates = () => {
    setLatitude('');
    setLongitude('');
    setTime('');

    if (editIndex !== null && editIndex >= 0) {
      const coord = [...coordinateList];
      coord.splice(editIndex, 1, { time, latitude, longitude })

      setCoordinateList(coord)
      setEditIndex(null)
    } else {
      setCoordinateList([...coordinateList, { time, latitude, longitude }])
    }

  }

  const handleFileUpload = (data) => {
    data = data.map(item => ({ ...item, time: new Date(item?.time).toISOString() }))
    setCoordinateList([...coordinateList, ...data])
  };

  return (
    <S.FormContainer>
      <S.FormRow>
        <DateTimeInput
          time={time}
          setTime={setTime}
        />
        <Input
          type='text'
          label='Latitude'
          placeholder='input latitude'
          value={latitude}
          onChange={handleLatitudeChange}
        />
        <Input
          type='text'
          label='Longitude'
          placeholder='input longitude'
          value={longitude}
          onChange={handleLongitudeChange}
        />
        <Button
          type='button'
          buttonText={editIndex !== null && editIndex >= 0 ? 'Edit Coordinate' : 'Add Coordinate'}
          onClick={addCoordinates}
          disabled={!latitude || !longitude || !time}
        />
        <FileInput onFileUpload={handleFileUpload} />
      </S.FormRow>
    </S.FormContainer>
  )
}

export default CoordinateForm;