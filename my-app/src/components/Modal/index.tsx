import React from 'react';
import {Grid,Button,Dialog} from '@material-ui/core';
import {EmployeeDataObject, DataOperation} from '../../types/employee';
import styled from 'styled-components';

const DivStyled = styled.div`
  color: black;
  background : white;
  font-size:20px;
  padding:10px;
`;
const GridStyled = styled(Grid)`
  padding: 10px;
`;
const ButtonStyled = styled(Button)`
  padding: 10px;
  margin: 0 10px;
`;

export interface TableProps {
  open :boolean;
  onClose():void;
  onDeleteClick(data?:EmployeeDataObject,operation?:DataOperation):void;
  data?: EmployeeDataObject;
}

const ModalComponent: React.FC<TableProps> = ({ open,onClose,onDeleteClick,data}: TableProps)  : JSX.Element => {
  const rootRef = React.useRef(null);

  return (
    <Dialog
      disableEnforceFocus
      disableAutoFocus
      open={open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      container={() => rootRef.current}
      onClose={onClose}
      data-test="modalContainer"
      maxWidth={'sm'}
      fullWidth={true}
    >
      <DivStyled>
        <h2 id="server-modal-title">Are you sure to delete ?</h2>
       </DivStyled>
       <GridStyled container justify="flex-end" item xs={12}>
         <ButtonStyled variant="contained" onClick={onClose} data-test="cancelModal">Cancel</ButtonStyled>
         <ButtonStyled variant="outlined" onClick={() => onDeleteClick(data,DataOperation.DELETE)} data-test="proceedButton">Proceed</ButtonStyled>
        </GridStyled>
    </Dialog>
  )
}

export default ModalComponent