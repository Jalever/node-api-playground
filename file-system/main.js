const { rename } = require("fs/promises");
const { join } = require("path");

const log = console.log.bind(console);

async function moveFile(from = "", to = "") {
  try {
    await rename(from, to);
    console.log(`moved ${from} to ${to}`);
  } catch (error) {
    console.error(`got an error trying to move the file: ${error.message}`);
  }
}

const source = join(__dirname, "sample-2.txt");
const destination = join(__dirname, "sample.txt");
moveFile(source, destination);
