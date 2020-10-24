import React from 'react';
import {Grid,Button,Dialog} from '@material-ui/core';
import {EmployeeDataObject, DataOperation} from '../../types/employee';

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
    >
      <div>
        <h2 id="server-modal-title">Are ypou sure to delete ?</h2>
       </div>
       <Grid>
         <Button variant="contained" onClick={onClose}>Cancel</Button>
         <Button variant="outlined" onClick={() => onDeleteClick(data,DataOperation.DELETE)}>Proceed</Button>
        </Grid>
    </Dialog>
  )
}

export default ModalComponent