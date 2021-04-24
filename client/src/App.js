import { useEffect } from 'react';
import { useStateValue } from './context/currentUser';
import AppRouter from './router/AppRouter';
import { verifyUser } from './services/auth';

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const onVerifyUser = async () => {
      const userData = await verifyUser();
      dispatch({ type: 'SET_USER', currentUser: userData });
    };
    onVerifyUser();
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
