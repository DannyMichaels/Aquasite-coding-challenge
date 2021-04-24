import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/currentUser';
import { loginUser } from '../../services/auth';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from '@material-ui/core';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const [, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogin = async (loginData) => {
    loginData.email = loginData?.email?.toLowerCase();

    const userData = await loginUser(loginData);

    dispatch({
      type: 'SET_USER',
      currentUser: userData,
    });

    history.push('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(formData);
  };

  return (
    <Grid container direction="column" className="centered">
      <Typography align="center" gutterBottom variant="h1">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="username">Email Address</InputLabel>
          <Input
            fullWidth
            id="email"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            id="password"
            fullWidth
            type={isPasswordShowing ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsPasswordShowing((prev) => !prev)}>
                  {isPasswordShowing ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <br />
        <Grid item container justify="center" align="center">
          <Button type="submit" color="primary" variant="outlined">
            Login
          </Button>
        </Grid>
      </form>
      <Box my={2}>
        <Link to="/login">Go to Login</Link>
      </Box>
    </Grid>
  );
}
