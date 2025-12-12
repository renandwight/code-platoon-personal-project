from datetime import datetime, timedelta

def massive_aggs_url(stock:str, multiplier=1, timespan='day'):
        stock = stock.upper()
        start_date = datetime.today().date() - timedelta(days=365*2)
        end_date = datetime.today().date()
        return (f'https://api.massive.com/v2/aggs/ticker/'
                f'{stock}/range/{multiplier}/{timespan}/'
                f'{start_date}/{end_date}')