import React from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import * as S from './styles'

const COLUMNS = ['S.No', 'Latitude', 'Longitude', 'Timestamp', 'Action'];

const CoordinatesTable = ({
    coordinateList,
    setEditIndex,
    setCoordinateList
}) => {

    const handleEditCoordinate = (index) => {
        setEditIndex(index)
    }
    const handleDeleteCoordinate = (index) => {
        const coord = [...coordinateList]
        coord.splice(index, 1)
        setCoordinateList(coord)
    }
    return (
        <S.TableContainer>
            <S.TableHead>
                <S.TableRow>
                    {COLUMNS.map(column => (
                        <S.TableHeading>
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
                            <S.TableData>{coord?.latitude}</S.TableData>
                            <S.TableData>{coord?.longitude}</S.TableData>
                            <S.TableData>{coord?.time}</S.TableData>
                            <S.ActionColumn>
                                <S.Edit onClick={() => handleEditCoordinate(index)}><CiEdit /></S.Edit>
                                <S.Delete onClick={() => handleDeleteCoordinate(index)}><RiDeleteBin5Line /></S.Delete>
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