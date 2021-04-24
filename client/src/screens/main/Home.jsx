import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useStateValue } from '../../context/currentUser';
import { removeToken } from '../../services/auth';

export default function Home() {
  const [{ currentUser }, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: 'REMOVE_USER' });
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/login');
  };

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Grid container justify="center" align="center" direction="column">
        <Typography variant="h1">My Data</Typography>

        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      </Grid>
    </>
  );
}
