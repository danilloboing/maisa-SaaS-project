import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import APIErrorProvider from './contexts/ApiError';
import { ProjectRoutes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <APIErrorProvider>
        {/* Colocar Auth Context aqui */}
        <Toaster />
        <ProjectRoutes />
      </APIErrorProvider>
    </ThemeProvider>
  );
}

export default App;
