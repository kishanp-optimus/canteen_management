from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, menu, orders, voting, forecast

app = FastAPI(
    title="ICAS API",
    description="Intelligent Canteen Automation System API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(voting.router, prefix="/api/voting", tags=["Voting"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["Forecast"])

@app.get("/")
async def root():
    return {"message": "Welcome to ICAS API", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
