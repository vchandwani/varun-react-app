import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import {EmployeeDataObject, DataOperation,UrlLink} from '../../types/employee';
import {Grid,CircularProgress, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const StyledTable = styled(Table)`
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
`;
const StyledTableContainer = styled(TableContainer)`
  margin-top : 10px; 
`;
const StyledTableRow = styled(TableRow)`
&:hover {
  background-color: #f0f0f0;
}
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface TableProps {
  data : EmployeeDataObject[];
  onActionClick(operation?:DataOperation,dataSet?:EmployeeDataObject):void;
}

const EmployeeData: React.FC<TableProps> = ({ data,onActionClick}: TableProps)  : JSX.Element => {
  const classes = useStyles();
  
  return (
    <Grid container justify="center" alignItems="center" alignContent="center" direction="row">
      <Grid item container xs={12} sm={8} justify="flex-end" alignItems="center">
        <Button variant="contained" onClick={() => onActionClick(DataOperation.ADD)}>
          Add Eemployee
        </Button>
      </Grid>
      {data && 
      <Grid item xs={12} sm={8}>
        <StyledTableContainer>
          <StyledTable className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>F.Name</TableCell>
                <TableCell>L.name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((dataObject:EmployeeDataObject,index:number) => (
                dataObject.firstName && (
                <StyledTableRow key={index}>
                  <TableCell>
                    {dataObject.firstName}
                  </TableCell>
                  <TableCell>{dataObject.lastName}</TableCell>
                  <TableCell>{dataObject.dateOfBirth}</TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() => onActionClick(DataOperation.DELETE,dataObject)} />
                    <EditIcon onClick={() => onActionClick(DataOperation.EDIT,dataObject)}/>
                  </TableCell>
                </StyledTableRow>
                )
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </Grid>
      }
    </Grid>
  )
}

export default EmployeeData;