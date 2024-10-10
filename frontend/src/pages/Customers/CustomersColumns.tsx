import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from '../../components/DataTable/row-actions';
import { CustomerType, ServiceColumnsProps } from '@/types/customers';

export const customersColumns = ({
  onEdit,
  onDelete,
}: ServiceColumnsProps): ColumnDef<CustomerType>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'endereco',
    header: 'Endereço',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'celular',
    header: 'Celular',
    cell: (info) => info.getValue(),
  },
  {
    header: () => {
      return <div>Actions</div>;
    },
    id: 'actions',
    cell: ({ row }) => (
      <div className='px-4 flex justify-center'>
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      </div>
    ),
  },
];
