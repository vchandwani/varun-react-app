import axios from 'axios';
import React, {useState} from 'react'
import {EmployeeDataObject,DataOperation} from '../types/employee';

export interface UseEmployeeDetails {
    dataOperation(
        url:string,
        request?:DataOperation,
        employee?:EmployeeDataObject,
    ): void; 
    resetParams():void;
    isSending?:boolean;
    isSent?:boolean;
    error?:string|null;
    data?:EmployeeDataObject[]|null;
    actioned?:boolean;
}

interface ResultData {
    data ?: EmployeeDataObject[];
    error?: string;
    operation?:string;
}
const useEmployeeDetails = () : UseEmployeeDetails => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<EmployeeDataObject[]|null>(null);
    const [actioned, setActioned] = useState<boolean>(false);

    //Reset parameters 
    const resetParams = () : void => {
        setIsSending(false);
        setIsSent(false);
        setError(null);
        setData(null);
        setActioned(false);
    }
    //Api Call for data request
    const dataOperate = async (
        url:string,
        request?:DataOperation,
        dataObject?:EmployeeDataObject,
    ) : Promise<ResultData|undefined> => {
        if(request === DataOperation.READ){
            try{
                const res= await axios.get(url);
                const {data} = res;
                return {data : data};
            } catch (err){
                return {error : 'Somethign went wrong'};
            } 
        } else if(request === DataOperation.ADD) {
            try{
                const res= await axios.post(url, dataObject);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Somethign went wrong'};
                }
            } catch (err){
                return {error : 'Somethign went wrong'};
            } 
        }  else if(request === DataOperation.EDIT) {
            try{
                let urlFormat : string = `${url}/${dataObject?.id}`;
                const res= await axios.put(urlFormat, dataObject);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Somethign went wrong'};
                }
            } catch (err){
                return {error : 'Somethign went wrong'};
            } 
        }  else if(request === DataOperation.DELETE) {
            try{
                let urlFormat : string = `${url}/${dataObject?.id}`;
                const res= await axios.delete(urlFormat);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Somethign went wrong'};
                }
            } catch (err){
                return {error : 'Somethign went wrong'};
            } 
        }
     }

    // Load Employee data
    const dataOperation = async (
        url : string,
        request ?: DataOperation,
        employeeData ?: EmployeeDataObject,
    ): Promise<void> => {
        setIsSending(true);
        setIsSent(false);
        const employeeList = await dataOperate(url,request? request : DataOperation.READ,employeeData);
        if(employeeList?.data){
            setData(employeeList?.data);
            setIsSending(false);
            setIsSent(true);
            setActioned(false);
        } else if (employeeList?.operation ==='success'){
            setIsSending(false);
            setIsSent(true);
            setActioned(true);
        } else if (employeeList?.error){
            setError(employeeList?.error);
            setIsSending(false);
            setIsSent(false);
            setActioned(false);
        }
    }   

    return {
        dataOperation,
        resetParams,
        isSending,
        isSent,
        error,
        data,
        actioned
    }
}

export default useEmployeeDetails;