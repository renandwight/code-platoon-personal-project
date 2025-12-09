from django.db import models

class BackTestSummary(models.Model):
    pass
    # id pk
    # portfolio_id fk
    # initial_investment    (post: user_input)
    # start_date            (post: user_input)
    # end_date              (backend calculation)
    # ending_value          (backend calculation)
    # pct_retrun            (backend calculation)
    # cagr                  (backend calculation)
    # allocations           (backend calculation)