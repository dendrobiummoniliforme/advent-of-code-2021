// SEE: https://adventofcode.com/2021/day/1
import { input } from "./input"; // I later learned that reading a file is much less effort than pre-processing by hand.

// I am writing these as guides to myself. I hope others find use for these, or, 
// if anything confirmation on your own solutions.

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

// Why left? Because I had a right function, and then realized this was easier.
const left = (value: number, index: number, arr: number[]): number => {
    return value + arr[index+1] + arr[index+2];
}

// This needs a better name.
const mapWindow = (arr: number[]): number[] => { 
    return arr.map(
        (currentValue: number, index: number): number => {
            return left(currentValue, index, arr);
        }
    )
};

// Solution B, paste in box.
console.log(filtered(mapWindow(input)).filter(value => {return value;}).length); // Lol.