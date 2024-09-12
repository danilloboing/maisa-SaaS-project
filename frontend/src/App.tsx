import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import APIErrorProvider from './contexts/ApiError';
import { AuthContextProvider } from './contexts/Auth';
import { ProjectRoutes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <APIErrorProvider>
        <AuthContextProvider>
          <Toaster />
          <ProjectRoutes />
        </AuthContextProvider>
      </APIErrorProvider>
    </ThemeProvider>
  );
}

export default App;
