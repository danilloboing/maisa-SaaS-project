import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from '../../components/DataTable/row-actions';
import { ServiceColumnsProps, ServiceType } from '@/types/services';

export const serviceColumns = ({
  onEdit,
  onDelete,
}: ServiceColumnsProps): ColumnDef<ServiceType>[] => [
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
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'categoria.nome',
    header: 'Categoria',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'preco',
    header: 'Preço',
    cell: (info) => (
      <div className='flex items-center'>
        <span>R$ {String(info.getValue())}</span>
      </div>
    ),
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
