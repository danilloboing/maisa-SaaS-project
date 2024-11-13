import * as React from 'react';
import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value?: string; // Formato YYYY-MM-DD
  onChange?: (date: string) => void;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  className,
  disabled = false,
}: DatePickerProps) {
  // Converte string YYYY-MM-DD para Date
  const getDateFromString = (dateStr: string | undefined): Date | undefined => {
    if (!dateStr) return undefined;
    try {
      return parse(dateStr, 'yyyy/MM/dd', new Date());
    } catch {
      return undefined;
    }
  };

  // Converte Date para string YYYY-MM-DD
  const getStringFromDate = (date: Date | undefined): string => {
    if (!date) return '';
    return format(date, 'yyyy/MM/dd');
  };

  // Manipula a mudança de data
  const handleDateChange = (newDate: Date | undefined) => {
    if (onChange) {
      onChange(newDate ? getStringFromDate(newDate) : '');
    }
  };

  // Data atual como objeto Date (para o componente Calendar)
  const currentDate = getDateFromString(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {currentDate ? (
            format(currentDate, 'dd/MM/yyyy') // Formato de exibição BR
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 z-[3050]'>
        <Calendar
          mode='single'
          selected={currentDate}
          onSelect={handleDateChange}
          disabled={(date) =>
            date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
