import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import React from 'react';
import {
  Period,
  TimePickerHHmmProps,
  TimePickerType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from './time-picker-utils';

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);
    const [prevIntKey, setPrevIntKey] = React.useState<string>('0');

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [flag]);

    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker);
    }, [date, picker]);

    const calculateNewValue = (key: string) => {
      /*
       * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
       * The second entered digit will break the condition and the value will be set to 10-12.
       */
      if (picker === '12hours') {
        if (flag && calculatedValue.slice(1, 2) === '1' && prevIntKey === '0')
          return '0' + key;
      }

      return !flag ? '0' + key : calculatedValue.slice(1, 2) + key;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key);

        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault();
          onChange?.(e);
        }}
        type={type}
        inputMode='decimal'
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = 'TimePickerInput';

export const TimePickerHHmm = ({
  value = "00:00:00",  // Valor padrão para quando value for undefined
  onChange,
  className,
  disabled = false,
}: TimePickerHHmmProps) => {
  const hoursRef = React.useRef<HTMLInputElement>(null);
  const minutesRef = React.useRef<HTMLInputElement>(null);

  // Função segura para converter string para Date
  const getDateFromTimeString = (timeString: string | undefined): Date => {
    if (!timeString || !timeString.includes(':')) {
      // Retorna meia-noite se não houver valor válido
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    }

    try {
      const [hours = "0", minutes = "0", seconds = "0"] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(Number(hours) || 0);
      date.setMinutes(Number(minutes) || 0);
      date.setSeconds(Number(seconds) || 0);

      return date;
    } catch (error) {
      // Em caso de erro de parsing, retorna meia-noite
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    }
  };

  const getTimeStringFromDate = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const timeString = getTimeStringFromDate(newDate);
      onChange(timeString);
    }
  };

  const displayValue = React.useMemo(() => {
    if (!value || !value.includes(':')) return "00:00";
    const [hours = "00", minutes = "00"] = value.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }, [value]);


  // Usando useMemo com tratamento seguro para o value
  const currentDate = React.useMemo(
    () => getDateFromTimeString(value),
    [value]
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="grid gap-1">
        <div className="flex items-center gap-1">
          <TimePickerInput
            ref={hoursRef}
            picker="hours"
            date={currentDate}
            setDate={handleDateChange}
            disabled={disabled}
            onRightFocus={() => minutesRef.current?.focus()}
          />
          <span className="text-center">:</span>
          <TimePickerInput
            ref={minutesRef}
            picker="minutes"
            date={currentDate}
            setDate={handleDateChange}
            disabled={disabled}
            onLeftFocus={() => hoursRef.current?.focus()}
          />
        </div>
      </div>
    </div>
  );

};
