import pino from 'pino';
import { createWriteStream } from 'pino-sentry';

const stream = createWriteStream({ dsn: process.env.SENTRY_DSN });
const logger = pino({}, stream);

export {logger};