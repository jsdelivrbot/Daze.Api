import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
var config = require('../package.json');

const sourceDir = path.join(__dirname, "../sql/");
const tableDir = path.join(sourceDir, "tables");
const functionsDir = path.join(sourceDir, "functions");
const viewsDir = path.join(sourceDir, "views");
const indexesDir = path.join(sourceDir, "indexes");
const proceduresDir = path.join(sourceDir, "procedures");
const typesDir = path.join(sourceDir, "types");

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

const readTables = (): string => loadAndJoinFiles(tableDir);
const readFunctions = (): string => loadAndJoinFiles(functionsDir);
const readProcedures = (): string => loadAndJoinFiles(proceduresDir);
const readTypes = (): string => loadAndJoinFiles(typesDir);
const readIndexes = (): string => loadAndJoinFiles(indexesDir);

// let decideFileName = () => {
//     var buildDir = path.join(__dirname, '../build');
//     var fileName = config.version.replace(/\./g, '=') + '.sql';
//     return path.join(buildDir, fileName);
// };

export const readSql = () => {
    let sqlBits = [];

    sqlBits.push(`--Generated ${new Date()}`)
    sqlBits.push(readInit());
    sqlBits.push(readTables());
    sqlBits.push(readFunctions());
    sqlBits.push(readTypes());
    sqlBits.push(readIndexes());

    return sqlBits.join("\r\n");
};




// init Daze.Auth