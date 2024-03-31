import { createLogger, format, transports } from "winston";

/**
 * The logger instance for logging messages.
 */
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.combine(format.timestamp(), format.json(), format.prettyPrint())
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
