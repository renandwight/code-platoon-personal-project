from django.urls import path
from .views import MarektData

urlpatterns = [
    path("", MarektData.as_view()),
]