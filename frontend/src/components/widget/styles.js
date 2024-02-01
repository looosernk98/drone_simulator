import styled from 'styled-components';


export const Container = styled.div`
   padding: 20px;
`;

export const LiveSimulationInfo = styled.div`
   /* padding: 20px; */
   display: flex;
   flex-wrap: wrap;
   row-gap: 30px;
   justify-content: center;
   margin-bottom: 30px;

`;

export const LiveInfo = styled.h3`
   width: 100%;
   /* padding: 0px 10px; */
   /* margin-top: 20px; */
   color: #106EC5;
   margin-bottom:0px;
`;
export const ButtonActions = styled.div`
 display: flex;
 /* justify-content: space-evenly; */
 column-gap: 50px;
 margin-top: 20px;
`;
// export const AddCoordinatesButton = styled.div`
//   padding: 10px;
// `;
// export const UploadFileButton = styled(AddCoordinatesButton)`
// `;

export const Detail = styled.div`
 width: 45%;

`;
export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  opacity : 0.9;
  /* border: 1px solid; */
  /* padding: 10px; */
`;
export const Value = styled.div`
  /* border: 1px solid; */
  font-size: 16px;
  font-weight: 400;
  opacity : 0.9;
`;

export const Controls = styled(LiveSimulationInfo)`
`;


