import { connect } from 'mongoose';
import {logger} from "./logger";

export class Db {
    static connect() {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };

        connect(process.env.DB_DSN, opts, (err: any) => {
            if (err) {
                logger.error(err.message);
            }
        });
    }
}