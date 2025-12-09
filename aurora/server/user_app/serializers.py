from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import AuroraUser

class UserSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = AuroraUser
        fields = ["id","email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = AuroraUser.objects.create_user(**validated_data)
        return user