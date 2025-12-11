import os
from massive import RESTClient

# https://deepwiki.com/massive-com/client-python/3-restclient-guide

# return RESTClient(api_key=settings.MASSIVE_API_KEY, trace=True, verbose=True)

# https://api.massive.com/v2/aggs/ticker/{
#     TICKER}/range/1/day/{
#         START_DATE:YYYY-MM-DD}/{
#             END_DATE: YYYY-MM-DD
#             }?adjusted=true&sort=asc&limit={LIMIT}&apiKey={key}

# limit is optional but up to a max of 50000 (two years with daily request = ~500)
# daily = multi: 1; timespan: day           501
# weekly = multi: 7; timespan: day          105
# bi-weekly = multi: 14; timespan: day      53 
# monthly = mutli: 1; timespan: month       25
# timespan options (s, m, h, d, w, m, q, y) instead of "day"