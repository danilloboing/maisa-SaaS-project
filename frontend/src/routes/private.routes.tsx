import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  PATH_CUSTOMERS,
  PATH_HOME,
  PATH_REPORTS,
  PATH_SCHEDULE,
  PATH_SERVICES,
} from '@/constants/private-routes';
import { PrivateRoute } from './private-route';
import { Footer, Header, Sidebar } from '@/components';
import { Card } from '@/components/ui/card';
import { Home } from '@/pages/Home';
import { useMediaQuery } from '@/hooks';
import { Services } from '@/pages/Services';
import PagesProvider from '@/contexts/PagesContext';
import { ServicesContextProvider } from '@/contexts/ServicesContext';
import { Customers } from '@/pages/Customers';
import { CustomersContextProvider } from '@/contexts/CustomersContext';
import { AgendaContextProvider } from '@/contexts/AgendaContext';
import Agenda from '@/pages/Agenda';
import Reports from '@/pages/Reports';

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
      <Route
        path={PATH_CUSTOMERS}
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />
      <Route
        path={PATH_SCHEDULE}
        element={
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
        }
      />
      <Route
        path={PATH_REPORTS}
        element={
          <PrivateRoute>
            <Reports />
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
            <AgendaContextProvider>
              <ServicesContextProvider>
                <CustomersContextProvider>
                  <Routes>{routes}</Routes>
                </CustomersContextProvider>
              </ServicesContextProvider>
            </AgendaContextProvider>
          </PagesProvider>
        </Card>
        <Footer />
      </div>
    </Router>
  );
}
