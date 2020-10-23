export interface EmployeeDataObject {
    first_name:string;
    last_name:string;
    date_of_birth:Date;
    email?:string;
    description?:string;
}

export interface DataOperation {
    GET:'get',
    POST:'post',
    PUT:'put',
    DELETE:'delete',
}