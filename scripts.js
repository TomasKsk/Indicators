// Simple moving average indicator in Javascript ES6
// A simple moving average (SMA), is calculated by taking the arithmetic mean of a given set of values over a specified period (A1 + A2 + ... + An) / n
const sma = (arr, num) => {
    return arr.map((_,a) => (a >= num) ? Number((arr.slice(a - num, a)
        .reduce((a,b) => a+b) / num).toFixed(4)) : null
    );
};
// Feed the function with an array[] (as arr in func) and the period length - number - of the simple moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of sma
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(sma(data,3));
// (8) [null, null, null, 1.8333, 2.1667, 2.5667, 3.0667, 4.0333]

*/


// exponential moving average indicator in Javascript ES6
// The EMA is a moving average that places a greater weight and significance on the most recent data points. (price(t) * k) + (EMA(y) * (1 – k))
const ema = (arr, num) => {
    const k = 2 / (num + 1);
    return arr.map((_,a) => (a >= num) ? Number(((arr[a] * k) + (arr.slice(a - num, a)
      .reduce((a,b) => a+b) / num) * (1 - k)).toFixed(3)) : null
    );
};
// Feed the function with an array[] (as arr in func) and the period length - number - of the exponential moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of ema
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(sma(data,3));
// (8) [null, null, null, 1.917, 2.683, 3.283, 3.983, 4.267]

*/