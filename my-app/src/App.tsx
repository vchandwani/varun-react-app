import React from 'react';
import './App.css';
import Container from './components/Container';
import {Grid} from '@material-ui/core';
import {Persistor} from 'redux-persist';
import {Store} from './store';
import {Provider} from 'react-redux';


interface AppProps {
  store:Store;
  sessionPersistor?: Persistor;
}

const  App =  (props:AppProps): JSX.Element => {
  console.log('props.store');
  console.log(props.store);
  return (
    <Grid className="App" container>
      <Provider store={props.store}>
        <Container /> 
      </Provider>
    </Grid>
  );
}

export default App;
