import * as readline from "readline";
import { convertNumberBase } from "./lib.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question: string) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Welcome to the Number Base Converter!");

  while (true) {
    const numberString = await prompt("Enter the number (or type 'exit' to quit): ") as string;
    if (numberString.toLowerCase() === "exit") {
      break;
    }

    const baseA = parseInt(await prompt("Enter the current base (2-36): ") as string);
    const baseB = parseInt(await prompt("Enter the target base (2-36): ") as string);

    if (isNaN(baseA) || isNaN(baseB) || baseA < 2 || baseA > 36 || baseB < 2 || baseB > 36) {
      console.log("Invalid base. Please enter a base between 2 and 36.");
      continue;
    }

    const result = convertNumberBase(numberString, baseA, baseB);
    console.log(`Converted number: ${result}\n`);
  }

  rl.close();
}

main();
