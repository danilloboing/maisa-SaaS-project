import { useAPIError, useAuth } from '@/hooks';

import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes';
import { useEffect } from 'react';

export function ProjectRoutes() {
  const { loggedInUser } = useAuth();

  const { addError, error } = useAPIError();

  useEffect(() => {
    if (error) {
      addError(error);
    }
  }, [error, addError]);

  return loggedInUser ? <PrivateRoutes /> : <PublicRoutes />;
}
