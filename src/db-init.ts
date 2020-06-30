import { connect } from 'mongoose';
import dbConfig from '../config/db.json';

export class Db {
    static connect() {
        connect(dbConfig.url, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Successfully Connected!");
            }
        });
    }
}