import React, {useState, useEffect} from 'react';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

import DiffTable from './DiffTable';

const fetchData = () => {
  return api.getUsersDiff();
};

export const App = () => {

  const [loadingState, setLoadingState] = useState('loading');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Hook for handling loading states
  useEffect(() => {
    if(loadingState === "loading"){
      fetchData().then(data =>{
        const {data: tableData} = data;
        setData(tableData);
        setLoadingState("default");
      }).catch(error =>{
        const {error: errorText} = error;
        setError(errorText);
        setLoadingState("error");
      });
    }
    // return () => {
    //   cleanup
    // }
  },[loadingState]);

  const buttonText = loadingState === "error" ? "Retry" : "Load more";

  const errorAlert = loadingState === "error" && error ? <Alert severity="error">{error}</Alert> : null;

  const button = 
    loadingState === "loading" 
      ?  <CircularProgress />
      : <Button  variant="contained" color="primary" onClick={()=>setLoadingState('loading')}>{buttonText}</Button>;

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Typography>App should appear here</Typography>
        <DiffTable data={data}/>
        {
          errorAlert
        }
        {
          button
        }
        
      </Box>
    </Container>
  );
};

export default App;
