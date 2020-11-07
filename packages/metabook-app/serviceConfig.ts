const shouldUseLocalBackend = __DEV__;

export default {
  sentryDSN:
    "https://7a9cba7e96b54da4bae2c6eb9b8d7b18@o240663.ingest.sentry.io/5306223",
  sentryOrg: "andy-matuschak",
  sentryProject: "orbit-app",
  // Store your auth token securely: firebase functions:config:set sentry.auth_token=SENTRY_AUTH_TOKEN

  httpsAPIBaseURLString: shouldUseLocalBackend
    ? "http://localhost:5001/metabook-system/us-central1/api"
    : "https://withorbit.com/api",
  shouldUseLocalBackend,
};
