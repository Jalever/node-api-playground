const {stat} = require("node:fs");

const BYTES_PER_MB = 1024 ** 2;
const BYTES_PER_KB = 1024;
const filePath = "./sample.txt"
stat(filePath, function(err, stats) {
    const { size = 0} = stats;
    const sizeInMb = size / BYTES_PER_MB;
    const sizeInKb = size / BYTES_PER_KB;
    console.log(`size(mb): `, sizeInMb);
    console.log(`size(kb): `, sizeInKb);
});