function digitToChar(digit: number): string {
  const chars = "0123456789ABCDEFGHJIJKLMNOPQRSTUVWXYZ"
  return chars[digit]
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

console.log(toBaseN(50, 36))

//
function fromBaseN(number, base) {
}
