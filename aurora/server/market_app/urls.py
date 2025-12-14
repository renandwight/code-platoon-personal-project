from django.urls import path
from .views import MarektData

urlpatterns = [
    path("<str:ticker>/<str:cash>/", MarektData.as_view()),
]