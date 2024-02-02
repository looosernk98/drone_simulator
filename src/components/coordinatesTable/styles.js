import styled from 'styled-components';

export const TableContainer = styled.table`
   /* padding: 0px 0px; */
   /* border: 1px dotted; */
   border-radius: 4px;
   width: 100%;
   box-shadow: 2px 4px 8px 4px #e9e9e9bf;

   >:first-child{
     border-bottom: 0.6px dotted;
     background: #eff6fc;
     box-shadow: 2px 4px 8px 4px #e9e9e9bf;

   }
`;
export const TableRow = styled.tr`
   display: flex;
   width:100%;
   column-gap:50px ;
   padding: 20px 0px;



   
`;
export const TableHeading = styled.th`
   width: 18%;
   /* border: 1px solid red; */
`;
export const TableBody = styled.tbody`
    overflow-y: scroll;
    height: 250px;
    display: block;
`;
export const TableHead = styled.thead`
 
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
  align-items: center;
  height: 100%;
  font-weight: 500;
  color: #b1b106;;
`
export const Edit = styled.span`
  /* color: #eff6fc;; */
  font-size: 20px;
  margin-right: 10px;
  padding: 5px;
  cursor: pointer;
  /* border: 0.3px solid; */
  /* box-shadow: 2px 0px 18px 10px #e9e9e9bf; */

`
export const Delete = styled(Edit)`
 color: #ef6565;

`