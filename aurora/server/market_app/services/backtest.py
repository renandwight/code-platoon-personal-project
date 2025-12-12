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
    
    def run_backtest(self) -> dict:
        backtest_instance = Backtest(self.df, self.strategy, cash=self.cash)
        backtest_run_data = backtest_instance.run()

        backtest_data = backtest_run_data[
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

        metric_data = backtest_data.astype(float).round(2)

        summary_data = {
            "equity_final": float(metric_data["Equity Final [$]"]),
            "return_pct": float(metric_data["Return [%]"]),
            "buy_hold_return_pct": float(metric_data["Buy & Hold Return [%]"]),
            "return_ann_pct": float(metric_data["Return (Ann.) [%]"]),
            "cagr_pct": float(metric_data["CAGR [%]"]),
            "sharpe_ratio": float(metric_data["Sharpe Ratio"]),
            "sortino_ratio": float(metric_data["Sortino Ratio"]),
            "calmar_ratio": float(metric_data["Calmar Ratio"]),
            "alpha_pct": float(metric_data["Alpha [%]"]),
            "beta": float(metric_data["Beta"]),
            "max_drawdown_pct": float(metric_data["Max. Drawdown [%]"]),
        }

        equity_plot_data = backtest_run_data._equity_curve.copy().reset_index()

        if "index" in equity_plot_data.columns:
            equity_plot_data.rename(columns={"index": "Date"}, inplace=True)

        equity_plot = [
            {
                "date": row["Date"].strftime("%Y-%m-%d"),
                "Equity": float(row["Equity"]),
            }
            for _, row in equity_plot_data.iterrows()
        ]

        return {
            "summary": summary_data,
            "equity": equity_plot,
        }