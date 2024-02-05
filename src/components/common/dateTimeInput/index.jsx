import React from 'react';
import * as S from './styles.js'

const DateTimeInput = ({
    time,
    setTime,
    disabled
}) => {

    const handleTimeChange = (e) => {
        setTime(new Date(e.target.value).toISOString());
    }

    return (
        <>
            <S.DateTimeSelector>
                <S.Label>Select Time</S.Label>
                <S.Input
                    type="datetime-local"
                    id="time"
                    step="1"
                    value={time?.split('.')[0]}
                    onChange={handleTimeChange}
                    disabled={disabled}
                />
            </S.DateTimeSelector>
        </>
    )
}

export default DateTimeInput;