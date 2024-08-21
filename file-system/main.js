const { appendFile, stat } = require("fs/promises");

const BYTES_PER_MB = 1024 ** 2;
const BYTES_PER_KB = 1024;

async function sleep(dalay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, dalay * 1000);
  });
}
/**
 * usage:
    const delay = await getRandomNum(0, 5);
    console.log(`${delay} seconds later...`);
    await sleep(delay);
 */
async function getRandomNum(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function generateFile(name, content) {
  const filename = __dirname + name;
  try {
    await appendFile(filename, content);
    const stats = await stat(filename);
    const { size = 0 } = stats;
    const sizeInMb = size / BYTES_PER_MB;
    const sizeInKb = size / BYTES_PER_KB;
    return {
      success: true,
      sizeInMb,
      sizeInKb,
    };
  } catch (error) {
    console.error(
      `there are something wrong happened, error.message: `,
      error.message
    );
    return {
      success: false,
      sizeInMb: 0,
      sizeInKb: 0,
    };
  }
}

async function invoke(name = "", count = 1) {
  const content = "This is content that was generated, index is ";
  let index = 0;
  let result = null;
  for (; index < count; index++) {
    result = await generateFile(name, content + index);
    const text = result.success
      ? `content[${index}] has generated, size(kb) is ${result.sizeInKb}, size(mb) is ${result.sizeInMb}`
      : `content[${index}] was generated unsuccessfully.`;
    console.log(text);
  }
}

invoke("/sample.txt", 1_000_000);
