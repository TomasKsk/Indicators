// Moving average convergence/divergence (MACD, or MAC-D) in Javascript ES6 - !!! This function requires to have also the ema function listed above
// The MACD is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMAs) of a security’s price.
// MACD = (n - slower Period EMA) − (n - faster Period EMA)
//Version - Improved readability
const macd = (slow, fast, price) => {
    const fastMa = ema(price, fast);
    const slowMa = ema(price, slow);
  
    const result = [];
  
    for (let a = 0; a < fastMa.length; a++) {
      if (slowMa[a] !== null && fastMa[a] !== null) {
        result.push(+((fastMa[a] - slowMa[a]).toFixed(4)));
      } else {
        result.push(null);
      }
    }
  
    return result;
};
// MACD requires 2 num lengths: slow(higher num), faster(lower num) for ema and a data array containing numbers. 
// The function returns an array ([null,null,null,2,3,4...]) where ammounts of null == length of slow ema
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(macd(5,2, data))
// (8) [null, null, null, null, null, 0.7733, 1.0067, 0.77]
*/ 