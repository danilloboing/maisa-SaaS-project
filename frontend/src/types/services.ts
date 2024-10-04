export type ServicesContextValues = {
    services: ServiceType[];
    isLoading: boolean;
    createService: (data: CreateServiceForm) => void;
    inactiveService: (id: number) => void;
    updateService: (data: UpdateServiceForm) => void;
    getServices: () => void;
}

export type ServiceType = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    is_active: boolean;
    categoria: ServiceCategoryType;
}

export type ServiceCategoryType = {
    id_categoria: number;
    nome: string;
}

export type CreateServiceForm = {
    nome: string;
    descricao: string;
    preco: number;
    categoriaServico: number;
}

export type UpdateServiceForm = Partial<CreateServiceForm> & { id: number; is_active?: boolean }

export type ServiceColumnsProps = {
    onEdit: (value: ServiceType) => void;
    onDelete: (value: ServiceType) => void;
}