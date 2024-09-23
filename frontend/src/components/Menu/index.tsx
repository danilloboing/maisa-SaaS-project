import { useAuth, useMediaQuery } from '@/hooks';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';

export function Menu() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { onLogoutHandler } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        {isMobile ? <Sidebar /> : <Header />}
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <Button variant={'link'} onClick={onLogoutHandler}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
