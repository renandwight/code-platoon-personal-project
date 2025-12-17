from django.contrib.auth import authenticate, login, logout

from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_204_NO_CONTENT, 
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)

class SignUp(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data["username"] = data.get("email")
            serial_data = UserSerializer(data=data)
            if not serial_data.is_valid():
                return Response(serial_data.errors, status = HTTP_400_BAD_REQUEST)
            user = serial_data.save()
            login(request, user)
            token_inst, _ = Token.objects.get_or_create(user=user)
            return Response(
                {"email": user.email, "token": token_inst.key},
                status=HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": e.args}, status = HTTP_400_BAD_REQUEST
                )
        
class LogIn(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = data.get("email")
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return Response("Username and Password are required", status = HTTP_400_BAD_REQUEST)
        
        user = authenticate(
            username = username,
            password = password,
        )

        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"email": user.email, "token": token.key}, status = HTTP_200_OK
            )
        else:
            return Response("User credentials do not exist", status = HTTP_404_NOT_FOUND)
        
class UserPermissions(APIView):
        authentication_classes = [TokenAuthentication]
        permission_classes = [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user = request.user
        return Response({"email": user.email})
    
class LogOut(UserPermissions):
    def post(self, request):
        token = request.auth
        user = request.user
        try:
            token.delete()
            logout(request)
        except Exception as e:
            return Response(
                {"error": e.args}, status = HTTP_401_UNAUTHORIZED
            )
        return Response(f"{user.email} has successfully logged out", status = HTTP_204_NO_CONTENT)