import React from "react";
import * as S from './styles.js'

const Button = ({
    type='button',
    buttonText,
    onClick
}) => {
    return(
        <S.Button
         type={type}
         onClick={onClick}
        >
          {buttonText}
        </S.Button>
    )
}

export default Button;