import winston from 'winston';

function logging($) {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
  });
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
  // eslint-disable-next-line no-param-reassign
  $.logger = logger;
}

export default logging;
