import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '../mode-toggle';

import { Button } from '../ui/button';
import { useAuth } from '@/hooks';
import { navItems } from '@/constants/nav-items';

export function Header() {
  const { onLogoutHandler } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 supports-[backdrop-filter]:bg-background/100'>
      <div className='container flex h-14 items-center'>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  href={item.link}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
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
