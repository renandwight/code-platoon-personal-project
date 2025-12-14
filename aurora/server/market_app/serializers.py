from rest_framework import serializers

class QuerySerializer(serializers.Serializer):
    ticker = serializers.CharField(min_length=1, max_length=8)
    cash = serializers.IntegerField(min_value=1, max_value=100000)
    
    def validate_ticker(self, value):
        value = value.strip().upper()
        if not value:
            raise serializers.ValidationError("Please input a 'TICKER'.")
        return value
