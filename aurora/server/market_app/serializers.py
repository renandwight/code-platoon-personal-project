from rest_framework import serializers

class StockDataSerializer(serializers.Serializer):
    ticker = serializers.CharField()
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    close = serializers.FloatField()