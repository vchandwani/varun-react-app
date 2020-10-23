import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeData from './components/Table';
import {Grid,Typography} from '@material-ui/core';

function App() {
  return (
    <Grid className="App" container>
      <Grid item xs={12} container>
        <Typography component="h1" variant="h1">React App</Typography>
      </Grid>
      <Grid item xs={12} container>
        <EmployeeData />
       </Grid>
    </Grid>
  );
}

export default App;
