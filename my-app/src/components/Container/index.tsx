

import React, {useEffect,useState} from 'react';
import EmployeeData from '../Table';
import ActionForm from '../ActionForm';
import Search from '../Search';
import ModalComponent from '../Modal';
import {Grid,Typography,CircularProgress,Backdrop} from '@material-ui/core';
import useEmployeeDetails from '../../services';
import {EmployeeDataObject,UrlLink,DataOperation} from '../../types/employee';
import styled from 'styled-components';

const DivSuccess = styled.div`
  color: green;
  background : white;
  font-size:20px;
`;
const DivError = styled.div`
    color: red;
    background : white;
    font-size:20px;
`;

const Container = () : JSX.Element => {
    const [isDefaultView, setIsDefaultView] = useState<boolean>(true);
    const [actionFormView, setActionFormView] = useState<boolean>(false);
    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<EmployeeDataObject>(Object);
    const [displayMessage,setDisplayMessage] = useState<string>('');
    const {dataOperation, isSending,isSent,error,data,actioned} = useEmployeeDetails();
   
    useEffect(() => {
        //Load data on initial load
        dataOperation(UrlLink.REQUEST_URL,DataOperation.READ)
      }, []);
      
    useEffect(() => {
        //Load data on initial load
        if(isSent && !isSending && actioned){
            setIsDefaultView(true);
            setActionFormView(false);
            dataOperation(UrlLink.REQUEST_URL,DataOperation.READ);
            setDisplayMessage('Success');
        }
      }, [isSent,isSending,actioned]);

      
    const onActionClick = (operation?:DataOperation,dataSet?:EmployeeDataObject) : void => {
        switch (operation) {
            case DataOperation.ADD:
                setIsDefaultView(false);
                setActionFormView(true);
                setIsEdit(false);
                break;
            case DataOperation.EDIT:
                setActionFormView(true);
                setIsDefaultView(false);
                setIsEdit(true);
                dataSet && setSelectedData(dataSet);
              break;
            case  DataOperation.DELETE:
                setIsConfirmationModal(true);
                setIsDefaultView(false);
                setActionFormView(false);
                dataSet && setSelectedData(dataSet);
                setIsEdit(false);
              break;
            default:
                setIsDefaultView(true);
                setIsConfirmationModal(false);
                setActionFormView(false);
          }          
    }

    const onDataAction = (data?:EmployeeDataObject,operation?:DataOperation) : void => {
        if(operation === DataOperation.ADD) {
            dataOperation(UrlLink.REQUEST_URL,DataOperation.ADD,data);
        } else if (operation === DataOperation.EDIT) {
            dataOperation(UrlLink.REQUEST_URL,DataOperation.EDIT,data);
        } else if (operation === DataOperation.DELETE) {
            setIsConfirmationModal(false);
            dataOperation(UrlLink.REQUEST_URL,DataOperation.DELETE,data);
        }
    }
    const onSearchClick = (searchParams?:string) : void => {
        let url:string = UrlLink.REQUEST_URL;
        searchParams &&( url = url.concat(searchParams));
        dataOperation(url,DataOperation.READ);
    }

    const onClose = () : void => {
        setIsDefaultView(true);
        setIsConfirmationModal(false);
    }

    return (
        <>
        <Grid item xs={12} container data-test="appContainer">
            <Typography component="h1" variant="h1" data-test="header">React App</Typography>
        </Grid>
        <Search data-test="searchContainer" onSearchClick={onSearchClick} />
        {displayMessage && 
            <Grid container item xs={12} justify="center" data-test="successMessage">
                <DivSuccess>
                    {displayMessage}
                </DivSuccess>
            </Grid>
        }
        {isDefaultView && data && 
        <Grid item xs={12} container data-test="employeeData">
            <EmployeeData data={data} onActionClick={onActionClick}  />
        </Grid>
        }
        {actionFormView && 
            <ActionForm data-test="actionForm" data={selectedData}  onDataAction={onDataAction} onCancel={onActionClick} isEdit={isEdit} />
        }
        {
        isSending && 
            <Backdrop  open={isSending} >
                <CircularProgress color="inherit" />
            </Backdrop>
        }
        {isConfirmationModal && 
            <ModalComponent data-test="modalContainer" open={isConfirmationModal} onClose={onClose} onDeleteClick={onDataAction} data={selectedData}/>
        }
        {error && 
            <Grid container item xs={12} data-test="errorMessage">
                <DivError>
                    {error}
                </DivError>
            </Grid>
        }
        </>
    )
}
export default Container;
