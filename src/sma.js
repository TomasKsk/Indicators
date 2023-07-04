// Simple moving average indicator in Javascript ES6
// A simple moving average (SMA), is calculated by taking the arithmetic mean of a given set of values over a specified period (A1 + A2 + ... + An) / n
//Version - Improved readability
const sma = (arr, num) => {
    const result = Array(num).fill(null);
    
    for (let i = num - 1; i < arr.length; i++) {
      const sum = arr.slice(i - num + 1, i + 1).reduce((a, b) => a + b);
      const average = sum / num;
      const roundedAverage = Number(average.toFixed(4));
      result.push(roundedAverage);
    }
    
    return result;
};

// Feed the function with an array[] (as arr in func) and the period length - number - of the simple moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of sma
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(sma(data,3));
// (8) [null, null, null, 1.8333, 2.1667, 2.5667, 3.0667, 4.0333]

*/