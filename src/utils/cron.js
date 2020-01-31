const cron = require('node-cron');
const fs = require('fs');
const logger = require('./logger');

module.exports = ({ directoryPath, checkPeriod }, cronConfig, sendEmail) => {
  logger.info('   Cron: Setting up cronjob');
  let lastUpdate = null;
  const calculateInitialTime = () => {
    let now = new Date().valueOf();
    if (checkPeriod.unit === 'minute') now -= checkPeriod.value * 60000;
    else now -= checkPeriod.value * 3600000;
    return new Date(now);
  };
  cron.schedule(cronConfig, () => {
    if (!lastUpdate) lastUpdate = calculateInitialTime();
    const { mtime } = fs.statSync(directoryPath);
    const modified = (new Date(mtime) - lastUpdate) > 0;
    if (!modified) sendEmail();
    lastUpdate = new Date();
  });
  logger.info(`   Cron: cronjob scheduled with ${cronConfig}`);
};
