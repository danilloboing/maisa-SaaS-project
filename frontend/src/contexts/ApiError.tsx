import { createContext, useState, useCallback } from 'react';

import { ContextProps } from '@/types/context';
import { APIErrorContextValues } from '@/types/api-error';
import { useToast } from '@/hooks';

export const APIErrorContext = createContext<APIErrorContextValues | null>(
  null
);

export default function APIErrorProvider({ children }: ContextProps) {
  const [error, setError] = useState('');
  const { errorToast } = useToast();

  function removeError() {
    setError('');
  }

  function addError(message: string) {
    errorToast(message);
  }

  return (
    <APIErrorContext.Provider
      value={{
        error,
        removeError: useCallback(() => removeError(), []),
        addError: useCallback((message: string) => addError(message), []),
      }}
    >
      {children}
    </APIErrorContext.Provider>
  );
}
