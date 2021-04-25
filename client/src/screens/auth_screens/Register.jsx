import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import Input from '@material-ui/core/Input';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../services/auth';

const checkEmailValidity = (email) => {
  if (typeof email !== undefined) {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      return true;
    }
    if (pattern.test(email)) {
      return false;
    }
  }
};

export default function Register() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [errAmt, setErrAmt] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });

  const { username, password, password_confirmation } = formData;

  const history = useHistory();

  useEffect(() => {
    const fetchUsersOnMount = async () => {
      const usersData = await getAllUsers();
      setAllUsers(usersData);
    };
    fetchUsersOnMount();
  }, []);

  useEffect(() => {
    setErrAmt(errors.length);
  }, [errors]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkErrors = useCallback(() => {
    let errNum = 0;

    if (password !== password_confirmation) {
      if (!errors.find(({ id }) => id === 0)) {
        setErrors((prevState) => [
          ...prevState,
          {
            id: 0,
            'Password and Password Confirmation': 'do not match!',
          },
        ]);
        errNum += 1;
      }
    } else {
      let foundErr = errors.find(({ id }) => id === 0);

      setErrors((prevState) => prevState.filter(({ id }) => id !== 0));
      if (foundErr?.id === 0) errNum -= 1;
    }

    if (password.length < 6) {
      if (!errors.find(({ id }) => id === 1)) {
        setErrors((prevState) => [
          ...prevState,
          {
            id: 1,
            Password: 'has to be 6 characters long!',
          },
        ]);
        errNum += 1;
      }
    } else {
      let errFound = errors.find(({ id }) => id === 1);

      setErrors((prevState) => prevState.filter(({ id }) => id !== 1));
      if (errFound?.id) errNum -= 1;
    }

    if (checkEmailValidity(username)) {
      if (!errors.find(({ id }) => id === 2)) {
        setErrors((prevState) => [
          ...prevState,
          {
            id: 2,
            Email: 'is invalid!',
          },
        ]);
      }
      errNum += 1;
    } else {
      const errFound = errors.find(({ id }) => id === 2);

      setErrors((prevState) => prevState.filter(({ id }) => id !== 2));
      if (errFound?.id) errNum -= 1;
    }

    if (allUsers.find((user) => user.username === username)) {
      if (!errors.find(({ id }) => id === 3)) {
        setErrors((prevState) => [
          ...prevState,
          {
            id: 3,
            Email: 'is already taken!',
          },
        ]);
      }

      errNum += 1;
    } else {
      const errFound = errors.find(({ id }) => id === 3);

      setErrors((prevState) => prevState.filter(({ id }) => id !== 3));

      if (errFound?.id) errNum -= 1;
    }

    return errNum;
  }, [errors, username, password, password_confirmation, allUsers]);

  const onGoToNextStep = useCallback(
    async (errNum) => {
      setIsRefreshing(true);

      setTimeout(async () => {
        setIsRefreshing(false);
        if (errNum <= 0) {
          history.push({
            pathname: '/form',
            state: {
              dataProps: {
                ...formData,
              },
            },
          });
        }
      }, 3000);
    },
    [errAmt, errors, history, formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errNum = checkErrors();
    console.log({ errNum });

    errNum <= 0 && (await onGoToNextStep(errNum));
  };

  return (
    <Grid container direction="column" className="centered">
      {!isRefreshing ? (
        <>
          <form onSubmit={handleSubmit}>
            <Typography align="center" gutterBottom variant="h1">
              Register
            </Typography>
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
                    {errors.map((error, key) => (
                      <li
                        style={{ color: 'red', listStyleType: 'none' }}
                        key={key}>
                        <span style={{ color: 'red' }}> * </span>
                        {Object.entries(error).map(
                          ([k, v]) => k !== 'id' && `${k}: ${v}`
                        )}
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
                  required
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
                  required
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
                  required
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
          <Box my={2}>
            <Link to="/login">Go to Login</Link>
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
