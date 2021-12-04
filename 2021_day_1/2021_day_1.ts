// SEE: https://adventofcode.com/2021/day/1
import { input } from "./input";

// Filter the input by looking at the currentValue and the input array at the last index.
const filtered: number[] = input.filter(
    (currentValue: number, index: number) => { 
        return currentValue > input[index-1]
    }
);

// Solution, paste in box.
console.log(filtered.length);
