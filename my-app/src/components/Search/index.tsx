import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,CircularProgress, Button, TextField, Typography,Paper } from '@material-ui/core';
import styled from 'styled-components';


const ButtonStyled = styled(Button)`
  margin: 20px 0;
`;
const PaperStyled = styled(Paper)`
  margin: 20px 0;
  padding:10px;
  width:75%;
`;

export interface SearchProps {
  onSearchClick?(params?:string):void;
}

const Search: React.FC<SearchProps> = ({ onSearchClick}: SearchProps)  : JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  return (
    <Grid container justify="center" alignItems="center" alignContent="center" direction="row">
    <PaperStyled  >
      <Grid item sm={8} xs={12} container>
        <Typography component="h2">Search</Typography> 
      </Grid>
      <Grid item container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6}>
          <TextField placeholder="First Name" fullWidth onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField placeholder="Last Name" fullWidth onChange={(e)=>setLastName(e.target.value)} value={lastName} />
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={8} justify="flex-end" alignItems="center">
        <ButtonStyled variant="contained">
          Search
        </ButtonStyled>
      </Grid>
       
    </PaperStyled>
    </Grid>
  )
}

export default Search;