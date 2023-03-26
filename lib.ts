function digitToCharacter(digit: number): string {
  const characterSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return characterSet[digit]
}

function characterToDigit(character: string): number {
  const characterSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return characterSet.indexOf(character)
}

function encodeInBase(number: number, base: number): string {
  if (number === 0) return "0"

  let digits: string[] = []
  while (number > 0) {
    digits.push(digitToCharacter(number % base))
    number = Math.floor(number / base)
  }

  return digits.reverse().join("")
}

function decodeFromBase(numberString: string, base: number): number {
  const numberStringLength = numberString.length;
  let number = 0;
  for (let i = 0; i < numberStringLength; i++) {
    number += characterToDigit(numberString[numberStringLength - 1 - i]) * (base ** i);
  }
  return number;
}

function decodeFractionsFromBase(numberString: string, base: number): number {
  const numberStringLength = numberString.length;
  let number = 0;
  for (let i = 0; i < numberStringLength; i++) {
    number += characterToDigit(numberString[i]) * (base ** -(i + 1));
  }
  return number;
}

function splitWholeAndFractional(number: number): [number, number] {
  let separatedNumber = number.toString().split(".")
  return [Number(separatedNumber[0]), Number(`0.${separatedNumber[1]}`)]
}

function convertFractionalPart(decimalPart: string, base: number, maxPrecision: number = 16): string {
  const fractionalBaseN: string[] = []
  let nextFractional = Number(`0.${decimalPart}`)

  let i = 0
  while (nextFractional > 0 && i < maxPrecision) {
    let decimalWhole = splitWholeAndFractional(nextFractional * base)
    fractionalBaseN.push(digitToCharacter(decimalWhole[0]))
    nextFractional = decimalWhole[1]
    i += 1
  }

  return fractionalBaseN.join("")
}
export function convertNumberBase(numberString: string, baseA: number, baseB: number) {
  const wholePart = numberString.split(".")[0]
  let wholeInBaseB = ""

  if (wholePart) {
    const wholeNumber = decodeFromBase(wholePart, baseA)
    wholeInBaseB = encodeInBase(wholeNumber, baseB)
  } else {
    return ""
  }

  const decimalPart = numberString.split(".")[1]
  let fractionalInBaseB = ""

  if (decimalPart) {
    const fractionalNumber = decodeFractionsFromBase(decimalPart, baseA)
    fractionalInBaseB = convertFractionalPart(fractionalNumber.toString().split(".")[1], baseB)
  } else {
    return wholeInBaseB
  }

  return `${wholeInBaseB}.${fractionalInBaseB}`
}
