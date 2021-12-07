import { data } from "../lib";

// I am writing these as guides to myself. I hope others find use for these, or, 
// if anything confirmation on your own solutions.

// 1. Pre-process.
const words: string[] = data(`${__dirname}/input.txt`).split("\n");

const decomposed: string[][] = words.map(element => {
    return element.split("");
});

// 2. Transpose.
const transpose = (arr2D: string[][]): string[] => {
    const maxRow: number = arr2D.length;
    const maxCol: number = arr2D[0].length;
    
    let response: string[][] = [ ];
    for (let row = 0; row < maxCol; row++) {
        response[row] = [ ]; // Js.. See: https://stackoverflow.com/questions/5845190/how-to-assign-values-to-multidimensional-arrays-in-javascript/44388792
        for (let col = 0; col < maxRow; col++) {
            response[row][col] = arr2D[col][row];
        }
    }
    return response.map(element => element.join(""));
}

// 3. GET our transposed matrix.
const transposedMatrix: string[] = transpose(decomposed);

// 4. GET our gamma.
const gamma: string = transposedMatrix.map(
    element => {
        const strArr2D: string[] = element.split("");
        const one: string[] = strArr2D.filter(
            element => element === "1"
        );
        const zero: string[] = strArr2D.filter(
            element => element === "0"
        );
        return Number(one.length) > Number(zero.length) ? "1" : "0"
    }
).join("");

// I changed one character.
// 5. GET our epsilion.
const epsilion: string = transposedMatrix.map(
    element => {
        const strArr2D: string[] = element.split("");
        const one: string[] = strArr2D.filter(
            element => element === "1"
        );
        const zero: string[] = strArr2D.filter(
            element => element === "0"
        );
        return Number(one.length) < Number(zero.length) ? "1" : "0"
    }
).join("");

// Convert to decimal from binary.
// See: https://www.w3schools.com/js/js_bitwise.asp
// This is still kind of magic to me. I need to brush up on my number systems.
function binaryToDecimal(bin: string): number {
    // parseInt(string, radix) => radix is base 2.
    // toString(radix) => radix is base 10 (that we want);
    return Number(parseInt(bin, 2).toString(10));
}
 
// Solution to A, paste in box.
console.log(binaryToDecimal(gamma) * binaryToDecimal(epsilion));


// 6. Gamma determines Oxygen. Epsilion Determines Carbon dioxide.
//    i. Gamma gets calculated from first matrix.
//    ii. We get that 1 is the number for the original data.
//    iii. Discard the gamma and grab all transposed values that start with 1.
//    vi. 