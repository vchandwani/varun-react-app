import axios from 'axios';
import {useState} from 'React';
import {EmployeeDataObject,DataOperation} from '../types/employee';

export interface UseEmployeeDetails {
    dataOperation(
        employee:EmployeeDataObject,
        operation:DataOperation
    ): void; 
    resetParams():void;
    isSending?:boolean;
    isSent?:boolean;
    error?:string|null;
}

const useEmployeeDetails = () : UseEmployeeDetails => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    //Reset parameters 
    const resetParams = () : void => {
        setIsSending(false);
        setIsSent(false);
        setError(null);
    }
    //Api Call for data operation
    const dataOperate = async (

    ) : Promise<string> => {

        return 'test'
    }

    // Load Employee data
    const dataOperation = async (
        employeeData : EmployeeDataObject,
        operation : DataOperation
    ): Promise<void> => {
        setIsSending(true);
        
    }

    return {
        dataOperation,
        resetParams,
        isSending,
        isSent,
        error
    }
}

export default useEmployeeDetails;