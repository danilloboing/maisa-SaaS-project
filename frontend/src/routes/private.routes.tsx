import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { PATH_HOME } from '@/constants/private-routes';
import { PrivateRoute } from './private-route';
import { Footer, Header, Sidebar } from '@/components';
import { Card } from '@/components/ui/card';
import { Home } from '@/pages/Home';
import { useMediaQuery } from '@/hooks';

export function PrivateRoutes() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  console.log(isMobile);
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
      <div className={`h-[100vh] flex flex-col`}>
        {isMobile ? <Sidebar /> : <Header />}
        <Card className='m-5 p-4 flex-1 flex-grow'>
          <Routes>{routes}</Routes>
        </Card>
        <Footer />
      </div>
    </Router>
  );
}
