import React from 'react';
import Button from '../common/button';
import * as S from './styles'

const Widget = ({
    onSimulateClick,
    onPauseClick,
}) => {
    return (
        <S.Container>
            <S.LiveSimulationInfo>
                <S.LiveInfo>Drone Telemetry</S.LiveInfo>
                <S.Detail>
                    <S.Label>Longitude</S.Label>
                    <S.Value>277.0</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Latitude</S.Label>
                    <S.Value>208.0</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Battery</S.Label>
                    <S.Value>70%</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Latency</S.Label>
                    <S.Value>163 ms</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Altitude</S.Label>
                    <S.Value>20.3 m</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Vertical Speed</S.Label>
                    <S.Value>2 m/s</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Horizontal Speed</S.Label>
                    <S.Value>4 m/s</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Timestamp</S.Label>
                    <S.Value>{new Date('2024-02-10T08:24:02.000Z').toString()}</S.Value>
                </S.Detail>
            </S.LiveSimulationInfo>
            <br />
            <S.Controls>
                <S.Detail>
                    <Button
                        type='button'
                        buttonText={'Simulate'}
                        onClick={onSimulateClick}
                    />
                </S.Detail>
                <S.Detail>
                    <Button
                        type='button'
                        buttonText={'Pause'}
                        onClick={onPauseClick}
                    />
                </S.Detail>
            </S.Controls>
            <S.PathIndicators>
                    <S.TravelledPath><label>Travelled Path</label><span></span></S.TravelledPath><br/>
                    <S.UntravelledPath><label>Untravelled Path</label><span></span></S.UntravelledPath>
                </S.PathIndicators>
        </S.Container>
    )
}

export default Widget;