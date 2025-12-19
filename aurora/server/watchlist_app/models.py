from django.db import models
from user_app.models import AuroraUser
from django.core import validators as v
from .validators import validate_name

class Watchlist(models.Model):
    user = models.ForeignKey(
        AuroraUser, 
        on_delete=models.CASCADE, 
        related_name="watchlists"
        )
    
    name = models.CharField(
        default="Watchlist",
        validators = [
            v.MinLengthValidator(1), 
            v.MaxLengthValidator(15), 
            validate_name
            ])

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["user", "name"], name="unique_watchlist_per_user"
        )]

class WatchlistItem(models.Model):
    watchlist = models.ForeignKey(
        Watchlist, 
        on_delete=models.CASCADE, 
        related_name="items"
        )
    
    ticker = models.CharField(
        max_length=10, 
        validators=[
            v.MinLengthValidator(1), 
            v.MaxLengthValidator(8)
            ])
    
    cash = models.DecimalField(
        max_digits=8, 
        decimal_places=2
        )
    
    start_date = models.DateField()
    end_date = models.DateField()
    equity_final = models.DecimalField(
        max_digits=14, 
        decimal_places=2
    )

    return_pct = models.DecimalField(
        max_digits=10,
        decimal_places=4
    )

    return_ann_pct = models.FloatField(
        null=True,
        blank=True
    )

    buy_hold_return_pct = models.DecimalField(
        max_digits=10,
        decimal_places=4
    )

    cagr_pct = models.DecimalField(
        max_digits=10, 
        decimal_places=4
        )

    sharpe_ratio = models.DecimalField(
        max_digits=12, 
        decimal_places=6, 
        null=True, 
        blank=True
        )

    sortino_ratio = models.DecimalField(
        max_digits=12, 
        decimal_places=6, 
        null=True, 
        blank=True
        )

    calmar_ratio = models.DecimalField(
        max_digits=12, 
        decimal_places=6, 
        null=True, 
        blank=True
        )

    alpha_pct = models.DecimalField(
        max_digits=10, 
        decimal_places=4, 
        null=True, 
        blank=True
        )

    beta = models.DecimalField(
        max_digits=12, 
        decimal_places=6, 
        null=True, 
        blank=True
        )

    max_drawdown_pct = models.DecimalField(
        max_digits=10, 
        decimal_places=4, 
        null=True, 
        blank=True
        )

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["watchlist", "ticker"], name="unique_ticker_per_watchlist"
        )]