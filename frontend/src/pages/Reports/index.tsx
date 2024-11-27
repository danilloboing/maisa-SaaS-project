import { Heading } from "@/components";
import { AtendimentosChart } from "@/components/Charts/atendimentos-chart";
import { RevenueByMonthChart } from "@/components/Charts/revenue-by-month-chart";
import { ServicePieChart } from "@/components/Charts/service-by-category-chart";
import { ServicesByStatusChart } from "@/components/Charts/services-by-status-chart";
import { fetchAllReportsQuerie } from "@/queries/reports";
import {
  ReportsResponse,
  RevenueByMonthData,
  ServiceData,
  ServicesByCategoryData,
  ServiceStatusData,
} from "@/types/components";
import { useEffect, useState } from "react";

export default function Reports() {
  const [servicesByMonthData, setServicesByMonth] = useState<ServiceData[]>([]);
  const [revenueByMonthData, setRevenueByMonth] = useState<
    RevenueByMonthData[]
  >([]);
  const [servicesByCategoryData, setServicesByCategory] = useState<
    ServicesByCategoryData[]
  >([]);
  const [servicesByStatusData, setServicesByStatus] = useState<
    ServiceStatusData[]
  >([]);
  const [error, setError] = useState<string | null>(null); // Estado de erro

  // Função assíncrona para buscar todos os dados
  async function fetchAll(): Promise<ReportsResponse> {
    try {
      const {
        servicesByMonth,
        revenueByMonth,
        servicesByCategory,
        servicesByStatus,
      } = await fetchAllReportsQuerie();
      return {
        servicesByMonth,
        revenueByMonth,
        servicesByCategory,
        servicesByStatus,
      };
    } catch (err) {
      setError("Erro ao carregar os dados dos relatórios.");
      return {
        servicesByMonth: [],
        revenueByMonth: [],
        servicesByCategory: [],
        servicesByStatus: [],
      };
    }
  }

  // Hook useEffect para buscar os dados ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      const reports = await fetchAll();
      setServicesByMonth(reports.servicesByMonth);
      setRevenueByMonth(reports.revenueByMonth);
      setServicesByCategory(reports.servicesByCategory);
      setServicesByStatus(reports.servicesByStatus);
    };

    loadData();
  }, []);

  const atendimentosData = [
    { month: "January", total: 186 },
    { month: "February", total: 305 },
    { month: "March", total: 237 },
    { month: "April", total: 73 },
    { month: "May", total: 209 },
    { month: "June", total: 214 },
  ];

  const exampleData = [
    { month: "2024-08", totalRevenue: 350, totalTransactions: 1 },
    { month: "2024-09", totalRevenue: 500, totalTransactions: 2 },
    { month: "2024-10", totalRevenue: 700, totalTransactions: 3 },
    { month: "2024-11", totalRevenue: 800, totalTransactions: 4 },
    { month: "2024-12", totalRevenue: 650, totalTransactions: 2 },
  ];

  const exampleServices = [
    { status: "Realizado", total: 5 },
    { status: "Cancelado", total: 2 },
    { status: "Pendente", total: 3 },
    { status: "Em Andamento", total: 4 },
  ];

  const servicePieData = [
    {
      service: "Corte de Cabelo",
      category: "Cabelo",
      total: 12,
    },
    {
      service: "Manicure",
      category: "Unhas",
      total: 8,
    },
    {
      service: "Pedicure",
      category: "Unhas",
      total: 5,
    },
    {
      service: "Design de Sobrancelhas",
      category: "Sobrancelhas",
      total: 3,
    },
    {
      service: "Depilação",
      category: "Corporal",
      total: 9,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-row justify-between pb-5">
        <Heading
          title="Relatórios"
          subtitle="Acompanhe o desempenho do seu negócio"
        />
      </div>

      {/* Gráficos em Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Service Pie Chart */}
        <div className="min-h-[300px]">
          <ServicePieChart data={servicesByCategoryData} />
        </div>

        {/* Services by Status Chart */}
        <div className="min-h-[300px]">
          <ServicesByStatusChart data={servicesByStatusData} />
        </div>

        {/* Atendimentos Chart */}
        <div className="min-h-[300px]">
          <AtendimentosChart data={servicesByMonthData} />
        </div>

        {/* Revenue by Month Chart */}
        <div className="min-h-[300px]">
          <RevenueByMonthChart data={revenueByMonthData} />
        </div>
      </div>

      {/* Erro */}
      {error && <div className="text-red-500 mt-5">{error}</div>}
    </>
  );
}
