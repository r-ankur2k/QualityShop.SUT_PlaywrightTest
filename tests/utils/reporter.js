const fs = require("fs");
const path = require("path");

class DailyStatusReporter {
  onEnd(result) {
    const status = result.status.toUpperCase();
    const filePath = path.join("reports", "SmokeTestDaily", "daily.txt");

    fs.appendFileSync(
      filePath,
      `${status} - ${new Date().toISOString()}\n`
    );
  }
}

module.exports = DailyStatusReporter;
