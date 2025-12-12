from rest_framework.serializers import ModelSerializer
from .models import Watchlist, WatchlistItem


class WatchlistItemSerializer(ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = ["id", "watchlist", "ticker", "summary"]
        read_only_fields = ["id"]

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
