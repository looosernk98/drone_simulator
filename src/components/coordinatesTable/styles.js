import styled from 'styled-components';

export const TableContainer = styled.table`
   padding: 0px 0px;
   border: 1px dotted;
   border-radius: 4px;
   width: 100%;
   /* opacity: 0.5; */

   >:first-child{
     border-bottom: 0.6px dotted;
     background: #eff6fc;
   }
`;
export const TableRow = styled.tr`
   display: flex;
   width:100%;
   column-gap:50px ;
   padding: 20px 0px;



   
`;
export const TableHead = styled.th`
   width: 18%;
   /* border: 1px solid red; */
`;
export const TableData = styled.td`
  width: 18%;
  text-align: center;
`;

export const ActionColumn = styled(TableData)`

`

export const NoDataAvailable = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`
