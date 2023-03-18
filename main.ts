function digitToChar(digit: number): string {
  const chars = "0123456789ABCDEFGHJIJKLMNOPQRSTUVWXYZ"
  return chars[digit]
}

function charToDigit(char: string): number {
  const chars = "0123456789ABCDEFGHJIJKLMNOPQRSTUVWXYZ"
  return chars.indexOf(char)
}

function toBaseN(number: number, base: number): string {
  if (number === 0) return "0"

  let digits: string[] = []
  while (number > 0) {
    digits.push(digitToChar(number % base))
    number = Math.floor(number / base)
  }

  return digits.reverse().join("")
}

function fromBaseN(numberString: string, base: number) {
  const reverseNumberString = numberString.split("").reverse().join("");
  let number = 0
  for (let i = 0; i < reverseNumberString.length; i++) {
    number += charToDigit(reverseNumberString[i]) * (base ** i)
  }
  return number
}

function convertBase(numberString: string, baseA: number, baseB: number) {
  const decimalNumber = fromBaseN(numberString, baseA)
  return toBaseN(decimalNumber, baseB)
}
