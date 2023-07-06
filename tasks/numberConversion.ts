function arabicToRoman(num) {
  if (typeof num !== 'number' || num <= 0) {
    throw new Error('Error! Please provide a positive whole number.');
  }

  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    XXX: 30,
    XX: 20,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = '';
  const romans = Object.keys(romanNumerals);

  for (let i = 0; i < romans.length; ++i) {
    const val = romanNumerals[romans[i]];
    while (num >= val) {
      num -= val;
      result += romans[i];
    }
  }

  return result;
}
