import * as S from './styles.js'


const DateTimeInput = ({
    time,
    setTime, 
}) => {

    const handleTimeChange = (e) => {
        
        setTime(new Date(e.target.value).toISOString());
        console.log('e.target.value: ', e.target.value);
    }

    return(
        <>
        <S.DateTimeSelector>
            <S.Label>Select Time</S.Label>
            <S.Input 
                type="datetime-local"
                id="time" 
                step="1" 
                // min={startTime.split('.')[0]}
                // max={endTime.split('.')[0]}
                value={time?.split('.')[0]} 
                onChange={handleTimeChange}
            />
       </S.DateTimeSelector>
        </>
    )
}

export default DateTimeInput;