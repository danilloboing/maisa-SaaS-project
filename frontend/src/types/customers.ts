export type CustomersContextValues = {
    customers: CustomerType[];
    isLoading: boolean;
    createCustomer: (data: CreateCustomerForm) => void;
    inactiveCustomer: (id: number) => void;
    updateCustomer: (data: UpdateCustomerForm) => void;
    getCustomers: () => void;
}

export type CustomerType = {
    id: number;
    nome: string;
    email: string;
    endereco: string;
    celular: string;
    data_criacao: Date;
}

export type CreateCustomerForm = Omit<CustomerType, 'id' | 'data_criacao'>

export type UpdateCustomerForm = Partial<CreateCustomerForm> & { id: number; is_active?: boolean }

export type ServiceColumnsProps = {
    onEdit: (value: CustomerType) => void;
    onDelete: (value: CustomerType) => void;
}