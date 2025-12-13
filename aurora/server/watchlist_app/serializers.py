from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Watchlist, WatchlistItem


class WatchlistItemSerializer(ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = [
            "id",
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
        ]
        read_only_fields = ["id"]

class WatchlistItemCreateSerializer(ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = [
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
        ]

    def validate_ticker(self, value):
            value = value.strip().upper()
            if not value:
                raise ValidationError("Please inut a 'TICKER'.")
            return value
    
class WatchlistSerializer(ModelSerializer):
    items = WatchlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ["id", "name", "items"]
        read_only_fields = ["id", "items"]

class WatchlistRenameSerializer(ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["name"]

    def validate_name(self, value):
        if not value.strip():
            raise ValidationError("Please input a Name.")
        return value.strip()
    
