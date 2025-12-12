import pandas as pd
from datetime import datetime, timezone
from backtesting import Backtest, Strategy

class BuyAndHold(Strategy):
    def init(self):
        pass 

    def next(self):
        if len(self.trades) == 0:
            price = self.data.Close[-1]
            units = int(self.equity / price)
            if units > 0:
                self.buy(size=units)

class BacktestManager:
    def __init__(self, results, strategy, cash):
        self.strategy = strategy
        self.cash = cash
        self.df = self._configure_data(results)

    def _configure_data(self, results):
        df = pd.DataFrame([
            {
                "Date": datetime.fromtimestamp(price["t"] / 1000, tz=timezone.utc),
                "Open": price["o"],
                "High": price["h"],
                "Low":  price["l"],
                "Close": price["c"],
            }
            for price in results
        ])
        df.set_index("Date", inplace=True)
        df.sort_index(inplace=True)
        return df[["Open", "High", "Low", "Close"]]
    
    def run_backtest(self):
        backtest_instance = Backtest(self.df, self.strategy, self.cash)
        backtest_data = backtest_instance.run()

        backtest_data = backtest_data[
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

        summary_data = backtest_data.astype(float).round(2)
        summary_plot = summary_data['_equity_curve']

        print(summary_data)
        print(summary_plot)