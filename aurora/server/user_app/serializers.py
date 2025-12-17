from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import AuroraUser

class UserSerializer(ModelSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = AuroraUser
        fields = ["id","email", "username", "password", "token"]
        extra_kwargs = {
            "password": {"write_only": True},
            "username": {"write_only": True},}

    def create(self, validated_data):
        if not validated_data.get("username"):
            validated_data["username"] = validated_data.get("email")
        return AuroraUser.objects.create_user(**validated_data)
