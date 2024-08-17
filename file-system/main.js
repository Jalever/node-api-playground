const {open} = require("fs/promises");

async function openFile(name, data) {
  try {
    const fileName = __dirname + name;
    const file = await open(fileName, 'w');
    await file.write(data);
  } catch (error) {
    console.log(`Got an error trying to open the file: ${error.message}`);
  }
}
openFile("/sample.txt", "This is content that was written by open method.");