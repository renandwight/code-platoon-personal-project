from django.urls import path
from .views import All_Watchlists, A_Watchlist, TickerSummaryList, RemoveTicker

urlpatterns = [
    path("", All_Watchlists.as_view()),
    path("<int:watchlist_id>", A_Watchlist.as_view()),
    path("<int:watchlist_id>/items/", TickerSummaryList.as_view()),
    path("<int:watchlist_id>/items/<int:item_id>/", RemoveTicker.as_view()),
]