
import { data } from "../lib";

// Comma delimited file.
let lanternfish: string[] = data(`${__dirname}/input.txt`).split(',');
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

const simulate = (arr: string[], days: number = 2) => {
    if (days === 0) {
        console.log("simulation", arr.length);
    }

    if (days > 0) {
        const prevArr: string[] = arr;

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
        console.log(arr.length - prevArr.length);
        days--
        lanternfish = arr;
        // Simulate again.
        simulate(lanternfish, days);
    }
}

// [5]
// [4]
// [3]
// [2]
// [1]
// [0]

// 18 - 5 = 13 - 6 = 7 - 6 = 1; 
// [6,8]
let [start, end] = [0,150];
let batchOfFish: string[];
let response: number = 0;
for (let batch = 0; batch < 2; batch++) {
    console.log("batch#", batch, "\n", "start", start, "\n", "end", end);
    batchOfFish = lanternfish.slice(start, end); 
    simulate(batchOfFish);
    start = end;
    end = end + 150;
}


console.log(response);
// const sims = simulate(lanternfishLeft);
// console.log(sims);


// {
//    1's Cohort: [count],
//    2's Cohort: [count],
// }

// [1,1,2,2,3]

// 0s: 0
// 1s: 2,
// 2s: 2,
// 3s: 1,

// .
// .
// .
// v

// 0s: 2, --> 6 & 8(2 new)
// 1s: 2,
// 2s: 1,
// 3s: 0,

// .
// .
// .
// v

// 0s: 2,
// 1s: 1,
// 2s: 0,
// 3s: 0,
// 6s: 2,
// 8s: 2,