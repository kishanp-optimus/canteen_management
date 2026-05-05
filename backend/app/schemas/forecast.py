from pydantic import BaseModel
from typing import List

class ForecastItem(BaseModel):
    item_id: int
    name: str
    emoji: str
    forecast: int
    history: List[int]

class ForecastResult(BaseModel):
    forecasts: List[ForecastItem]
    total_predicted: int
    alpha: float
    formula: str
