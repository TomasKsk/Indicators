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