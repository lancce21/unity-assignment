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

const compareDataDesc =(a, b) =>{
  if (!a?.timestamp || !b?.timestamp) return 0;
  const {timestamp: t1} = a;
  const {timestamp: t2} = b;

  return t1 > t2 ? -1 : t2 > t1 ? 1 : 0;
};

const compareDataAsc =(a, b) =>{
  if (!a?.timestamp || !b?.timestamp) return 0;
  const {timestamp: t1} = a;
  const {timestamp: t2} = b;

  return t1 > t2 ? 1 : t2 > t1 ? -1 : 0;
};

export const App = () => {

  const [loadingState, setLoadingState] = useState('default');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    api.getUsersDiff()
      .then(result =>{
        const {data} = result;
        setData(data.sort(compareDataDesc));
        setLoadingState('default');
      }).catch(error =>{
        const {error: errorText} =error;
        setError(errorText);
        setLoadingState('error');
      });
    
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

  useEffect(() => {
    setData(data.sort(sortDesc? compareDataDesc : compareDataAsc))

  }, [sortDesc, data]);


  const buttonText = loadingState === "error" ? "Retry" : "Load more";

  const errorAlert = loadingState === "error" && error ? <Alert severity="error">{error}</Alert> : null;

  const button = 
    loadingState === "loading" 
      ?  <CircularProgress />
      : <Button  variant="contained" color="primary" onClick={()=>setLoadingState('loading')}>{buttonText}</Button>;

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <DiffTable data={data} sortDesc={sortDesc} onSort={()=> setSortDesc(!sortDesc)}/>
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
