import os
import pprint
import json
import requests
from .serializers import NewsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
pp = pprint.PrettyPrinter(indent=2, depth=2)

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_201_CREATED, 
    HTTP_204_NO_CONTENT, 
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)

class MarektNews(APIView):
    def get(self, request):
        api_key = os.environ.get('MARKET_AUX_API_KEY')
        endpoint = f"https://api.marketaux.com/v1/news/all?sentiment_gte=0.1&language=en&api_token={api_key}"
        response = requests.get(endpoint)
        responseJSON = response.json()

        articles = responseJSON.get("data", [])
        data = [
            {
                "title": d.get("title"),
                "image_url": d.get("image_url"),
                "snippet": d.get("snippet"),
                "url": d.get("url"),
            }
            for d in articles
        ]

        news = NewsSerializer(data, many=True)
        return Response(news.data, status=HTTP_200_OK)