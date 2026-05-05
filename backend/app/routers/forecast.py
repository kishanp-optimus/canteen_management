from fastapi import APIRouter
from app.schemas.forecast import ForecastItem, ForecastResult
from typing import List

router = APIRouter()

# Mock historical data for last 7 days
historical_data = {
    1: {"name": "Veg Thali", "emoji": "🍱", "history": [42, 48, 44, 50, 46, 52, 47]},
    2: {"name": "Paneer Bowl", "emoji": "🥘", "history": [30, 35, 33, 38, 36, 40, 37]},
    3: {"name": "Noodles", "emoji": "🍜", "history": [38, 42, 36, 45, 40, 48, 43]},
    4: {"name": "Masala Chai", "emoji": "☕", "history": [75, 82, 78, 85, 80, 88, 83]},
    5: {"name": "Veg Sandwich", "emoji": "🥪", "history": [28, 32, 26, 30, 28, 34, 31]},
    6: {"name": "Cold Coffee", "emoji": "🧋", "history": [22, 28, 20, 26, 24, 30, 27]},
    7: {"name": "Samosa", "emoji": "🥟", "history": [55, 62, 58, 65, 60, 68, 63]},
    8: {"name": "Chole Bhature", "emoji": "🫓", "history": [35, 40, 36, 42, 38, 45, 41]}
}

def exponential_smoothing(data: List[int], alpha: float = 0.35) -> int:
    """
    Apply exponential smoothing to predict next value
    F(t+1) = α × D(t) + (1−α) × F(t)
    """
    if not data:
        return 0
    
    forecast = data[0]
    for i in range(1, len(data)):
        forecast = alpha * data[i] + (1 - alpha) * forecast
    
    # Predict next period
    next_forecast = alpha * data[-1] + (1 - alpha) * forecast
    return round(next_forecast)

@router.get("/", response_model=ForecastResult)
async def get_forecast(alpha: float = 0.35):
    """Get demand forecast for all items"""
    forecasts = []
    
    for item_id, data in historical_data.items():
        predicted = exponential_smoothing(data["history"], alpha)
        forecasts.append(ForecastItem(
            item_id=item_id,
            name=data["name"],
            emoji=data["emoji"],
            forecast=predicted,
            history=data["history"]
        ))
    
    # Sort by forecast (descending)
    forecasts.sort(key=lambda x: x.forecast, reverse=True)
    
    total_predicted = sum(f.forecast for f in forecasts)
    
    return ForecastResult(
        forecasts=forecasts,
        total_predicted=total_predicted,
        alpha=alpha,
        formula="F(t+1) = α × D(t) + (1−α) × F(t)"
    )

@router.get("/{item_id}")
async def get_item_forecast(item_id: int, alpha: float = 0.35):
    """Get forecast for a specific item"""
    if item_id not in historical_data:
        return {"error": "Item not found"}
    
    data = historical_data[item_id]
    predicted = exponential_smoothing(data["history"], alpha)
    
    return {
        "item_id": item_id,
        "name": data["name"],
        "emoji": data["emoji"],
        "forecast": predicted,
        "history": data["history"],
        "alpha": alpha,
        "formula": f"F(t+1) = {alpha} × D(t) + {1-alpha:.2f} × F(t)"
    }

@router.get("/algorithm/explain")
async def explain_algorithm():
    """Explain the forecasting algorithm"""
    return {
        "algorithm": "Exponential Smoothing",
        "formula": "F(t+1) = α × D(t) + (1−α) × F(t)",
        "parameters": {
            "alpha": {
                "default": 0.35,
                "description": "Smoothing factor (0-1). Higher values give more weight to recent observations."
            },
            "F(t+1)": "Forecast for next period",
            "D(t)": "Actual demand in current period",
            "F(t)": "Forecast for current period"
        },
        "data_used": "Last 7 days of order history",
        "benefits": [
            "Simple to implement and understand",
            "Adapts to changing trends",
            "Requires minimal historical data",
            "Good for short-term forecasting"
        ]
    }
