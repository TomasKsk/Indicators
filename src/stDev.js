// The Standard deviation (stDev) function calculates the square root of the calculated variance of a set of data.
// It requires two number lengths: length for calculating the moving standard deviation,
// and a data array containing numbers.
const stDev = (length, price) => {
  function deviation(array) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    const sumSqrs = array.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    return +(Math.sqrt(sumSqrs / n).toFixed(4));
  }

  return price.map((_, a) => {
    if (a >= length) {
      const tempArr = price.slice(a - length, a);
      return deviation(tempArr);
    }
    return null;
  });
};
// The function returns an array where the number of null values at the beginning
// is equal to the length specified for calculating the moving standard deviation.
// The subsequent values in the array represent the calculated standard deviation for each
// corresponding position in the data array, rounded to 4 decimal places.
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(macd(5,2, data))
// (8) [ null, null, null, null, 0.5449, 0.4918, 0.7529, 1.0662 ]
*/ 