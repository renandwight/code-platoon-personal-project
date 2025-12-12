from datetime import datetime, timedelta

def massive_aggs_url(stock:str, multiplier=1, timespan='day'):
        stock = stock.upper()
        start_date = datetime.today().date() - timedelta(days=365*2)
        end_date = datetime.today().date()
        massive_url = f'https://api.massive.com/v2/aggs/ticker/{stock}/range/{multiplier}/{timespan}/{start_date}/{end_date}'
        return massive_url, start_date, end_date