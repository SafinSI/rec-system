export const getValidNumber = (value, minValue, maxValue) => {
  const validValue = value.replace(/[^\d]/g, "");
  const lastNum = validValue[validValue.length - 1];
  if ((validValue >= minValue && validValue <= maxValue) || validValue === "") {
    return validValue;
  }
  if (lastNum >= minValue && lastNum < maxValue) {
    return lastNum;
  }
  return "";
};
