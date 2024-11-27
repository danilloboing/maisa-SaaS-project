import api from "@/services/api";
import { ReportsResponse } from "@/types/components";

export async function fetchAllReportsQuerie(): Promise<ReportsResponse> {
  try {
    const servicesByMonth = await api.get("reports/services");
    const servicesByCategory = await api.get("reports/services-by-category");
    const servicesByStatus = await api.get("reports/services-by-status");
    const revenueByMonth = await api.get("reports/revenue-by-month");

    return {
      servicesByMonth: servicesByMonth.data.result,
      servicesByCategory: servicesByCategory.data.result,
      servicesByStatus: servicesByStatus.data.result,
      revenueByMonth: revenueByMonth.data.result,
    };
  } catch (error) {
    return {
        servicesByMonth: [],
        servicesByCategory: [],
        servicesByStatus: [],
        revenueByMonth: [],
    };
  }
}
