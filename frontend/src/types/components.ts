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
};

export interface ChartData {
  [key: string]: number | string;
}

export interface DataConfig {
  label: string;
  color: string;
}

export interface ChartProps {
  title: string;
  description: string;
  data: ChartData[];
  dataConfig: Record<string, DataConfig>;
  xAxisKey: string;
}

export interface PieChartProps {
  data: ServiceReportData[];
}

export interface ServiceReportData {
  service: string;
  category: string;
  total: number;
}

export type ServiceStatusData = {
  status: string;
  total: number;
};

export type RevenueByMonthData = {
  month: string;
  totalRevenue: number;
  totalTransactions: number;
};

export type ServiceData = {
  service: string;
  category: string;
  total: number;
};

export type ReportsResponse = {
  servicesByMonth: ServiceData[];
  servicesByCategory: ServicesByCategoryData[];
  servicesByStatus: ServiceStatusData[];
  revenueByMonth: RevenueByMonthData[];
}

export type ServicesByCategoryData = {
  category: string;
  total: number;
  service: string;
}
