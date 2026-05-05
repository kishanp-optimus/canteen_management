from fastapi import APIRouter, HTTPException, status
from app.schemas.order import Order, OrderCreate, OrderItem, OrderStatus, OrderType, OrderStatusUpdate, QueueInfo
from typing import List
from datetime import datetime
import random

router = APIRouter()

# Mock orders database
orders_db = []
current_token = 35
next_token = 47

# Mock menu for price lookup
menu_prices = {
    1: ("Veg Thali", 60),
    2: ("Paneer Bowl", 75),
    3: ("Noodles", 50),
    4: ("Masala Chai", 15),
    5: ("Veg Sandwich", 35),
    6: ("Cold Coffee", 40),
    7: ("Samosa", 15),
    8: ("Chole Bhature", 55)
}

# Initialize some mock orders
mock_orders = [
    Order(
        id="ORD001", token=35, user_id="STU001",
        items=[OrderItem(item_id=1, name="Veg Thali", price=60, quantity=1),
               OrderItem(item_id=4, name="Masala Chai", price=15, quantity=1)],
        total=75, status=OrderStatus.READY, order_type=OrderType.DINE_IN,
        created_at=datetime.now()
    ),
    Order(
        id="ORD002", token=36, user_id="STU002",
        items=[OrderItem(item_id=2, name="Paneer Bowl", price=75, quantity=1)],
        total=75, status=OrderStatus.PREPARING, order_type=OrderType.TAKEAWAY,
        created_at=datetime.now()
    ),
    Order(
        id="ORD003", token=37, user_id="STU003",
        items=[OrderItem(item_id=3, name="Noodles", price=50, quantity=1),
               OrderItem(item_id=6, name="Cold Coffee", price=40, quantity=1)],
        total=90, status=OrderStatus.PREPARING, order_type=OrderType.DINE_IN,
        created_at=datetime.now()
    ),
    Order(
        id="ORD004", token=38, user_id="STU004",
        items=[OrderItem(item_id=8, name="Chole Bhature", price=55, quantity=1),
               OrderItem(item_id=4, name="Masala Chai", price=15, quantity=1)],
        total=70, status=OrderStatus.CONFIRMED, order_type=OrderType.DINE_IN,
        created_at=datetime.now()
    )
]
orders_db.extend(mock_orders)

@router.get("/", response_model=List[Order])
async def get_orders(user_id: str = None, status: OrderStatus = None):
    """Get orders, optionally filtered by user or status"""
    result = orders_db
    if user_id:
        result = [o for o in result if o.user_id == user_id]
    if status:
        result = [o for o in result if o.status == status]
    return result

@router.get("/live", response_model=List[Order])
async def get_live_orders():
    """Get all active orders for admin dashboard"""
    active_statuses = [OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY]
    return [o for o in orders_db if o.status in active_statuses]

@router.post("/", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(order_data: OrderCreate):
    """Create a new order"""
    global next_token
    
    order_items = []
    total = 0
    
    for item in order_data.items:
        if item.item_id not in menu_prices:
            raise HTTPException(status_code=400, detail=f"Invalid item ID: {item.item_id}")
        
        name, price = menu_prices[item.item_id]
        order_items.append(OrderItem(
            item_id=item.item_id,
            name=name,
            price=price,
            quantity=item.quantity
        ))
        total += price * item.quantity
    
    order = Order(
        id=f"ORD{len(orders_db) + 1:03d}",
        token=next_token,
        user_id="STU001",  # Would come from auth in production
        items=order_items,
        total=total,
        status=OrderStatus.CONFIRMED,
        order_type=order_data.order_type,
        created_at=datetime.now()
    )
    
    orders_db.append(order)
    next_token += 1
    
    return order

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get a specific order"""
    for order in orders_db:
        if order.id == order_id:
            return order
    raise HTTPException(status_code=404, detail="Order not found")

@router.patch("/{order_id}/status", response_model=Order)
async def update_order_status(order_id: str, status_update: OrderStatusUpdate):
    """Update order status (admin only)"""
    global current_token
    
    for i, order in enumerate(orders_db):
        if order.id == order_id:
            updated_order = order.model_copy(update={"status": status_update.status})
            orders_db[i] = updated_order
            
            # Update current serving token if order is ready
            if status_update.status == OrderStatus.READY:
                current_token = max(current_token, order.token)
            
            return updated_order
    raise HTTPException(status_code=404, detail="Order not found")

@router.get("/queue/info", response_model=QueueInfo)
async def get_queue_info(token: int):
    """Get queue prediction info for a specific token"""
    orders_ahead = max(0, token - current_token - 1)
    avg_prep_time = 40  # seconds
    buffer = 30  # seconds
    
    wait_time_seconds = (orders_ahead * avg_prep_time) + buffer
    wait_time_minutes = (wait_time_seconds + 59) // 60  # Round up
    
    return QueueInfo(
        currently_serving=current_token,
        orders_ahead=orders_ahead,
        estimated_wait=wait_time_minutes,
        formula=f"T = N×t + buffer = {orders_ahead}×{avg_prep_time}s + {buffer}s"
    )

@router.get("/metrics/dashboard")
async def get_dashboard_metrics():
    """Get dashboard metrics for admin"""
    total_orders = len(orders_db)
    revenue = sum(o.total for o in orders_db)
    pending = len([o for o in orders_db if o.status in [OrderStatus.CONFIRMED, OrderStatus.PREPARING]])
    
    return {
        "total_orders": total_orders,
        "revenue": revenue,
        "pending_orders": pending,
        "wastage": round(random.uniform(1.5, 3.5), 1)
    }
