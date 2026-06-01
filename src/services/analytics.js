export async function loadAnalyticsSummary() {
  try {
    const apiUrl = import.meta.env.VITE_ANALYTICS_API;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to load analytics:", error);
    return { totalUsers: 0, todayUsers: 0 };
  }
}
