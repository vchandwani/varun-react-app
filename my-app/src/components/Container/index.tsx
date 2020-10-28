

import React, {useEffect,useState} from 'react';
import EmployeeData from '../Table';
import ActionForm from '../ActionForm';
import Search from '../Search';
import ModalComponent from '../Modal';
import {Grid,Typography,CircularProgress,Backdrop} from '@material-ui/core';
import {EmployeeDataObject,UrlLink,DataOperation,SearchParams} from '../../types/employee';
import styled from 'styled-components';
import {loadEmployeeData} from '../../store/modules/employeeData';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/reducers';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';

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
    const [open, setOpen] = useState<boolean>(false);
    const [employeeDataList, setEmployeeDataList] = useState<EmployeeDataObject[]>([]);
    const dispatch = useDispatch();
    const {isLoading,isLoaded,employeeData, error, isActioned} = useSelector(
        (state:RootState) => state.employeeData
    );

    useEffect(() => {
        //Load data on initial load
        dispatch(loadEmployeeData(
            UrlLink.REQUEST_URL,DataOperation.READ
        ));
      }, []);

    useEffect(() => {
        //Load data on initial load
        employeeData && setEmployeeDataList(employeeData);
      }, [employeeData]);
      
    useEffect(() => {
        //Load data on initial load
        if(isLoaded && !isLoading && isActioned){
            setIsDefaultView(true);
            setActionFormView(false);
            setDisplayMessage('Success');
            setOpen(true);
            dispatch(loadEmployeeData(
                UrlLink.REQUEST_URL,DataOperation.READ
            ));
        }
      }, [isLoading,isLoaded,isActioned]);
    
    const cancelClick = () : void => {
        setIsDefaultView(true);
        setActionFormView(false);
        setDisplayMessage('');
        setOpen(false);
    }
      
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
            dispatch(loadEmployeeData(
                UrlLink.REQUEST_URL,DataOperation.ADD,data
            ));
         } else if (operation === DataOperation.EDIT) {
            dispatch(loadEmployeeData(
                UrlLink.REQUEST_URL,DataOperation.EDIT,data
            ));
        } else if (operation === DataOperation.DELETE) {
            setIsConfirmationModal(false);
            dispatch(loadEmployeeData(
                UrlLink.REQUEST_URL,DataOperation.DELETE,data
            ));
        }
    }
    const onSearchClick = (searchParams?:SearchParams) : void => {
        let searchedEmployeeData : EmployeeDataObject[] = [];
        if(searchParams?.firstName || searchParams?.lastName) {
            // Search value
            employeeData?.map((employeeDataVal:EmployeeDataObject)=>{
                if(
                    (searchParams?.firstName && employeeDataVal?.firstName?.toLowerCase().indexOf(searchParams?.firstName?.toLowerCase()) > -1)  ||
                    (searchParams?.lastName && employeeDataVal?.lastName?.toLowerCase().indexOf(searchParams?.lastName?.toLowerCase()) > -1)
                ){
                    searchedEmployeeData.push(employeeDataVal);
                }
            });
            setEmployeeDataList(searchedEmployeeData);
        } else {
            //Reset to old data set
            employeeData && setEmployeeDataList(employeeData);
        }
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
                    <Collapse in={open}>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        {displayMessage}
                     </Collapse>
                </DivSuccess>
            </Grid>
        }
        {isDefaultView && employeeDataList && 
        <Grid item xs={12} container data-test="employeeData">
            <EmployeeData data={employeeDataList} onActionClick={onActionClick}  />
        </Grid>
        }
        {actionFormView && 
            <Grid item xs={12} container data-test="employeeData">
                <ActionForm data-test="actionForm" data={selectedData}  onDataAction={onDataAction} onCancel={cancelClick} isEdit={isEdit} />
            </Grid>
        }
        {
        isLoading && 
            <Backdrop  open={isLoading} >
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
