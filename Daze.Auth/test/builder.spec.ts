import * as assert from "assert";
import * as builder from "../lib/builder"

const tee = console.log;

if (builder) {
    tee("builder loads");
}
else {
    tee("builder did not load");
}

if (builder.readSql()) {
    let sql = builder.readSql();
    tee(sql);
}