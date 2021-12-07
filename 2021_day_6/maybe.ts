
import { data } from "../lib";

// Comma delimited file.
const lanternfish: string[] = data(`${__dirname}/input.txt`).split(',');
console.log("lanternfish", lanternfish);

const filtered = (arr: string[]) => arr.filter(
    element => { 
        return Number(element) === 0
    }
);

const fill = (len: number) => {
    // All fish start at 8 when born.
    let str: string = '';

    // Generate A string.
    for (let i = 1; i <= len; i++) {
        // '' + '8' != '8'.
        if (i === 0) {
            str = '8';
        }

        // Increment the array.
        if (i > 0) {
            str = str + "8";
        }
    }
    return str.split("");
}

const decrement = (arr: string[]) => arr.map(
    element => { 
        // If Element is 0, then set to 6, else, decrease by 1.
        return Number(element) === 0 ? "6" : `${Number(element)-1}`
    }
);

const simulate = (arr: string[], days: number = 80): number | undefined => {
    if (days > 0) {
        const prevArr: string[] = arr.map(element => element);

        // Make the whole string decrement.
        arr = decrement(arr);

        // Fill our array with new lanternfish from the last iterations count.
        const newBorn: number = filtered(prevArr).length;
        if (newBorn > 0) {
            arr = arr.concat(
                fill(
                    newBorn
                )
            );
        }

        // Decrement time.
        days--

        // Simulate again.
        simulate(arr, days);
    }

    if (days <= 0) {
         console.log("Simulation Finished", arr.length);
         return arr.length;
    }
}

const batchSimulations = (len: number) => {
    let batchSize: number = len;
    let batchAmount: number = 0;

    // Arbitrary.
    while (batchSize > 75) {
        batchSize = batchSize / 2;
        batchAmount++
    }

    let start: number = 0;
    let end: number = batchSize;
    let total: number = 0;
    for (let amount = 0; amount <= batchAmount; amount++) {
        console.log(
            "batchAmount", batchAmount, 
            "batchSize", batchSize, 
            "start", start, 
            "end", end
        );

        total = total + Number(
            simulate(
                lanternfish.slice(start, end)
            )
        );
        
        console.log(total);
        
        start = end;
        if (lanternfish[end] != undefined) {
            end = end + batchSize;
        } else { 
            // Index out of bounds, lets use the rest of the lanternfish.
            end = lanternfish.length;
        }

    }
}
console.log(lanternfish.length);
batchSimulations(lanternfish.length);
// const sims = simulate(lanternfishLeft);
// console.log(sims);