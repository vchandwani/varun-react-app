import React, {useState} from 'react';
import {Grid, Button, TextField, Typography,Paper } from '@material-ui/core';
import styled from 'styled-components';
import {SearchParams} from '../../types/employee';

const ButtonStyled = styled(Button)`
  margin: 20px 0;
`;
const GridStyled = styled(Grid)`
  margin: 20px 0;
`;
const PaperStyled = styled(Paper)`
  margin: 20px 0;
  padding:10px;
  width:75%;
`;

export interface SearchProps {
  onSearchClick(searchParams?:SearchParams):void;
 }

const Search: React.FC<SearchProps> = ({ onSearchClick}: SearchProps)  : JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const onClick = () : void => {
    let searchParams:SearchParams ={};
    if(firstName) {
      searchParams.firstName = firstName;
    }
    if(lastName) {
      searchParams.lastName = lastName;
    } 
    onSearchClick(searchParams);
  }

  return (
    <Grid container justify="center" alignItems="center" alignContent="center" direction="row" data-test="searchContainer">
      <PaperStyled  >
        <Grid item sm={8} xs={12} container data-test="searchHeader">
          <Typography component="h4" variant="h4">Search (will match either first or last name )</Typography> 
        </Grid>
        <GridStyled item container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6}>
            <TextField placeholder="First Name" data-test="firstName" fullWidth onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Last Name" data-test="lastName" fullWidth onChange={(e)=>setLastName(e.target.value)} value={lastName} />
          </Grid>
        </GridStyled>
        <Grid item container xs={12} justify="flex-end" alignItems="center"> 
          <ButtonStyled variant="contained" onClick={onClick} data-test="searchButton">
            Search
          </ButtonStyled>
        </Grid>
        
      </PaperStyled>
    </Grid>
  )
}

export default Search;