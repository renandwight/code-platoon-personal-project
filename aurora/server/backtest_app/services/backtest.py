from backtesting import Backtest
import pandas as pd

# https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html

class Backtest():
    pass

# params = 
# data,       pandas df OHLC (df['Open'] = df['High'] = df['Low'] = df['Close'])
# strategy,
# *,
# cash=10000,
# spread=0.0,
# commission=0.0,
# margin=1.0,
# trade_on_close=False,
# hedging=False,
# exclusive_orders=False,
# finalize_trades=False



# def optimize(self,
#             *,
#             maximize='SQN',
#             method='grid',
#             max_tries=None,
#             constraint=None,
#             return_heatmap=False,
#             return_optimization=False,
#             random_state=None,
#             **kwargs
# ):
#     pass

# def run(self, **kwargs):
#     pass

# Backtest(TICKER, SmaCross).run() --> returns pd.Series of results too include sharpe, sortino, and CAGR