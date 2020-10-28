import {EmployeeDataObject,DataOperation} from '../../../../types/employee';
import axios from 'axios';

export interface EmployeeDataAPI {
    loadEmployeeData(
        url:string,
        request:DataOperation,
        dataObject?:EmployeeDataObject
    ): Promise<EmployeeDataResponseData>
}

// APi result
export interface EmployeeDataResponseData {
   data?:EmployeeDataObject[];
   error?:string;
   operation?:string;
}


const employeeData: EmployeeDataAPI = {
    /**
     * Load Employee Data Api
     */
    loadEmployeeData: async (
        url,
        request,
        dataObject
    ) :  Promise<EmployeeDataResponseData>=> {
       if(request === DataOperation.ADD) {
            try{
                const res= await axios.post(url, dataObject);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Something went wrong'};
                }
            } catch (err){
                return {error : 'Something went wrong'};
            } 
        }  else if(request === DataOperation.EDIT) {
            try{
                let urlFormat : string = `${url}/${dataObject?.id}`;
                const res= await axios.put(urlFormat, dataObject);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Something went wrong'};
                }
            } catch (err){
                return {error : 'Something went wrong'};
            } 
        }  else if(request === DataOperation.DELETE) {
            try{
                let urlFormat : string = `${url}/${dataObject?.id}`;
                const res= await axios.delete(urlFormat);
                const {data} = res;
                if(data){
                    return {operation : 'success'};
                } else {
                    return {error : 'Something went wrong'};
                }
            } catch (err){
                return {error : 'Something went wrong'};
            } 
        } else {
            try{
                const res= await axios.get(url);
                const {data} = res;
                return {data : data};
            } catch (err){
                return {error : 'Something went wrong'};
            } 
        }
    }
}


export default employeeData;