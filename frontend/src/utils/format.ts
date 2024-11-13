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
