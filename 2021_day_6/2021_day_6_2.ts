import * as fs from "fs";
import { data } from "../lib";

interface cohort {
    bio: number[]
    population?: number;
}

// Comma delimited file.
let lanternfish: string[] = data(`${__dirname}/input.txt`).split(',');
console.log("lanternfish", lanternfish);

/**
 * Group takes a set of string integers and compares each element of said set against a comparator and returns the filtered values.
 * @param elements an array of elements, preferably a string of integers.
 * @param comparator an integer comparator to use against each entry of elements.
 * @returns 
 */
const group = (elements: string[], comparator: number): number => { 
    return elements.filter(
        element => {
            return Number(element) === comparator 
        }
    ).length;
}

/**
 * newState takes in a current state, creates a temp state, maths out the new state using a combination of the temp and the old,
 * and finally returns the newly generated state.
 * @param state Current cohort.
 * @param veteranGroup Group that does not flip to 8 day spawn time, but instead 6.
 * @param numberOfGroups Both the number of possible groups and the number that a new egg spawns at.
 * @returns 
 */
const newState = (state: cohort, veteranGroup: number, numberOfGroups: number) => {
    const temp: cohort = {
        bio: [],
        population: 0
    }

    temp.bio = state.bio.map(
        (element, index)=> {
            if (index === veteranGroup) {
                return state.bio[7] + state.bio[0];
            }

            if (index === numberOfGroups) {
                return state.bio[0];
            }
            return state.bio[index+1];
        }
    )

    temp.population = temp.bio.reduce((prev, curr) => {
        return prev + curr;
    });
    return temp;
}

var totalPopulation: number[] = [];

/**
 * spawn takes a cohort and spawns new fish until it reaches the final day given for spawning.
 * @param currentState a currentState cohort.
 * @param days number of days to simulate.
 * @returns the last state arrived at for the last day.
 */
const spawn = (currentState: cohort, days: number) => {
    let prevState: cohort = currentState;
    if (days === 0) {
        totalPopulation = [0];
        return prevState;
    }

    if (days > 0) {
        console.log(currentState,`\n.\n.\n.\nv\n`);
        currentState = newState(prevState, 6, 8);
        days--
        spawn(currentState, days);
    }

    if (prevState.population != undefined) {
        totalPopulation.push(prevState.population);
    }
    return prevState;
}

const numberOfGroups = 8;
let initialState: cohort = {bio: []};
for (let element = 0; element <= numberOfGroups; element++) {
    initialState.bio[element] = group(lanternfish, element);
}

initialState.population = initialState.bio.reduce((prev, curr) => {
    return prev + curr;
});

// Change the second param to answer part A or Part B.
// This is performant compared with my first attempt at answering.
spawn(initialState, 1000);

console.log(totalPopulation);

fs.writeFileSync(`${__dirname}/output.txt`, totalPopulation.toString());