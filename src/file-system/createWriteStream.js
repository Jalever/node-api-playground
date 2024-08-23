const {createWriteStream, write} = require("node:fs");

const filePath = "./sample.txt"
const writeStream = createWriteStream(filePath);

const content = 'This is Content that was built for normal usage.\n'
let fragments = "";
for(let i = 1_0;i > 0;i--) {    
    fragments += `[${i}]${content}`;
}
writeStream.write(fragments);
writeStream.end();
writeStream.on("finish", function() {
    console.log(`write successfully!`);
});