import React, { useContext, useEffect, useState } from 'react';
import Button from '../common/button';
import { SimulationContext } from '../../context';
import { calculateHorizontalSpeed, calculateVerticalSpeed } from '../../utils/util';
import * as S from './styles'


const Widget = ({ coordinateList = [] }) => {
    const {
        prevCoordinateValue,
        currCoordinateValue,
        playSimulation,
        setPlaySimulation
    } = useContext(SimulationContext);

    const [latency, setLatency] = useState(0);

    useEffect(() => {
        if (playSimulation && currCoordinateValue) {
            setLatency(latency + 100)
        }
    }, [playSimulation, currCoordinateValue])

    const horizontalSpeed = calculateHorizontalSpeed(prevCoordinateValue, currCoordinateValue)?.toFixed(5);
    const verticalSpeed = calculateVerticalSpeed(prevCoordinateValue, currCoordinateValue)?.toFixed(5);

    return (
        <S.Container>
            <S.LiveSimulationInfo>
                <S.LiveInfo>Drone Telemetry</S.LiveInfo>
                <S.Detail>
                    <S.Label>Longitude</S.Label>
                    <S.Value>{(currCoordinateValue[0] ?? coordinateList[0]?.longitude)?.toFixed(5) ?? '-'}</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Latitude</S.Label>
                    <S.Value>{(currCoordinateValue[1] ?? coordinateList[0]?.latitude)?.toFixed(5) ?? '-'}</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Vertical Speed</S.Label>
                    <S.Value>{verticalSpeed ? `${verticalSpeed} km/ms` : '-'}</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Horizontal Speed</S.Label>
                    <S.Value>{horizontalSpeed ? `${horizontalSpeed} km/ms` : '-'}</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Latency</S.Label>
                    <S.Value>{latency ? `${latency} ms` : '-'}</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Altitude</S.Label>
                    <S.Value>123 m</S.Value>
                </S.Detail>
                <S.Detail>
                    <S.Label>Battery</S.Label>
                    <S.Value>70%</S.Value>
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
                        disabled={!coordinateList?.length}
                        onClick={() => setPlaySimulation(true)}
                    />
                </S.Detail>
                <S.Detail>
                    <Button
                        type='button'
                        buttonText={'Pause'}
                        disabled={!coordinateList?.length}
                        onClick={() => setPlaySimulation(false)}
                    />
                </S.Detail>
            </S.Controls>
            <S.PathIndicators>
                <S.TravelledPath><label>Travelled Path</label><span></span></S.TravelledPath><br />
                <S.UntravelledPath><label>Untravelled Path</label><span></span></S.UntravelledPath>
            </S.PathIndicators>
        </S.Container>
    )
}

export default Widget;