import { Input } from "@/components/ui/input";
import { Table } from '@tanstack/react-table';

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  column: string;
}

export default function DataTableFilter<TData>({
  table,
  column
}: DataTableFilterProps<TData>) {
  return (
    <Input
      placeholder=""
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className="max-w-sm bg-white border-slate-200"
    />
  );
}
