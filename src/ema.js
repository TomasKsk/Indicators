// exponential moving average indicator in Javascript ES6
// The EMA is a moving average that places a greater weight and significance on the most recent data points. (price(t) * k) + (EMA(y) * (1 – k)) k - alpha
//Version - Improved readability
const ema = (arr, num) => {
    const k = 2 / (num + 1);
    let emaPrev = arr.slice(0, num).reduce((a, b) => a + b) / num;
    
    return arr.map((_, a) => {
      if (a < num) {
        return null;
      } else {
        const emaCurrent = (arr[a] * k) + (emaPrev * (1 - k));
        emaPrev = emaCurrent;
        return Number(emaCurrent.toFixed(4));
      }
    });
};
// Feed the function with an array[] (as arr in func) and the period length - number - of the exponential moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of ema
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(sma(data,3));
// (8) [null, null, null, 1.917, 2.683, 3.283, 3.983, 4.267]

*/