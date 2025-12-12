import os
import pprint
import requests
from massive import RESTClient
from rest_framework.views import APIView
from rest_framework.response import Response
pp = pprint.PrettyPrinter(indent=2, depth=2)

from .serializers import BacktestSummarySerializer

from .utils.urlbuilder import massive_aggs_url
from .services.backtest import BacktestManager, BuyAndHold

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
        massive_url, start_date, end_date = massive_aggs_url('AAPL')
        response = requests.get(
            massive_url, params={'adjusted': 'true', 'sort': 'asc', 'apiKey': api_key})
        # return Response({response.url})

        responseJSON = response.json()

        if responseJSON.get("results") is None:
            return Response({"No data found. Ticker may be invalid"}, status=HTTP_400_BAD_REQUEST)
        
        ticker = responseJSON.get("ticker")
        results = responseJSON.get("results", [])

        cash = 10000

        initiate_backtest = BacktestManager(results, BuyAndHold, cash)
        backtest = initiate_backtest.run_backtest()
        backtest_results = {"ticker": ticker, "start_date": start_date, "end_date": end_date, **backtest}
        backtest_results["summary"] = [backtest["summary"]]

        backtest_summary = BacktestSummarySerializer(backtest_results)
        return Response(backtest_summary.data, status=HTTP_200_OK)


