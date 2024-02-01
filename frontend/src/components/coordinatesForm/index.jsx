import React, { Fragment, useState } from 'react';

import * as S from './styles.js'
import Input from '../common/input';
import DateTimeInput from '../common/dateTimeInput';
import Button  from '../common/button/index';
import { useEffect } from 'react';

const CoordinateForm = ({
  // setCoordinate,
  setCoordinateList
}) => {
  const [time, setTime] = useState(new Date().toISOString());
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  console.log('longitude: ', longitude, latitude);
 const [empty, setEmpty] = useState(false);
  // useEffect(() => {
  //     if(!empty) return
  //     setLatitude(null)
  //     setLongitude(null)
  // },[empty])
  const handleLatitudeChange = (e) => {
    setLatitude(e?.target?.value)
  }
  const handleLongitudeChange = (e) => {
    setLongitude(e?.target?.value)
  }
  const addCoordinates = () => {
     setLatitude(null)
     setLongitude(null)
    // setEmpty(true)
    //  handleLatitudeChange(null)
    //  handleLongitudeChange(null)
     setCoordinateList({
      time,
      latitude,
      longitude
     })
     
  }
  return(
    <S.FormContainer>
      <S.FormRow>
        <DateTimeInput
          time={time}
          setTime={setTime}
        />
        <Input
          type='text'
          label='Latitude'
          placeholder = 'input latitude'
          value = {latitude}
          onChange = {handleLatitudeChange}
        />
        <Input
          type='text'
          label='Longitude'
          placeholder = 'input longitude'
          value = {longitude}
          onChange = {handleLongitudeChange}
        />
        <Button
         type='button'
         buttonText = {'Add Coordinate'}
         onClick={addCoordinates}
        />
      </S.FormRow>
    </S.FormContainer>
  )
}

export default CoordinateForm