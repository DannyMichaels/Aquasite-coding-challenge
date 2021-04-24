import { useState, useEffect } from 'react';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useStateValue } from '../../context/currentUser';
import { registerUser } from '../../services/auth';

export default function PostRegisterForm({ location: { state } }) {
  const history = useHistory();

  useEffect(() => {
    const check = async () => {
      if (!state?.dataProps) {
        history.push('/register');
      }
    };
    check();

    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    username: state?.dataProps?.username,
    password: state?.dataProps?.password,
    password_confirmation: state?.dataProps?.password_confirmation,
    flow: '',
    pressure: '',
  });

  const [, dispatch] = useStateValue();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const updatedUser = await registerUser(formData);

    await dispatch({ type: 'SET_USER', currentUser: updatedUser });
    history.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate();
  };

  return (
    <Grid container direction="column" className="centered">
      <Typography variant="h1" gutterbottom>
        Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Input
            fullWidth
            type="number"
            placeholder="flow"
            name="flow"
            required
            value={formData.flow}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Input
            fullWidth
            type="number"
            required
            placeholder="pressure"
            name="pressure"
            value={formData.pressure}
            onChange={handleChange}
          />
        </Grid>
        <br />
        <Grid item container justify="center" align="center">
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
