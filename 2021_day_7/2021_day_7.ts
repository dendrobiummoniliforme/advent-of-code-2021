import { data } from "../lib";

/**
 * horizontalAlignment determines the amount of fuel used to minimize aligning crabs. They might be raving.
 * @param currentMaximum current maximum value of the array given.
 * @param numbers the list of numbers given.
 * @param fuel the current fuel used.
 * @param rave self-explanatory.
 */
 const horizontalAlignment = (currentMaximum: number, numbers: number[], fuel: number, rave: boolean = false) => {
    let distance: number[] = numbers.map(element => Math.abs(element - currentMaximum));   
    let previousFuel: number = fuel;

    if (rave === true) {
        distance = distance.map(element => {
            let temp: number = 0;
            for (let i = 0; i <= element; i++) {
                temp = temp + i;
            }
            return temp;
        });
    }

    fuel = distance.reduce((previous, current) => previous + current);
    if (fuel <= previousFuel) {
        currentMaximum--
        horizontalAlignment(currentMaximum, numbers, fuel, rave);
    }

    if (fuel > previousFuel) {
        console.log("horizontal", previousFuel);
        
    }

}

// 1. Pre-process.
const words: string[] = data(`${__dirname}/input.txt`).split(',');

// 2. Convert array to numbers, and sort ascending.
const numbers: number[] = words.map(
    element => {
        return Number(element)
    }
).sort((a, b) => a - b);

// 3. (Part A) Set initial values.
let globalMaximum: number = numbers[numbers.length-1] - numbers[0];
let distance: number[] = numbers.map(element => Math.abs(element - globalMaximum));
let fuel = distance.reduce((previous, current) => previous + current);

// Part A.
console.log("\n",globalMaximum, numbers, fuel);
horizontalAlignment(globalMaximum, numbers, fuel, false);

// 3. (Part B) Set initial values.
globalMaximum = numbers[numbers.length-1] - numbers[0];
distance = numbers.map(element => Math.abs(element - globalMaximum));
distance = distance.map(element => {
    let temp: number = 0;
    for (let i = 0; i <= element; i++) {
        temp = temp + i;
    }
    return temp;
});
fuel = distance.reduce((previous, current) => previous + current);

// Part B.
console.log("\n",globalMaximum, numbers, fuel);
horizontalAlignment(globalMaximum, numbers, fuel, true);
