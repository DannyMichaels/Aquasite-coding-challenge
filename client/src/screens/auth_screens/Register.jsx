import { useState } from 'react';
import { useHistory } from 'react-router';
import { registerUser } from '../../services/auth';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, IconButton, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Register() {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [errors, setErrors] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const history = useHistory();
  let setUser = '';

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (registerData) => {
    if (password !== passwordConfirm) {
      return setErrors((prevState) => ({
        ...prevState,

        'password and password confirm': 'do not match!',
      }));
    }

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
              style={{
                margin: '0 auto',
                maxWidth: '30em',
                padding: '20px',
                backgroundColor: 'red',
              }}>
              {/* gotta love ruby hashes <3 */}
              {Object.entries(errors).map(([property, error]) => (
                <Grid>
                  <Typography style={{ color: 'white' }}>
                    {`Error: ${
                      property.includes('username')
                        ? property.replace('username', 'username / email')
                        : property
                    } ${error}`}
                  </Typography>
                  <br />
                </Grid>
              ))}
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
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="password confirm"
              type={isPasswordShowing ? 'text' : 'password'}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
