export const phoneMask = (valor: string): string => {
    const numerosApenas = valor.replace(/\D/g, '');
    return numerosApenas.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };