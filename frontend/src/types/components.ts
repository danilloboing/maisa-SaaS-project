export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    isLoading?: boolean;
};

export type CurrencyInputProps = {
    id?: string;
    name: string;
    defaultValue?: string;
    
};

export type SelectProps = {
    id: string;
    name: string;
}
