from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from user_app.views import UserPermissions

from .serializers import (
    Watchlist,
    WatchlistItem, 
    WatchlistItemCreateSerializer, 
    WatchlistItemSerializer, 
    WatchlistRenameSerializer, 
    WatchlistSerializer
)

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_204_NO_CONTENT, 
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)
