import {opendir} from "node:fs/promises";

try {
    const dir = await opendir("./");
    for await (const dirent of dir) {
        console.log(`dirent.name: `, dirent.name);
    }
} catch (error) {
    console.error(error);
}