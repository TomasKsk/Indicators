# Indicators

Indicator functions in Javascript for graphs and trading data. The indicator information with examples is included in the script.js file.

Use scripts.js for all indicators, or use the separate indicators (be aware that some of them require other indicators to run properly - check the comments)


## Current indicators

- Simple moving average (SMA)                   -  sma(arr, num);
- Exponential moving average (EMA)              -  ema(arr, num);
- Average True Range (ATR)                      -  atr(emaNum, priceLow, priceHigh, priceClose);
- Moving average convergence/divergence (MACD)  -  macd(slow, fast, price);