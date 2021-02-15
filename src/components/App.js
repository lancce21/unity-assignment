import React, {useState, useEffect} from 'react';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

import DiffTable from './DiffTable';

const fetchData = () => {
  return api.getUsersDiff();
};

export const App = () => {

  const [loadingState, setLoadingState] = useState('default');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    setLoadingState('loading');    
  }, []);

  useEffect(() => {
    if(loadingState === 'loading'){
      fetchData().then(result =>{
        const {data: resultData} = result;

        if(resultData) setData(d => d.concat(resultData));

        setLoadingState('default');

      }).catch(error =>{
        const {error: errorText} = error;
        setError(errorText);
        setLoadingState('error');
      });
    }
    
  }, [loadingState]);


  const buttonText = loadingState === "error" ? "Retry" : "Load more";

  const errorAlert = loadingState === "error" && error ? <Alert severity="error">{error}</Alert> : null;

  const button = 
    loadingState === "loading" 
      ?  <CircularProgress />
      : <Button  variant="contained" color="primary" onClick={()=>setLoadingState('loading')}>{buttonText}</Button>;

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" >
        <DiffTable data={data} sortDesc={sortDesc} onSort={()=> setSortDesc(!sortDesc)} />
        {
          errorAlert
        }
        <Box display="flex" justifyContent="center">{ button }</Box>
        
      </Box>
    </Container>
  );
};

export default App;
