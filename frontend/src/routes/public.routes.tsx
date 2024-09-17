import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { PATH_LOGIN } from '@/constants/public-routes';
import { Login } from '@/pages/Login';

export function PublicRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={PATH_LOGIN} element={<Login />} />
          <Route path='*' element={<Navigate to={PATH_LOGIN} />} />
        </Routes>
      </Router>
    </>
  );
}
