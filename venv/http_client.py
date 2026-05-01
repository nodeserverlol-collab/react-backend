from aiohttp import ClientSession
from async_lru import alru_cache

class CMCHTTPClient:
    def __init__(self, base_url: str, api_key: str):
        self._base_url = base_url
        self._api_key = api_key
        self._session = None

    @alru_cache
    async def _get_session(self) -> ClientSession:
        if self._session is None:
            self._session = ClientSession(
                base_url=self._base_url,
                headers={'X-CMC_PRO_API_KEY': self._api_key}
            )
        return self._session

    @alru_cache
    async def get_listing(self, limit: int = 10):
        session = await self._get_session()
        async with session.get("/v1/cryptocurrency/listings/latest",
                               params={"limit": limit}) as resp:
            result = await resp.json()
            return result.get("data", [])

    @alru_cache
    async def get_currency(self, currency_id: int):
        session = await self._get_session()
        async with session.get("/v2/cryptocurrency/quotes/latest",
                               params={"id": currency_id}) as resp:
            result = await resp.json()
            data = result.get("data", {})
            return data.get(str(currency_id))

    async def close(self):
        if self._session:
            await self._session.close()