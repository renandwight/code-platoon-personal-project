from rest_framework import serializers


class BacktestSerializer(serializers.Serializer):
    equity_final = serializers.FloatField()
    return_pct = serializers.FloatField()
    buy_hold_return_pct = serializers.FloatField()
    return_ann_pct = serializers.FloatField()
    cagr_pct = serializers.FloatField()
    sharpe_ratio = serializers.FloatField()
    sortino_ratio = serializers.FloatField()
    calmar_ratio = serializers.FloatField()
    alpha_pct = serializers.FloatField()
    beta = serializers.FloatField()
    max_drawdown_pct = serializers.FloatField()

class EquitySerializer(serializers.Serializer):
    date = serializers.CharField()
    equity = serializers.FloatField(source="Equity")

class BacktestSummarySerializer(serializers.Serializer):
    ticker = serializers.CharField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    summary = BacktestSerializer(many=True)
    equity = EquitySerializer(many=True)

class QuerySerializer(serializers.Serializer):
    ticker = serializers.CharField(min_length=1, max_length=8)
    cash = serializers.DecimalField(
        max_digits=8, decimal_places=2, min_value=1.00, max_value=100_000.00)
