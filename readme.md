# Indicators

Indicator functions in Javascript for graphs and trading data. The indicator information with examples is included in the comment section in each of the function or the main All_indicators.js.

Use All_indicators.js for all indicator functions, or use the separate indicators (be aware that some of them require other indicators to run properly - check the comments)


## Current indicators

| Indicator name                                      | Short name        | Usage                                      |
| --------------------------------------------------- |:-----------------:| ------------------------------------------:|
| Simple moving average | SMA | sma(arr, num); |
| Exponential moving average | EMA | ema(arr, num); |
| Average True Range | ATR | atr(emaNum, priceLow, priceHigh, priceClose); |
| Moving average convergence/divergence | MACD | macd(slow, fast, price); |
| Standard Deviation | stDev | stDev(length, price); |