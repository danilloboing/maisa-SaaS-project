import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ModeToggle } from '../mode-toggle';
import { Menu } from 'lucide-react';

import { Button } from '../ui/button';
import { navItems } from '@/constants/nav-items';

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className='flex flex-row justify-between px-5 pt-5'>
      <Sheet open={open} onOpenChange={handleToggle}>
        <SheetTrigger asChild>
          <Button variant='ghost' onClick={handleToggle} className='p-0'>
            <Menu className='w-6 h-6' />
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className='w-64'>
          <div className='p-4'>
            <NavigationMenu>
              <NavigationMenuList className='flex flex-col space-y-2'>
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
              <Button variant='link' className='p-0' onClick={() => alert('Logout')}>
                Sair
              </Button>
              </NavigationMenuList>
            </NavigationMenu>
            <div className='fixed '>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <ModeToggle />
    </div>
  );
}
