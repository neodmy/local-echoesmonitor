const logger = require('./utils/logger');
const configData = require('./config/config.json');
const configValidation = require('./utils/configValidatior');
const emailSender = require('./utils/emailSender');
const cron = require('./utils/cron');

const init = () => {
  try {
    logger.info('EchoesMonitor: starting');
    const parser = configValidation(configData);
    const errorEmailSender = emailSender(configData, 'Please, check echoes. No files generated according current config');
    cron(configData, parser.cronExpression, errorEmailSender);
    emailSender(configData, `Echoes Monitor starts with config: ${parser.periodText}`)();
    logger.info('EchoesMonitor: started');
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

init();
