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
)

class All_Watchlists(UserPermissions):

    def get(self, request):
        watchlists = Watchlist.objects.filter(user=request.user)
        return Response(WatchlistSerializer(watchlists, many=True).data, status=HTTP_200_OK)

    def post(self, request):
        serializer = WatchlistRenameSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        watchlist = Watchlist.objects.create(
            user=request.user,
            name=serializer.validated_data["name"]
        )
        return Response(WatchlistSerializer(watchlist).data, status=HTTP_201_CREATED)


class A_Watchlist(UserPermissions):

    def get(self, request, watchlist_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        return Response(WatchlistSerializer(watchlist).data, status=HTTP_200_OK)

    def put(self, request, watchlist_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        serializer = WatchlistRenameSerializer(watchlist, data=request.data, partial=False)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(WatchlistSerializer(watchlist).data)

    def delete(self, request, watchlist_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        watchlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class TickerSummaryList(UserPermissions):

    def get(self, request, watchlist_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        items = (WatchlistItem.objects.filter(watchlist=watchlist))
        return Response(WatchlistItemSerializer(items, many=True).data, status=HTTP_200_OK)

    def post(self, request, watchlist_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        serializer = WatchlistItemCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        item = serializer.save(watchlist=watchlist)
        return Response(WatchlistItemSerializer(item).data, status=HTTP_201_CREATED)

class RemoveTicker(UserPermissions):

    def delete(self, request, watchlist_id, item_id):
        watchlist = get_object_or_404(Watchlist, id=watchlist_id, user=request.user)
        item = get_object_or_404(WatchlistItem, id=item_id, watchlist=watchlist)
        item.delete()
        return Response(status=HTTP_204_NO_CONTENT)