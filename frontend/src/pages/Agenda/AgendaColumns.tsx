import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from '../../components/DataTable/row-actions';
import { AgendaColumnsProps, AgendaType } from '@/types/agenda';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';

export const agendaColumns = ({
  onEdit,
  onDelete,
}: AgendaColumnsProps): ColumnDef<AgendaType>[] => [
  {
    accessorKey: 'data',
    header: 'Data',
    cell: (info) => {
      const date = info.getValue();
      return date && moment(date).format('DD/MM/YYYY');
    },
  },
  {
    accessorKey: 'horario_inicio',
    header: 'Horario Inicio',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'horario_fim',
    header: 'Horario Fim',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'servico.nome',
    header: 'Serviço',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'cliente.nome',
    header: 'Cliente',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      let variant: 'default' | 'success' | 'destructive' = 'default';

      if (status === 'Realizado') {
        variant = 'success';
      } else if (status === 'Cancelado') {
        variant = 'destructive';
      } else {
        variant = 'default';
      }

      return (
        <Badge variant={variant}>
          {String(status)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'observacao',
    header: 'Descrição',
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
