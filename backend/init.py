from http_client import CMCHTTPClient
from main import settings   # ← теперь из config, а не из main

cmc_client = CMCHTTPClient(
    base_url="https://pro-api.coinmarketcap.com",
    api_key=settings.CMC_API_KEY
)