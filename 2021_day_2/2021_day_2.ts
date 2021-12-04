import * as fs from "fs";

// Procedural Code.
// 1. Read in a saved file of our input data from Advent Of Code 2021.
// 2. Create a DataFrame with our data.
// 3. (Optional for Sol A) ((Mandatory removal for Sol B)) Sort the data into down, up, forward.
// 4. Filter out empty values.
// 5. Store values of our directions in a Record, init at 0 value.
// 6. Filter and fill our record with sums.

const data = fs.readFileSync(
    `${__dirname}/input.txt`, 
    {encoding: 'utf8', flag: 'r'}
);

// Sorting is possible, but only for Sol A. (Position is relevant in Sol B).
const dataframe: string[] = data.split("\n");
const filtered: string[]  = dataframe.filter(value => value.length > 0 || value != undefined || value != "NaN");

// Set a non-generic Record.
const directions: Record<string, number> = {
    "forward": 0,
    "down": 0,
    "up": 0,
    "aim": 0,
    "depth": 0,
}

// Set values in directions via a loop.
// Mmmmmm mutations.
filtered.forEach((element) => {
    const decomposed: string[] = element.split(" ");
    const name: string = decomposed[0];
    const number: number = Number(decomposed[1]);

    // Set Current Value For Current Element.
    directions[name] = directions[name] + number;
    
    // Set Aim.
    directions["aim"] = directions["down"] - directions["up"];

    // Set Depth.
    if (name === "forward") {
        directions["depth"] = directions["depth"] + (Number(directions["aim"]) * number);
    }
});

// Solution B, paste in box.
console.log("Sol B", directions["forward"] * directions["depth"]);

// Solution A, paste in box.
console.log("Sol A", (directions.forward) * ( directions.down - directions.up));