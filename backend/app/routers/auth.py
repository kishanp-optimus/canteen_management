from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserLogin, Token, User, UserRole
from datetime import datetime
import uuid

router = APIRouter()

# Mock user database
users_db = {}

def generate_token():
    return f"mock-jwt-{uuid.uuid4().hex[:16]}"

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    """Register a new user"""
    if user_data.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user_id = f"{'STU' if user_data.role == UserRole.STUDENT else 'ADM'}{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    user = User(
        id=user_id,
        email=user_data.email,
        name=user_data.name,
        role=user_data.role
    )
    
    users_db[user_data.email] = {
        "user": user,
        "password": user_data.password  # In production, hash this!
    }
    
    return Token(
        access_token=generate_token(),
        token_type="bearer",
        user=user
    )

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user"""
    # For demo purposes, allow any login
    user_id = f"{'STU' if credentials.role == UserRole.STUDENT else 'ADM'}001"
    
    user = User(
        id=user_id,
        email=credentials.email,
        name=credentials.email.split('@')[0],
        role=credentials.role
    )
    
    return Token(
        access_token=generate_token(),
        token_type="bearer",
        user=user
    )

@router.get("/me", response_model=User)
async def get_current_user():
    """Get current user (mock)"""
    return User(
        id="STU001",
        email="student@dgi.edu.in",
        name="Student",
        role=UserRole.STUDENT
    )
