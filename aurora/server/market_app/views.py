import os
import pprint
import requests
from massive import RESTClient
from rest_framework.views import APIView
from rest_framework.response import Response
pp = pprint.PrettyPrinter(indent=2, depth=2)

from datetime import datetime, timedelta
from .serializers import StockDataSerializer

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
        stock = 'AAPL'
        multiplier = 1
        timespan = 'day'
        start_date = datetime.today().date() - timedelta(days=365*2)
        end_date = datetime.today().date()
        endpoint = f"https://api.massive.com/v2/aggs/ticker/{stock}/range/{multiplier}/{timespan}/{start_date}/{end_date}?adjusted=true&sort=asc&apiKey={api_key}"
        response = requests.get(endpoint)
        responseJSON = response.json()

        ticker = responseJSON.get("ticker")
        results = responseJSON.get("results", [])
        data = []
        for price in results:
            data.append({
                "ticker": ticker,
                "open": price.get("o"),
                "high": price.get("h"),
                "low": price.get("l"),
                "close": price.get("c"),
            })

        stock_data = StockDataSerializer(data, many=True)
        return Response(stock_data.data, status=HTTP_200_OK)
