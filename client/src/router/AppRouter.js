import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => (
  <Switch>
    {/* <Route exact path="/login" component={Login} /> */}
    {/* <Route exact path="/register" component={Register} /> */}
    {/* <PrivateRoute exact path="/" component={Home} /> */}
  </Switch>
);

export default AppRouter;
