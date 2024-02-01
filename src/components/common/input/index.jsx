import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './styles.js'

const Input = ({
    type ='text',
    label = 'Input',
    value,
    onChange,
    isDisabled = false,
    placeholder = 'Input',
    required = false
}) => {
  const[inputValue , setInputValue] = useState();
  // useEffect(() => {
  //    on
  // },[value])

  // const onChangeHandler = (e) => {
  //   onChange(e)
  //   setInputValue(e.target.value)
  // }

   return(
    <S.InputContainer>
        <S.InputLabel>
          {label}
        </S.InputLabel>
        <S.InputField
          type={type}
          placeholder={placeholder}
          value = {inputValue}
          onChange = {onChange}
          disabled = {isDisabled}
          required = {required}
        />
    </S.InputContainer>
   )
}

export default Input;