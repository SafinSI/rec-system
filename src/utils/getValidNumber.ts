export const getValidNumber = (value: string, minValue: number, maxValue: number) => {
  const validValue = value.replace(/[^\d]/g, "")
  const isValueEmpty = validValue.length === 0
  const lastNum = Number(validValue[validValue.length - 1])
  const validNumber = Number(validValue)

  if ((validNumber >= minValue && validNumber <= maxValue) || isValueEmpty) {
    return validValue
  }
  if (lastNum >= minValue && lastNum < maxValue) {
    return String(lastNum)
  }
  return ""
}
