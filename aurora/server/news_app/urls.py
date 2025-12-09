from django.urls import path
from .views import MarektNews

urlpatterns = [
    path("", MarektNews.as_view()),
]