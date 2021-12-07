import * as fs from "fs";

export const data = (fileName: string) => fs.readFileSync(
    `${fileName}`, 
    {encoding: 'utf8', flag: 'r'}
);