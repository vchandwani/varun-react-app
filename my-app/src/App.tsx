import React from 'react';
import './App.css';
import Container from './components/Container';
import {Grid} from '@material-ui/core';

function App() {
  return (
    <Grid className="App" container>
      <Container /> 
    </Grid>
  );
}

export default App;
