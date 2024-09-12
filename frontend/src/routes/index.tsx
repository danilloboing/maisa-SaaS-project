import { PATH_HOME } from '@/constants/private-routes';
import { PATH_LOGIN } from '@/constants/public-routes';
import { useAuth } from '@/hooks';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

export function ProjectRoutes() {
  const { isAuthenticated, loggedInUser } = useAuth();
  console.log(isAuthenticated, loggedInUser);

  return (
    <Router>
      <Routes>
        {loggedInUser ? (
          <Route path={PATH_HOME} element={<Home />} />
        ) : (
          <>
            <Route path={PATH_LOGIN} element={<Login />} />
            <Route path='*' element={<Navigate to={PATH_LOGIN} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
