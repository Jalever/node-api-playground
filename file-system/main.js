const { open } = require("fs/promises");

async function openFile(fileName, data) {
  try {
    const filePath = __dirname + fileName;
    const file = await open(filePath, "w");
    await file.write(data);
    console.log(`opened file ${fileName}`);
  } catch (error) {
    console.log(`got an error trying to open the file: ${error.message}`);
  }
}

openFile("/sample.txt", "This is content that was written by fs.open");
