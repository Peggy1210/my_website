const { onRequest } = require("firebase-functions/v2/https");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient();

let cachedData = null;
let cacheExpiry = 0;
const CACHE_TTL = 5 * 60 * 1000;

exports.analyticsSummary = onRequest(
  { region: "us-central1", cors: true },
  async (req, res) => {
    try {
      if (cachedData && Date.now() < cacheExpiry) {
        console.log("Returning cached data");
        return res.json(cachedData);
      }

      const propertyId = process.env.GA4_PROPERTY_ID;
      console.log("GA4_PROPERTY_ID:", propertyId);

      async function getUsers(startDate, endDate) {
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [{ startDate, endDate }],
          metrics: [{ name: "totalUsers" }],
        });

        return Number(response.rows?.[0]?.metricValues?.[0]?.value || 0);
      }

      const todayUsers = await getUsers("today", "today");
      const totalUsers = await getUsers("2025-11-01", "today");

      console.log("Today's Users:", todayUsers);
      console.log("Total Users:", totalUsers);

      cachedData = { todayUsers, totalUsers };
      cacheExpiry = Date.now() + CACHE_TTL;

      res.json(cachedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to fetch analytics data",
      });
    }
  }
);