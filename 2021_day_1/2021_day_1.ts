// SEE: https://adventofcode.com/2021/day/1
import { input } from "./input";

// Filter the input by looking at the currentValue and the input array at the last index.
const filtered = (arr: number[]): number[] => {
    return arr.filter(
        (currentValue: number, index: number) => { 
            return currentValue > arr[index-1]
        }
    );
}

// Solution A, paste in box.
console.log(filtered(input).length);

const left = (value: number, index: number, arr: number[]): number => {
    return value + arr[index+1] + arr[index+2];
}

const mapWindow = (arr: number[]): number[] => { 
    return arr.map(
        (currentValue: number, index: number): number => {
            return left(currentValue, index, arr);
        }
    )
};

// Solution B, paste in box.
console.log(filtered(mapWindow(input)).filter(value => {
            return value;
        }
    ).length
);