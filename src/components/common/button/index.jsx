import React from "react";
import * as S from './styles.js'

const Button = ({
    type = 'button',
    buttonText,
    onClick,
    disabled = false
}) => {
    return (
        <S.Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-testid='button'
        >
            {buttonText}
        </S.Button>
    )
}

export default Button;