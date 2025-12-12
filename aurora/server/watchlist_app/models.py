from django.db import models
from user_app.models import AuroraUser
from django.core import validators as v
from .validators import validate_name

# https://www.tutorialspoint.com/adding-json-field-in-django-models

class Watchlist(models.Model):
    user = models.ForeignKey(AuroraUser, on_delete=models.CASCADE, related_name="watchlists")
    name = models.CharField(default="Watchlist", unique=True, validators = [v.MinLengthValidator(1), v.MaxLengthValidator(15), validate_name])

class WatchlistItem(models.Model):
    watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE, related_name="items")
    ticker = models.CharField(max_length=5, validators=[v.MinLengthValidator(1), v.MaxLengthValidator(5)])
    summary = models.JSONField()

