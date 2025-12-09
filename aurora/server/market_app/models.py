from django.db import models

class Stocks(models.Model):
    pass
    # id pk
    # ticker

class StockPriceHistory(models.Model):
    pass
    # id pk
    # stock_id fk
    # price_date
    # closing_price
    
