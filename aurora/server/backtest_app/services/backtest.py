from backtesting import Backtest, Strategy
import pandas as pd
from backtesting.test import GOOG

# https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html

## transform massive api ohlc prices into list then convert into df to pass into backtest
# ohlc_df = pd.DataFrame({'Open':[],'High':[], 'Low':[], 'Close':[], })

class BuyAndHold(Strategy):
    def init(self):
        pass 

    def next(self):
        if len(self.trades) == 0:
            price = self.data.Close[-1]
            units = int(self.equity / price)
            if units > 0:
                self.buy(size=units)

bt = Backtest(GOOG, BuyAndHold, cash=10000)

stats = bt.run()
# print(stats.index)
# print(stats.dtypes)
stats_df = stats[
    [
        'Equity Final [$]',
        'Return [%]',
        'Buy & Hold Return [%]',
        'Return (Ann.) [%]',
        'CAGR [%]',
        'Sharpe Ratio',
        'Sortino Ratio',
        'Calmar Ratio',
        'Alpha [%]',
        'Beta',
        'Max. Drawdown [%]'
        ]]

stats_df = stats_df.astype(float).round(2)
print(stats_df)

# plot_data = stats['_equity_curve']
# print(plot_data.index)


## Backtest parameter args
# params = 
# data,       pandas df OHLC (df['Open'] = df['High'] = df['Low'] = df['Close'])
# strategy,   required (buy hold strat?)
# *,
# cash=10000,
# spread=0.0,
# commission=0.0,
# margin=1.0,
# trade_on_close=False,
# hedging=False,
# exclusive_orders=False,
# finalize_trades=False

