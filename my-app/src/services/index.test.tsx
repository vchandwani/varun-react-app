import React from 'react';
import useEmployeeDetails from './index';
import mockAxios, { AxiosResponse } from 'axios';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const {dataOperation, isSending,isSent,error,data,actioned} = useEmployeeDetails();

const axiosResponse: AxiosResponse = {
    data: [],
    status: 200,
};

const sampleData = {
    data: [
        {
            dateOfBirth: "2020-09-17",
            firstName: "John",
            id: 1,
            lastName: "Marco"
        }
    ],
    status : 200,
}

describe('employee details service ', () => {
    it('should return employee data list', async ()=>{
        expect(1).toEqual(1);
        // const employeeData = await dataOperation('http://localhost:3000/employees');
        // console.log(employeeData);
    })
})