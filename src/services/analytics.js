import { API_ENDPOINTS } from '@/config/api';

export async function loadAnalyticsSummary() {
  try {
    const apiUrl = API_ENDPOINTS.GOOGLE_ANALYTICS;
    console.log("Fetching analytics summary from:", apiUrl);
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("Analytics Summary:", data);
    return data;
  } catch (error) {
    console.error("Failed to load analytics:", error);
    return { totalUsers: 0, todayUsers: 0 };
  }
}
