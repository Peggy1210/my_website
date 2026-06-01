const { onRequest } = require("firebase-functions/v2/https");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient();

exports.analyticsSummary = onRequest(
  { region: "us-central1", cors: true },
  async (req, res) => {
    try {
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
      const totalUsers = await getUsers("2000-12-10", "today");

      console.log("Today's Users:", todayUsers);
      console.log("Total Users:", totalUsers);

      res.json({
        todayUsers,
        totalUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to fetch analytics data",
      });
    }
  }
);