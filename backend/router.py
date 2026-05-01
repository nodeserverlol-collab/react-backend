from fastapi import APIRouter, Request, HTTPException
from init import cmc_client
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter(prefix='/currencies')  
limiter = Limiter(key_func=get_remote_address, default_limits=["10/minute"])

@router.get("/")  
@limiter.limit("10/minute")
async def get_currencies(request: Request):
    return await cmc_client.get_listing()

@router.get("/{currency_id}")  
@limiter.limit("10/minute")
async def get_cryptocurrency(request: Request, currency_id: int):
    result = await cmc_client.get_currency(currency_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Currency not found")
    return result