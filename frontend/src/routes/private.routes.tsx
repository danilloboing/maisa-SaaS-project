import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { PATH_HOME, PATH_SERVICES } from '@/constants/private-routes';
import { PrivateRoute } from './private-route';
import { Footer, Header, Sidebar } from '@/components';
import { Card } from '@/components/ui/card';
import { Home } from '@/pages/Home';
import { useMediaQuery } from '@/hooks';
import { Services } from '@/pages/Services';
import PagesProvider from '@/contexts/Pages';
import { ServicesContextProvider } from '@/contexts/Services';

export function PrivateRoutes() {
  const isMobile = useMediaQuery('(max-width: 768px)');
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
      <Route
        path={PATH_SERVICES}
        element={
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        }
      />
    </>
  );

  return (
    <Router>
      <div className={`h-[100vh] flex flex-col`}>
        {isMobile ? <Sidebar /> : <Header />}
        <Card className='m-5 p-4 flex-1 flex-grow'>
          <PagesProvider>
            <ServicesContextProvider>
              <Routes>{routes}</Routes>
            </ServicesContextProvider>
          </PagesProvider>
        </Card>
        <Footer />
      </div>
    </Router>
  );
}
