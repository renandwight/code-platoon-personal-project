from django.urls import path
from .views import SignUp, LogIn, LogOut, Info

urlpatterns = [
    path("", Info.as_view()),
    path("signup/", SignUp.as_view()),
    path("logout/", LogOut.as_view()),
    path("login/", LogIn.as_view()),
]