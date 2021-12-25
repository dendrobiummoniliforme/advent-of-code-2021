import { data } from "../lib";

let basins: string[] = data(`${__dirname}/test_input.txt`).split('\n');

console.log(basins);

interface search {
    current: number;
    right?: number;
    left?: number;
    down?: number;
    up?: number;
};

const outOfBounds = (search: search, row: number, column: number): search => {
    if ((row - 1) < 0) {
        search.up = 0;
    }

    if ((row + 1) > basins.length) {
        search.down = 0;
    }

    if ((column - 1) < 0) {
        search.left = 0;
    }

    if ((column + 1) > basins[0].length) {
        search.right = 0;
    }

    return search;
}

for (let row = 0; row < basins.length; row++) {
    for (let column = 0; column < basins[0].length; column++) {
        console.log("row", row, "column", column, "basins[row][column]", basins[row][column]);

        let search: search = {
            current: Number(basins[row][column]),
        }

        search = outOfBounds(search, row, column);

        search.down = Number(basins[row + 1][column]);
        search.up = Number(basins[row - 1][column]);
        search.right = Number(basins[row][column + 1]);
        search.left = Number(basins[row][column - 1]);


        console.log("search", search);
    }
}
