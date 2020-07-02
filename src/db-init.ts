import { connect } from 'mongoose';
import {logger} from "./logger";

export class Db {
    static connect() {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };

        connect(process.env.MONGODB_URI, opts, (err: any) => {
            if (err) {
                logger.error(err.message);
            }
        });
    }
}