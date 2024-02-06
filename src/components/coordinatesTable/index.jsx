import React, { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SimulationContext } from "../../context";
import Tooltip from "../common/tooltip";
import * as S from './styles'

const COLUMNS = ['S.No', 'Longitude', 'Latitude', 'Timestamp', 'Action'];

const CoordinatesTable = ({
    coordinateList,
    setEditIndex,
    setCoordinateList,
    editIndex
}) => {
    const { playSimulation } = useContext(SimulationContext);

    const handleEditCoordinate = (index) => {
        if (playSimulation) return true;
        setEditIndex(index)
    }
    const handleDeleteCoordinate = (index) => {
        if (playSimulation || editIndex != null) return true;
        const coord = [...coordinateList]
        coord.splice(index, 1)
        setCoordinateList(coord)
    }

    return (
        <S.TableContainer>
            <S.TableHead>
                <S.TableRow>
                    {COLUMNS.map((column, index) => (
                        <S.TableHeading key={`th-${index}`}>
                            {column}
                        </S.TableHeading>
                    ))}
                </S.TableRow>
            </S.TableHead>
            <S.TableBody>
                {coordinateList?.length
                    ? coordinateList.map((coord, index) => (
                        <S.TableRow key={`row-${index}`}>
                            <S.TableData> {index + 1} </S.TableData>
                            <S.TableData>{coord?.longitude || coord[0]}</S.TableData>
                            <S.TableData>{coord?.latitude || coord[1]}</S.TableData>
                            <S.TableData>{new Date(coord?.time).toISOString() || new Date(coord[2]).toISOString()}</S.TableData>
                            <S.ActionColumn disabled={playSimulation}>
                                <Tooltip
                                    content={!playSimulation ? 'Edit' : ''}
                                    position='bottom'
                                    id='edit'
                                >
                                    <S.Edit onClick={() => handleEditCoordinate(index)}><CiEdit /></S.Edit>
                                </Tooltip>
                                <Tooltip
                                    content={!playSimulation ? 'Delete' : ''}
                                    position='bottom'
                                    id='delete'
                                >
                                    <S.Delete disabled={editIndex != null} onClick={() => handleDeleteCoordinate(index)}><RiDeleteBin5Line /></S.Delete>
                                </Tooltip>
                            </S.ActionColumn>
                        </S.TableRow>
                    ))
                    : <S.NoDataAvailable>
                        No Coordinates, Please Add Coordinates!
                    </S.NoDataAvailable>
                }
            </S.TableBody>
        </S.TableContainer>
    )
}

export default CoordinatesTable;