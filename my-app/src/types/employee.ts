export interface EmployeeDataObject {
    firstName:string;
    lastName:string;
    dateOfBirth:Date|null;
    id?:number;
}
export interface SearchParams {
    firstName?:string;
    lastName?:string; 
}

export enum DataOperationRequest {
    GET ='get',
    POST = 'post',
    PUT='put',
    DELETE='delete',
}

export enum  DataOperation {
    READ ='read',
    ADD ='add',
    EDIT = 'edit',
    DELETE='delete',
}

export enum UrlLink {
    REQUEST_URL='http://localhost:3000/employees'
}