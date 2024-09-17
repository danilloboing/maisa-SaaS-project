import { PATH_LOGIN } from '@/constants/public-routes';
import { useAuth } from '@/hooks';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { loggedInUser } = useAuth();

  return loggedInUser ? children : <Navigate to={PATH_LOGIN} />;
}
