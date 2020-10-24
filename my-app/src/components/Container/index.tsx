

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
    const [defaultView, setDefaultView] = useState<boolean>(true);
    const [actionFormView, setActionFormView] = useState<boolean>(false);
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
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
            setDefaultView(true);
            setActionFormView(false);
            dataOperation(UrlLink.REQUEST_URL,DataOperation.READ);
            setDisplayMessage('Success');
        }
      }, [isSent,isSending,actioned]);

      
    const onActionClick = (operation?:DataOperation,dataSet?:EmployeeDataObject) : void => {
        switch (operation) {
            case DataOperation.ADD:
                setDefaultView(false);
                setActionFormView(true);
                setIsEdit(false);
                break;
            case DataOperation.EDIT:
                setActionFormView(true);
                setDefaultView(false);
                setIsEdit(true);
                dataSet && setSelectedData(dataSet);
              break;
            case  DataOperation.DELETE:
                setConfirmationModal(true);
                setDefaultView(false);
                setActionFormView(false);
                dataSet && setSelectedData(dataSet);
                setIsEdit(false);
              break;
            default:
                setDefaultView(true);
                setConfirmationModal(false);
                setActionFormView(false);
          }          
    }

    const onDataAction = (data?:EmployeeDataObject,operation?:DataOperation) : void => {
        if(operation === DataOperation.ADD) {
            dataOperation(UrlLink.REQUEST_URL,DataOperation.ADD,data);
        } else if (operation === DataOperation.EDIT) {
            dataOperation(UrlLink.REQUEST_URL,DataOperation.EDIT,data);
        } else if (operation === DataOperation.DELETE) {
            setConfirmationModal(false);
            dataOperation(UrlLink.REQUEST_URL,DataOperation.DELETE,data);
        }
    }
    const onSearchClick = (searchParams?:string) : void => {
        let url:string = UrlLink.REQUEST_URL;
        searchParams &&( url = url.concat(searchParams));
        dataOperation(url,DataOperation.READ);
    }

    const onClose = () : void => {
        setDefaultView(true);
        setConfirmationModal(false);
    }

    return (
        <>
        <Grid item xs={12} container>
            <Typography component="h1" variant="h1">React App</Typography>
        </Grid>
        <Search onSearchClick={onSearchClick} />
        {displayMessage && 
        <Grid container item xs={12} justify="center">
             <DivSuccess>
                {displayMessage}
             </DivSuccess>
        </Grid>
        }
        {defaultView && data && 
        <Grid item xs={12} container>
            <EmployeeData data={data} onActionClick={onActionClick}  />
        </Grid>
        }
        {actionFormView && 
            <ActionForm data={selectedData}  onDataAction={onDataAction} onCancel={onActionClick} isEdit={isEdit} />
        }
        {
        isSending && 
            <Backdrop  open={isSending} >
                <CircularProgress color="inherit" />
            </Backdrop>
        }
        {confirmationModal && 
             <ModalComponent open={confirmationModal} onClose={onClose} onDeleteClick={onDataAction} data={selectedData}/>
        }
        {error && 
            <Grid container item xs={12}>
                <DivError>
                    {error}
                </DivError>
            </Grid>
        }
        </>
    )
}
export default Container;
