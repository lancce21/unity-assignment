import React, {useState, useEffect} from 'react';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const fetchData = () => {
  return api.getUsersDiff();
};

export const App = () => {

  const [loadingState, setLoadingState] = useState('loading');
  const [data, setData] = useState(null);

  // Hook for handling loading states
  useEffect(() => {
    if(loadingState === "loading"){
      fetchData().then(data =>{
        setData(data);
        setLoadingState("default");
      }).catch(error =>{
        setLoadingState("error");
      });
    }
    // return () => {
    //   cleanup
    // }
  },[loadingState]);


  

  const buttonText = loadingState === "error" ? "Retry" : "Load more";

  const button = 
    loadingState === "loading" 
      ?  <CircularProgress />
      : <Button  variant="contained" color="primary" onClick={()=>setLoadingState('loading')}>{buttonText}</Button>;


  console.log("data",data);

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Typography>Your app should show up here.</Typography>
        {
          button
        }
      </Box>
    </Container>
  );
};

export default App;
