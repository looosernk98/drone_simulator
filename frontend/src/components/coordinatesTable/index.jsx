import React from "react";
import * as S from './styles'

const COLUMNS = ['S.No', 'Latitude', 'Longitude', 'Timestamp', 'Action'];
const CoordinatesTable = ({
    coordinateList,
}) => {
    return(
        <S.TableContainer>
            <S.TableRow>
                {COLUMNS.map(column =>(
                    <S.TableHead>
                       {column}
                    </S.TableHead>
                ))}
            </S.TableRow>
            {coordinateList?.length
             ? coordinateList.map((coord, index) => (
                <S.TableRow key={`row-${index}`}>
                    <S.TableData> {index+ 1} </S.TableData>
                    <S.TableData>{coord?.latitude}</S.TableData>
                    <S.TableData>{coord?.longitude}</S.TableData>
                    <S.TableData>{coord?.time}</S.TableData>
                    <S.ActionColumn>edit</S.ActionColumn>
                </S.TableRow>
               ))
             : <S.NoDataAvailable>
                No Coordinates Added, Please Add Coordinates
             </S.NoDataAvailable>
             }
        </S.TableContainer>
    )
}

{/* <S.TableRow key={`row-${index}`}>
<S.TableData> {index+ 1} </S.TableData>
<S.TableData>{coord.latitude}</S.TableData>
<S.TableData>{coord.longitude}</S.TableData>
<S.TableData>{coord.timestamp}</S.TableData>
</S.TableRow> */}
export default CoordinatesTable;