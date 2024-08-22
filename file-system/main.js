const { rename } = require("fs/promises");

async function renameFile(from = "", to = "") {
  try {
    const filename = function (name = "") {
      return __dirname + name;
    };
    await rename(filename(from), filename(to));
    console.log(`renamed ${from} to ${to}`);
  } catch (error) {
    console.error(`got an error trying to rename the file: ${error.message}`);
  }
}

renameFile("/sample.txt", "/sample-2.txt");
