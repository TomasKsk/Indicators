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
// The EMA is a moving average that places a greater weight and significance on the most recent data points. (price(t) * k) + (EMA(y) * (1 – k)) k - alpha
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


// Average true range indicator in Javascript ES6 - ATR = (Previous ATR * (n - 1) + TR) / n
// Where: ATR = Average True Range n = number of periods or bars TR = True Range
// The True Range for today is the greatest of the following [Today's high minus today's low, The absolute value of today's high minus yesterday's close, The absolute value of today's low minus yesterday's close]
// Using a simple moving average for the results
function atr(emaNum, priceLow, priceHigh, priceClose) {
    return sma(
        priceClose.map((_,a) => {
            return (a > 0) ? Math.max(
                priceHigh[a] - priceLow[a],
                Math.abs(priceHigh[a] - priceClose[a - 1]),
                Math.abs(priceClose[a - 1] - priceLow[a])
                ) : priceHigh[a] - priceLow[a];
            })
        , emaNum);
};
// The ATR requires 3 arrays - Low numbers, High numbers, mid numbers /or price low, price high, price close
// The function returns an array ([null,null,null,2,3,4...]) where ammounts of null == length of sma
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
let data1 = [3,4,4.5,4,5.2,6,6.9,6.5]
let data2 = [0.3,0,0.5,0,1.2,2,2.9,2.5]
console.log(atr(3, data, data1, data2))
// (8) [null, null, null, 3.4, 3.9, 4.4, 4.5, 4.9667]
*/