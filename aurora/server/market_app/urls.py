from django.urls import path
from .views import MarektData

urlpatterns = [
    path("<str:ticker>/<int:cash>/", MarektData.as_view()),
]