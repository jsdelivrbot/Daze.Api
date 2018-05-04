import { Pool } from "pg";
import config from '../common/configuration';

export const pool = new Pool(config);
