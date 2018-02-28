import { Pool } from "pg";
import config from './configuration';

export const pool = new Pool(config);
