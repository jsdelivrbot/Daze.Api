import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

const sourceDir = path.join(__dirname, "../sql/");
const tableDir = path.join(sourceDir, "tables")
const functionsDir = path.join(sourceDir, "functions")
const viewsDir = path.join(sourceDir, "views")
const indexesDir = path.join(sourceDir, "indexes")
const proceduresDir = path.join(sourceDir, "procedures")



let loadAndJoinFiles = (dir: string): string => {
    let ray = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith(".sql")) {
            const sql = fs.readFileSync(path.join(dir, file), "utf-8")
            ray.push(sql);
        }
    }
    return files.join("\r\n");
};

const readInit = (): string => {
    const initFile = path.join(sourceDir, "init.sql");
    return fs.readFileSync(initFile, "utf-8");
};

const readTables = (): string => {
    return loadAndJoinFiles(tableDir);
};

const readFunctions = () => {
    return loadAndJoinFiles(functionsDir);
};

const readIndexes = () => {
    return loadAndJoinFiles(indexesDir);
};

const readProcedures = () => {
    return loadAndJoinFiles(proceduresDir);
};

export const readSql = () => {
    let sqlBits = [];

    sqlBits.push(`--Generated ${new Date()}`)
    sqlBits.push(readInit());
    sqlBits.push(readTables());
    sqlBits.push(readFunctions());
    sqlBits.push(readIndexes());

    return sqlBits.join("\r\n");
};







// init Daze.Auth