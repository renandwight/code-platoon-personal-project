

export function flattenTickerSummary(backtestData) {
  if (!backtestData) return {};

  const { meta = {}, summary = {} } = backtestData;

  const allowedFields = [
    "ticker",
    "cash",
    "start_date",
    "end_date",
    "equity_final",
    "return_pct",
    "buy_hold_return_pct",
    "return_ann_pct",
    "cagr_pct",
    "sharpe_ratio",
    "sortino_ratio",
    "calmar_ratio",
    "alpha_pct",
    "beta",
    "max_drawdown_pct",
  ];

  const merged = { ...meta, ...summary };

  return Object.fromEntries(
    Object.entries(merged).filter(([key]) => allowedFields.includes(key))
  );
};
