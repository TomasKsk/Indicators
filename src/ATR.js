// Average true range indicator in Javascript ES6 - ATR = (Previous ATR * (n - 1) + TR) / n !!! This function requires to have also the sma function listed above
// Where: ATR = Average True Range n = number of periods or bars TR = True Range
// The True Range for today is the greatest of the following [Today's high minus today's low, The absolute value of today's high minus yesterday's close, The absolute value of today's low minus yesterday's close]
// Using a simple moving average for the results
//Version - Improved readability
const atr = (emaNum, priceLow, priceHigh, priceClose) => {
    const trueRanges = priceClose.map((_, a) => {
      if (a > 0) {
        return Math.max(
          priceHigh[a] - priceLow[a],
          Math.abs(priceHigh[a] - priceClose[a - 1]),
          Math.abs(priceClose[a - 1] - priceLow[a])
        );
      } else {
        return priceHigh[a] - priceLow[a];
      }
    });
  
    const smaResult = sma(trueRanges, emaNum);
    return [...Array(emaNum).fill(null), ...smaResult];
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