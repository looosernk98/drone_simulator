import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const LiveSimulationInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  justify-content: center;
  margin-bottom: 30px;
`;

export const LiveInfo = styled.h3`
  width: 100%;
  color: #106ec5;
  margin-bottom: 0px;
`;

export const ButtonActions = styled.div`
  display: flex;
  column-gap: 50px;
  margin-top: 20px;
`;

export const Detail = styled.div`
  width: 45%;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  opacity: 0.9;
`;

export const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  opacity: 0.9;
`;
export const PathIndicators = styled.div``;
export const UntravelledPath = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > label {
    display: block;
    margin: 0 10px;
    font-size: 14px;
    font-weight: 600;
    opacity: 0.9;
  }
  > span {
    display: block;
    width: 150px;
    height: 7px;
    background: #1634f6;
  }
`;
export const TravelledPath = styled(UntravelledPath)`
  > span {
    background: #008000;
  }
`;

export const Controls = styled(LiveSimulationInfo)``;
