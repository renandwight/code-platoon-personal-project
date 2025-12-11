from rest_framework import serializers

class NewsSerializer(serializers.Serializer):
    title = serializers.CharField(allow_null=False)
    image_url = serializers.CharField(allow_null=True, required=False)
    snippet = serializers.CharField(allow_null=True, required=False)
    url = serializers.URLField(allow_null=False)
