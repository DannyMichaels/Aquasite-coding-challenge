import { Route, Switch } from 'react-router-dom';
import Register from '../screens/auth_screens/Register';
import Login from '../screens/auth_screens/Login';
import PostRegisterForm from '../screens/main/PostRegisterForm';
import Home from '../screens/main/Home';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/form" component={PostRegisterForm} />

    <PrivateRoute exact path="/" component={Home} />
  </Switch>
);

export default AppRouter;
