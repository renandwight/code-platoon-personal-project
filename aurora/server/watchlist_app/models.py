from django.db import models

# Create your models here.

class Portfolios(models.Model):
    pass
    # id pk
    # user_id fk
    # name

class PortfolioStocks(models.Model):
    pass
    # id pk
    # portfolio_id fk manytoone
    # stock_id fk   manytoone

