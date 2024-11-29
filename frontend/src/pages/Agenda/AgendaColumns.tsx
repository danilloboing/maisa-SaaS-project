import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "../../components/DataTable/row-actions";
import { AgendaColumnsProps, AgendaType } from "@/types/agenda";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import { Pencil } from "lucide-react";

export const agendaColumns = ({
  onEdit,
  onDelete,
  onEditPaymentStatus,
}: AgendaColumnsProps): ColumnDef<AgendaType>[] => [
  {
    accessorKey: "data",
    header: "Data",
    cell: (info) => {
      const date = info.getValue();
      return date && moment(date).format("DD/MM/YYYY");
    },
  },
  {
    accessorKey: "horario_inicio",
    header: "Horario Inicio",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "horario_fim",
    header: "Horario Fim",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "servico.nome",
    header: "Serviço",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "pagamento.valor_total",
    header: "Valor",
    cell: (info) => {
      const value = info.getValue();
      return value ? formatCurrency(String(value)) : "";
    },
  },
  {
    accessorKey: "cliente.nome",
    header: "Cliente",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status Serviço",
    cell: (info) => {
      const status = info.getValue();
      let variant: "default" | "success" | "destructive" = "default";

      if (status === "Realizado") {
        variant = "success";
      } else if (status === "Cancelado") {
        variant = "destructive";
      } else {
        variant = "default";
      }

      return <Badge variant={variant}>{String(status)}</Badge>;
    },
  },
  {
    accessorKey: "pagamento.status",
    header: "Status Pagamento",
    cell: (info) => {
      const status = info.getValue();
      let variant: "success" | "outline" | "link" | "destructive" | "default" | "secondary" | "ghost" = "default";

      if (status === "Pago") {
        variant = "success";
      } else if (status === "Cancelado") {
        variant = "destructive";
      } else if (status === "Pendente") {
        variant = "secondary";
      } else {
        variant = "default";
      }

      return <div className="flex row gap-2">
        <Badge variant={variant}>{String(status)}</Badge>
        <Pencil
          className="ml-2 cursor-pointer center self-center"
          size={14}
          onClick={() => onEditPaymentStatus(info.row.original.pagamento)}
        />
      </div>
    },
  },
  {
    accessorKey: "observacao",
    header: "Descrição",
    cell: (info) => info.getValue(),
  },
  {
    header: () => {
      return <div>Actions</div>;
    },
    id: "actions",
    cell: ({ row }) => (
      <div className="px-4 flex justify-center">
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      </div>
    ),
  },
];
