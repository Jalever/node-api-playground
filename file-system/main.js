const { readFile } = require("fs/promises");
async function readTheFile(name = "") {
  try {
    const filePath = __dirname + name;
    const data = await readFile(filePath);
    console.log("the content that was read from readFile: ", data.toString());
  } catch (error) {
    console.error(`got an error trying to read the file: ${error.message}`);
  }
}
readTheFile("/sample.txt");
