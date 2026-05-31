const { onRequest } = require("firebase-functions/v2/https");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient();