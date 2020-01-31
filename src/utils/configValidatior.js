const fs = require('fs');
const { validate } = require('node-cron');
const logger = require('./logger');

module.exports = ({ checkPeriod: { unit, value }, directoryPath }) => {
  logger.info('   ConfigValidatior: Validating configuration');
  const checkMinutes = (val) => val >= 0 && val < 60;
  const checkHours = (val) => val >= 0 && val < 24;

  const validatePath = () => {
    try {
      fs.statSync(directoryPath);
    } catch (err) {
      throw Error(`directoryPath: ${directoryPath} not a valid path. Please, check config file`);
    }
  };

  const validatePeriod = () => {
    const period = {
      minute: () => {
        if (!checkMinutes(value)) throw Error(`checkPeriod with value: ${value} not valid. Minute valid range: 0-59. Please, check config file`);
        return `*/${value} * * * * `;
      },
      hour: () => {
        if (!checkHours(value)) throw Error(`checkPeriod with value: ${value} not valid. Hours valid range: 0-23. Please, check config file`);
        return `0 */${value} * * *`;
      },
    };
    const parsedValue = period[unit];
    if (!parsedValue) throw Error(`checkPeriod with unit: ${unit} not valid. Valid units: minute, hour. Please, check config file`);

    const cronExpression = parsedValue();
    if (!validate(cronExpression)) throw Error(`cron expression ${cronExpression} not valid. Please check checkperiod config`);
    return cronExpression;
  };

  validatePath();
  const cronExpression = validatePeriod();
  const periodText = `Every value:${value} unit:${unit}`;

  logger.info('   ConfigValidatior: Configuration is valid');
  return {
    periodText,
    cronExpression,
  };
};
