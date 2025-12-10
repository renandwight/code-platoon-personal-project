from django.shortcuts import render

# Create your views here.
# https://api.massive.com/v2/aggs/ticker/{
#     TICKER}/range/1/day/{
#         START_DATE:YYYY-MM-DD}/{
#             END_DATE: YYYY-MM-DD
#             }?adjusted=true&sort=asc&limit={LIMIT}&apiKey={key}
            #   500 count 2 years limit at 10080 (60min * 24hrs * 7d) 1440min/d
# Limit based on minutes in a day ()
# 252 trading days per year 36w/9m = 3 (3*10080 = 30240) still 500 count
# 10080 * 4.333333333 = 43679.999999 = 43680  (52w/12m = 4.3~) still 500 count
# 500 is max (timespan was set to day and a multiplier of 1)
# based on week with multi of 1 and limit 36 = 8 count