import { useState } from 'react';
import { useHistory } from 'react-router';
import { registerUser } from '../../services/auth';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';

export default function Register() {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);

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
      return errors.length > 0
        ? setErrors((prevState) => [
            ...prevState,
            {
              'password and password confirm': 'do not match!',
            },
          ])
        : setErrors({ 'password and password confirm': 'do not match!' });
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
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        spacing={2}
        justify="center"
        align="center"
        className="centered">
        {/* gotta love ruby hashes <3 */}

        {errors.length > 0 && (
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
        )}

        <Grid item>
          <input
            name="username"
            value={username}
            placeholder="username / email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <input
            name="password"
            value={password}
            placeholder="password"
            type="password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <input
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="password"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
