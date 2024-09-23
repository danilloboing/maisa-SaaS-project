import { Heading } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BriefcaseBusiness, CalendarHeart, ChartColumn, Users } from 'lucide-react';

export function Home() {
  const cards = [
    {
      title: 'Clientes',
      description: 'Gerencie seus clientes',
      icon: <Users size={48} />,
      link: '/clientes',
    },
    {
      title: 'Serviços',
      description: 'Gerencie seus serviços',
      icon: <BriefcaseBusiness size={48} />,
      link: '/servicos',
    },
    {
      title: 'Agenda',
      description: 'Gerencie sua agenda',
      icon: <CalendarHeart size={48} />,
      link: '/agenda',
    },
    {
      title: 'Relatórios',
      description: 'Veja seus resultados',
      icon: <ChartColumn size={48} />,
      link: '/relatorios',
    },
  ];
  return (
    <>
      <div className='text-center'>
        <Heading
          title='Bem-Vinda!'
          subtitle='Explore algumas funcionalidades'
        />
      </div>
      <div className='mt-7 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-row justify-between'>
              {card.icon}
              <Button variant='default' onClick={() => {window.location.href = card.link}}>
                Acessar
              </Button>
            </CardHeader>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
