import React from 'react';
import * as S from './styles.js'

const Input = ({
  type = 'text',
  label = 'Input',
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Input',
  required = false
}) => {
  return (
    <S.InputContainer>
      <S.InputLabel>
        {label}
      </S.InputLabel>
      <S.InputField
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={''}
        onChange={onChange}
        disabled={isDisabled}
        required={required}
      />
    </S.InputContainer>
  )
}

export default Input;