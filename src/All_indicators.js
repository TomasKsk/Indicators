// Simple moving average indicator in Javascript ES6
// A simple moving average (SMA), is calculated by taking the arithmetic mean of a given set of values over a specified period (A1 + A2 + ... + An) / n
const sma2 = (arr, num) => {
    return arr.map((_,a) => (a >= num) ? Number((arr.slice(a - num, a)
        .reduce((a,b) => a+b) / num).toFixed(4)) : null
    );
};

//Version - Improved readability
const sma = (arr, num) => {
    const result = Array(num).fill(null);
    
    for (let i = num - 1; i < arr.length; i++) {
      const sum = arr.slice(i - num + 1, i + 1).reduce((a, b) => a + b);
      const average = sum / num;
      result.push(+(average.toFixed(4)));
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


// exponential moving average indicator in Javascript ES6
// The EMA is a moving average that places a greater weight and significance on the most recent data points. (price(t) * k) + (EMA(y) * (1 – k)) k - alpha
const ema2 = (arr, num) => {
    const k = 2 / (num + 1);
    return arr.map((_,a) => (a >= num) ? Number(((arr[a] * k) + (arr.slice(a - num, a)
      .reduce((a,b) => a+b) / num) * (1 - k)).toFixed(4)) : null
    );
};

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
        return +(emaCurrent.toFixed(4));
      }
    });
};
// Feed the function with an array[] (as arr in func) and the period length - number - of the exponential moving average (as num in the func)
// The function will return an array (ie: [null,null,null,2,3,4...]) where ammounts of null == length of ema
/*
example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5]
console.log(ema(data,3));
// (8) [ null, null, null, 1.9167, 2.5583, 3.2792, 4.0896, 4.2948 ]

*/


// !!! This function requires to have also the sma() function !!!
// Average true range indicator in Javascript ES6 - ATR = (Previous ATR * (n - 1) + TR) / n 
// Where: ATR = Average True Range n = number of periods or bars TR = True Range
// The True Range for today is the greatest of the following [Today's high minus today's low, The absolute value of today's high minus yesterday's close, 
// The absolute value of today's low minus yesterday's close]
// Using a simple moving average for the results
const atr2 = (emaNum, priceLow, priceHigh, priceClose) => {
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


// Moving average convergence/divergence (MACD, or MAC-D) in Javascript ES6 - !!! This function requires to have also the ema function listed above
// The MACD is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMAs) of a security’s price.
// MACD = (n - slower Period EMA) − (n - faster Period EMA)
const macd2 = (slow, fast, price) => {
    let fastMa = ema(price, fast);
    let slowMa = ema(price, slow);
    return fastMa.map((_,a) => {
      return (slowMa[a] !== null && fastMa[a] !== null)
      ? Number((fastMa[a] - slowMa[a]).toFixed(4))
      : null;
    });
};

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




// !!! This function requires to have also the sma() function !!!
// The DIDI index is calculated using the short-term, medium-term, and long-term moving averages. 
// The green line is calculated by dividing the short-term moving average by the medium-term moving average, 
// and the yellow line is calculated by dividing the long-term moving averages by the medium-term moving averages.
const didiIndex = (short, mid, long, arr) => {
    let tempLong = sma(long, arr);
    let tempShort = sma(short, arr);
    let tempMid = sma(mid, arr);
  
    let nullindex = tempLong.filter(a => a == null).length;
  
    let short1 = Array(nullindex).fill(null);
    let long1 = Array(nullindex).fill(null);
    for (let a = (nullindex); a <= (tempLong.length - 1); a++) {
      short1.push(+(((tempShort[a]/tempMid[a] - 1)*100).toFixed(3)));
      long1.push(+(((tempLong[a]/tempMid[a] - 1)*100).toFixed(3)));
    };
  
    return {
      short: short1,
      long: long1
    };
};

/*
Example:
let data = [1,2,2.5,2,3.2,4,4.9,4.5];
console.log(didiIndex(2, 3, 4, data));
// Output: { short: [ null, null, null, null, 3.845, 1.297, 17.39, 10.331, 5.223 ],
  long: [ null, null, null, null, -13.463, -5.521, -4.621, -12.603, -7.09 ] }
*/