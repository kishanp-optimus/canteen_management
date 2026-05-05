from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from datetime import datetime

class OrderType(str, Enum):
    DINE_IN = "dine-in"
    TAKEAWAY = "takeaway"

class OrderStatus(str, Enum):
    ORDERED = "ordered"
    PAYMENT = "payment"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    COLLECTED = "collected"

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    order_type: OrderType

class OrderItem(BaseModel):
    item_id: int
    name: str
    price: int
    quantity: int

class Order(BaseModel):
    id: str
    token: int
    user_id: str
    items: List[OrderItem]
    total: int
    status: OrderStatus
    order_type: OrderType
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: OrderStatus

class QueueInfo(BaseModel):
    currently_serving: int
    orders_ahead: int
    estimated_wait: int
    formula: str
