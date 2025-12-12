import os
import pprint
import requests
from massive import RESTClient
from rest_framework.views import APIView
from rest_framework.response import Response
pp = pprint.PrettyPrinter(indent=2, depth=2)

from datetime import datetime, timedelta
from .serializers import StockDataSerializer

from utils.urlbuilder import massive_aggs_url
from backtest_app.services.backtest import BacktestManager, BuyAndHold

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_204_NO_CONTENT, 
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)

class MarektData(APIView):
    def get(self, request):
        api_key = os.environ.get('MASSIVE_API_KEY')
        # endpoint = f"https://api.massive.com/v2/aggs/ticker/{stock}/range/{multiplier}/{timespan}/{start_date}/{end_date}?adjusted=true&sort=asc&apiKey={api_key}"
        # ?adjusted=true&sort=asc&apiKey={api_key}"

        endpoint = massive_aggs_url('AAPL')

        response = requests.get(endpoint, params={'adjusted': 'true', 'sort': 'asc', 'apiKey': api_key})
        responseJSON = response.json()
        if responseJSON.get("results") is None:
            return Response({"No data found. Ticker may be invalid"}, status=HTTP_400_BAD_REQUEST)
        ticker = responseJSON.get("ticker")
        results = responseJSON.get("results", [])
        backtest = BacktestManager(results, BuyAndHold, cash=10000)


        # stock_data = StockDataSerializer(data, many=True)
        # return Response(stock_data.data, status=HTTP_200_OK)
