export function formatSelectInput(data: any[]): { id: string; name: string }[] {
  if (data.length) {
    const select = data.map((item) => ({
      id: item.id,
      name: item.nome,
    }));
    return select;
  }

  return [];
}

export function formatCurrency(value: string) {
  if (!value || value === "0.0") return "";

  const numericValue = value.replace(/[^\d]/g, "");

  const formattedValue = (+numericValue).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
}
