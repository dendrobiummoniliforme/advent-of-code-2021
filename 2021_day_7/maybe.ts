import { data } from "../lib";

 // 1. Pre-process.
const words: string[] = data(`${__dirname}/test_input.txt`).split(',');

// 2. Convert array to numbers, and sort ascending.
const numbers: number[] = words.map(
    element => {
        return Number(element)
    }
).sort((a, b) => a - b);

const globalMaximum: number = numbers[numbers.length-1] - numbers[0];

const horizontalAlignment = (currentMaximum: number, numbers: number[], fuel: number, previousMaximum: number) => {
    const distance: number[] = numbers.map(element => Math.abs(element - currentMaximum));    
    let previousFuel: number = fuel;

    fuel = distance.reduce((previous, current) => previous + current);
    if (fuel <= previousFuel) {
        const previousDistance: number[] = numbers.map(element => Math.abs(element - previousMaximum));

        let rave: number[] | number = previousDistance.map(
            element => {
                let raver: number = 0;
                for (let i = 0; i < element; i++) {
                    raver = raver + i;
                }
                return raver;
            }
        );
        rave = rave.reduce((previous, current) => previous + current);
        currentMaximum--
        horizontalAlignment(currentMaximum, numbers, fuel, previousMaximum);
    }

    if (fuel > previousFuel) {
        console.log("horizontal", previousFuel);
        console.log("currentMaximum", currentMaximum);
        console.log("rave", rave);
        console.log("previousMaximum", previousMaximum);
    }
    //console.log("horizontal", fuel);
}

const distance: number[] = numbers.map(element => Math.abs(element - globalMaximum));
const fuel = distance.reduce((previous, current) => previous + current);

horizontalAlignment(globalMaximum, numbers, fuel, globalMaximum);
console.log(numbers, globalMaximum);