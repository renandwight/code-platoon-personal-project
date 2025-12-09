import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import pprint

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_204_NO_CONTENT, 
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)

pp = pprint.PrettyPrinter(indent=2, depth=2)

class MarektNews(APIView):
    def get(self, request):
        api_key = getattr(settings, "MARKET_AUX_API_KEY")
        endpoint = f"https://api.marketaux.com/v1/news/all?sentiment_gte=0.1&language=en&api_token={api_key}"
        response = requests.get(endpoint)
        responseJSON = response.json()
        pp.pprint(responseJSON)
        # return Response(responseJSON, status=HTTP_200_OK)