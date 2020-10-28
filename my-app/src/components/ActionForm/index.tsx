import React from 'react';
import styled from 'styled-components';
import {EmployeeDataObject, DataOperation} from '../../types/employee';
import {Grid, TextField, Button } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';


const StyledForm = styled(Form)`
  margin: 10px;
  max-width:680px;
  width:100%;
`;
const StyledButton = styled(Button)`
  margin: 10px;
`;

export interface ActionFormProps {
  data?: EmployeeDataObject;
  onDataAction(data?:EmployeeDataObject,operation?:DataOperation):void;
  isEdit?:boolean;
  onCancel():void;
}

const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  dateOfBirth:  Yup.date()
  .required('Required')
  .required('Date of birth required'),
});


const ActionForm: React.FC<ActionFormProps> = ({ data,onDataAction,isEdit,onCancel}: ActionFormProps)  : JSX.Element => {
  const initialValues:EmployeeDataObject = {
    firstName: (isEdit && data?.firstName) ? data?.firstName :'',
    lastName: (isEdit && data?.lastName) ? data?.lastName : '',
    dateOfBirth: (isEdit && data?.dateOfBirth) ? data?.dateOfBirth : null,
    id : isEdit ? data?.id : undefined 
  }
  return (
    <Grid container justify="center" alignContent="center"  direction="row" data-test="actionForm" item xs={12}>
       <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={values => {
          // same shape as initial values
          onDataAction(values,isEdit? DataOperation.EDIT:DataOperation.ADD )
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values}) => (
          <StyledForm>
              <Field name={"firstName"}>
              {({ field, form, meta }: FieldProps) => (
                <TextField
                  {...field}
                  variant="filled"
                  value={field.value || ''}
                  fullWidth
                  id={"firstName"}
                  label={"First name"}
                  error={meta?.touched && meta.error !== undefined}
                  helperText={
                    meta?.touched && meta?.error ? meta.error : ''
                  }
                  onBlur={handleBlur}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    handleChange(e);
                  }}
                />
              )}
            </Field> 
            <Field name={"lastName"}>
              {({ field, form, meta }: FieldProps) => (
                <TextField
                  {...field}
                  variant="filled"
                  value={field.value || ''}
                  fullWidth
                  id={"lastName"}
                  label={"Last name"}
                  error={meta?.touched && meta.error !== undefined}
                  helperText={
                    meta?.touched && meta?.error ? meta.error : ''
                  }
                  onBlur={handleBlur}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    handleChange(e);
                  }}
                />
              )}
            </Field> 

            <Field name={"dateOfBirth"}>
              {({ field, form, meta }: FieldProps) => (
                 <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    id={"dateOfBirth"}
                    value={field.value || ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={meta?.touched && meta.error !== undefined}
                    helperText={
                      meta?.touched && meta?.error ? meta.error : ''
                    }
                  />
              )}
            </Field> 
            <Grid item container xs={12} justify="flex-end">
             
              <StyledButton  variant="contained" onClick={onCancel}>
                Cancel
              </StyledButton>
              <StyledButton type="submit" variant="outlined">
                Submit
              </StyledButton>
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </Grid>
  )
}

export default ActionForm;