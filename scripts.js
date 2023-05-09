// Simple moving average indicator in Javascript ES6
const sma = (arr, num) => {
    return arr.map((_,a) => (a >= num) ? Number((arr.slice(a - num, a)
        .reduce((a,b) => a+b) / num).toFixed(4)) : null
    );
};
// Feed the function with an array[] (as arr in func) and the length - number - of the simple moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of sma
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(sma(data,3));
// (8) [null, null, null, 1.8333, 2.1667, 2.5667, 3.0667, 4.0333]

*/