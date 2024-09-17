import { Header } from '@/components';
import { PATH_HOME } from '@/constants/private-routes';
import { Home } from '@/pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';

export function PrivateRoutes() {
  const routes = (
    <>
      <Route
        path={PATH_HOME}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </>
  );

  return (
    <Router>
      <div className='h-[100vh] gap-4'>
        <Header />
        <div className='flex-1 p-4'>
          <Routes>{routes}</Routes>
        </div>
      </div>
    </Router>
  );
}
