export function padNumber(value: number, digits = 2) {
  return String(value).padStart(digits, '0')
}
