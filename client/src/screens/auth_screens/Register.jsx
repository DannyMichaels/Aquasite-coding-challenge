import { useState } from 'react';
import { useHistory } from 'react-router';
import { registerUser } from '../../services/auth';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, IconButton, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Register() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [errors, setErrors] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });

  const { username, password, password_confirmation } = formData;

  const history = useHistory();
  let setUser = '';

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (property, error) => {
    if (property.includes('username')) {
      property.replace('username', 'username / email');
    }

    if (property.includes('password_confirmation')) {
      property.replace('password_confirmation', 'password confirm');
    }

    return `${property} ${error}`;
  };

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData);

    history.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister(formData);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="centered">
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          spacing={2}
          justify="center"
          align="center">
          {errors ? (
            <Grid
              item
              container
              direction="column"
              justify="center"
              spacing={2}
              style={{
                margin: '0 auto',
                maxWidth: '60em',
                padding: '20px',
                color: '#000',
              }}>
              <ul style={{ textAlign: 'left' }}>
                {/* gotta love ruby hashes <3 */}
                {Object.entries(errors).map(([property, error]) => (
                  <li style={{ color: 'red', listStyleType: 'none' }}>
                    <span style={{ color: 'red' }}> * </span>
                    {handleError(property, error)}
                  </li>
                ))}
              </ul>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item>
            <Input
              fullWidth
              name="username"
              value={username}
              placeholder="username / email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Input
              fullWidth
              name="password"
              value={password}
              placeholder="password"
              type={isPasswordShowing ? 'text' : 'password'}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsPasswordShowing((prev) => !prev)}>
                    {isPasswordShowing ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item>
            <Input
              fullWidth
              name="password_confirmation"
              value={password_confirmation}
              placeholder="password confirm"
              type={isPasswordShowing ? 'text' : 'password'}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsPasswordShowing((prev) => !prev)}>
                    {isPasswordShowing ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <br />
          <Grid item>
            <Button type="submit" color="primary" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
