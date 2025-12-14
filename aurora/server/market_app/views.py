import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import QuerySerializer

from .utils.urlbuilder import massive_aggs_url
from .services.backtest import BacktestManager, BuyAndHold

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_400_BAD_REQUEST,
)

class MarektData(APIView):

    def get(self, request, ticker, cash):
        validate_data = QuerySerializer(data={"ticker": ticker, "cash": cash})
        validate_data.is_valid(raise_exception=True)
        ticker=validate_data.validated_data["ticker"]
        cash=validate_data.validated_data["cash"]
        api_key = os.environ.get('MASSIVE_API_KEY')
        massive_url, start_date, end_date = massive_aggs_url(ticker)
        response = requests.get(
            massive_url, params={'adjusted': 'true', 'sort': 'asc', 'apiKey': api_key})
        responseJSON = response.json()
        if responseJSON.get("results") is None:
            return Response({"No data found. Ticker may be invalid"}, status=HTTP_400_BAD_REQUEST)
        ticker = responseJSON.get("ticker")
        results = responseJSON.get("results", [])
        initiate_backtest = BacktestManager(results, BuyAndHold, cash)
        backtest = initiate_backtest.run_backtest()

        backtest_results = {
            "meta": 
                {
                "ticker": ticker, 
                "start_date": start_date, 
                "end_date": end_date, 
                "cash": int(cash),
                },
            "summary": 
                {
                **backtest["summary"],              
                },
            "equity": backtest["equity"]
        }

        return Response(backtest_results, status=HTTP_200_OK)


