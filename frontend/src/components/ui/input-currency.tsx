import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { Input } from './input';
// import { CurrencyInputProps } from '@/types/components';

const CurrencyInputField = ({
  id,
  name,
  ...props
}: CurrencyInputProps) => {
  return (
    <div>
      <CurrencyInput
        id={id}
        name={name}
        customInput={Input}
        decimalsLimit={2}
        placeholder='R$ 0,00'
        allowNegativeValue={false} 
        prefix='R$'
        decimalSeparator=','
        groupSeparator='.'
        {...props}
      />
    </div>
  );
};

export default CurrencyInputField;
