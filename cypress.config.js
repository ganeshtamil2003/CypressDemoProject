const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    // reporter: "mochawesome",
    // reporterOptions: {
    //   charts: true,
    //   overwrite: false,
    //   html: false,
    //   json: true,
    //   reportDir: "cypress/reports/",
    //   embeddedScreenshots: true, // Ensures screenshots are included
    //   inlineAssets: true // Embeds images directly in the report
    // },
    screenshotsFolder: "cypress/reports/mochareports/assets",
    screenshotOnRunFailure: true,

    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mocha",
        quiet: true,
        overwrite: false,
        html: false,
        json: true,
      },
    },

    setupNodeEvents(on, config) {
      // Capture screenshots on failure and attach them to the report
      on("after:screenshot", (details) => {
        console.log("Screenshot taken:", details.path);
      });
      return config;
    },
  },
});
