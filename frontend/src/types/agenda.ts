import { CustomerType } from "./customers";
import { ServiceType } from "./services";

export type AgendaContextValues = {
    agendas: AgendaType[];
    isLoading: boolean;
    createAgenda: (data: any) => void;
    inactiveAgenda: (id: number) => void;
    updateAgenda: (data: any) => void;
    getAgenda: () => void;
}

export type AgendaType = {
    id: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    status: string
    observacao?: string;
    id_servico: number;
    id_cliente: number;
    id_pagamento: number;
    servico: ServiceType;
    customer: CustomerType;
    pagamento: any;
}

export type CreateAgendaForm = {
    id_servico: number;
    id_cliente: number;
    observacao: string;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    status: string;
    data_pagamento: string;
    percent_desconto: number;
}

export type UpdateAgendaForm = Partial<CreateAgendaForm> & { id: number; }

export type AgendaColumnsProps = {
    onEdit: (value: AgendaType) => void,
    onDelete: (value: AgendaType) => void,
}