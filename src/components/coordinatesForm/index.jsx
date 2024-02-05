import React, { useState, useEffect, useContext } from 'react';
import Input from '../common/input';
import DateTimeInput from '../common/dateTimeInput';
import Button from '../common/button/index';
import FileInput from '../common/fileInput/index.jsx';
import * as S from './styles.js'
import { isCoordinatesInRange, isLatitudeInRange, isLongitudeInRange } from '../../utils/util';
import { toast } from 'react-toastify';
import { SimulationContext } from '../../context';

const CoordinateForm = ({
  coordinateList,
  editIndex,
  setCoordinateList,
  setEditIndex,
}) => {

  const { playSimulation } = useContext(SimulationContext);
  const [time, setTime] = useState('');
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    if (editIndex === null || editIndex < 0) return;

    const editableCoord = coordinateList[editIndex];

    setLatitude(editableCoord?.latitude)
    setLongitude(editableCoord?.longitude)
    setTime(new Date(editableCoord?.time).toISOString())
  }, [editIndex])

  const handleLatitudeChange = (e) => {
    setLatitude(e?.target?.value)
  }

  const handleLongitudeChange = (e) => {
    setLongitude(e?.target?.value)
  }

  const addCoordinates = () => {
    if (!isLatitudeInRange(latitude)) {
      toast.error('Latitude must be in range from -90 to 90')
      return;
    }
    if (!isLongitudeInRange(longitude)) {
      toast.error('Longitude must be in range from -180 to 180')
      return;
    }
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
    if (!isCoordinatesInRange(data, true)) return;

    toast.success('File uploaded successfully')
    const dataList = data?.map((item) => ({ ...item, time: new Date(item?.time).toISOString() }))
    setCoordinateList([...coordinateList, ...dataList])
  };

  return (
    <S.FormContainer>
      <S.FormRow>
        <DateTimeInput
          time={time}
          setTime={setTime}
          disabled={playSimulation}
        />
        <Input
          type='number'
          label='Longitude'
          placeholder='input longitude'
          value={longitude}
          onChange={handleLongitudeChange}
          isDisabled={playSimulation}
        />
        <Input
          type='number'
          label='Latitude'
          placeholder='input latitude'
          value={latitude}
          onChange={handleLatitudeChange}
          isDisabled={playSimulation}
        />
        <Button
          type='button'
          buttonText={editIndex !== null && editIndex >= 0 ? 'Edit Coordinate' : 'Add Coordinate'}
          onClick={addCoordinates}
          disabled={!latitude || !longitude || !time || playSimulation}
        />
        <FileInput disabled={playSimulation} onFileUpload={handleFileUpload} />
      </S.FormRow>
    </S.FormContainer>
  )
}

export default CoordinateForm;