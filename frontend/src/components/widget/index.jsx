import React from 'react';
import * as S from './styles'
import Button from '../common/button';
const Widget = ({

}) => {
    console.log();
    return (
        <S.Container>
            <S.ButtonActions>
                <Button
                    type='button'
                    buttonText={'Add Coordinates'}
                    onClick={() => {}}
                />
                <Button
                    type='button'
                    buttonText={'Upload File'}
                    onClick={() => {}}
                />
            </S.ButtonActions>
            <br/>
            
            <S.LiveSimulationInfo>
                <S.LiveInfo>Live Simulation Information</S.LiveInfo>
                <S.Detail>
                    <S.Label>Longitude</S.Label>
                    <S.Value>277.0</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Latitude</S.Label>
                    <S.Value>208.0</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>TimeStamp</S.Label>
                    <S.Value>208.0</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Speed</S.Label>
                    <S.Value>208.0</S.Value>
                </S.Detail>
            </S.LiveSimulationInfo>
            <br />
            <S.Controls>
                <S.Detail>
                <Button
                  type='button'
                  buttonText={'Simulate'}
                  onClick = {() => {}}
                 />
                </S.Detail>
                <S.Detail>
                 <Button
                  type='button'
                  buttonText={'Pause'}
                  onClick = {() => {}}
                 /> 
                </S.Detail>
                {/* <S.Detail>
                 <Button
                  type='button'
                  buttonText={'Play'}
                  onClick = {() => {}}
                 /> 
                </S.Detail> */}
            </S.Controls>

        </S.Container>
    )
}

export default Widget;