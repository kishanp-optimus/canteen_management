from fastapi import APIRouter, HTTPException
from app.schemas.voting import VoteCreate, VoteItem, VotingResult
from typing import List

router = APIRouter()

# Mock voting data
votes_db = {
    1: {"name": "Veg Thali", "emoji": "🍱", "votes": 78},
    8: {"name": "Chole Bhature", "emoji": "🫓", "votes": 65},
    2: {"name": "Paneer Bowl", "emoji": "🥘", "votes": 52},
    7: {"name": "Samosa", "emoji": "🥟", "votes": 48},
    3: {"name": "Noodles", "emoji": "🍜", "votes": 35}
}

voted_orders = set()

@router.get("/", response_model=VotingResult)
async def get_voting_results():
    """Get current voting leaderboard"""
    total_votes = sum(item["votes"] for item in votes_db.values())
    
    leaderboard = []
    for item_id, data in sorted(votes_db.items(), key=lambda x: x[1]["votes"], reverse=True):
        percentage = (data["votes"] / total_votes * 100) if total_votes > 0 else 0
        leaderboard.append(VoteItem(
            item_id=item_id,
            name=data["name"],
            emoji=data["emoji"],
            votes=data["votes"],
            percentage=round(percentage, 1)
        ))
    
    winner = leaderboard[0] if leaderboard else None
    
    return VotingResult(
        leaderboard=leaderboard,
        total_votes=total_votes,
        winner=winner
    )

@router.post("/vote")
async def cast_vote(vote: VoteCreate):
    """Cast a vote for best dish of the day"""
    if vote.order_id in voted_orders:
        raise HTTPException(status_code=400, detail="Already voted for this order")
    
    if vote.item_id not in votes_db:
        # Add new item to votes
        votes_db[vote.item_id] = {"name": f"Item {vote.item_id}", "emoji": "🍽️", "votes": 0}
    
    votes_db[vote.item_id]["votes"] += 1
    voted_orders.add(vote.order_id)
    
    return {"message": "Vote recorded successfully", "item_id": vote.item_id}

@router.get("/winner")
async def get_winner():
    """Get the current winner"""
    if not votes_db:
        return {"winner": None}
    
    winner_id = max(votes_db.keys(), key=lambda x: votes_db[x]["votes"])
    winner_data = votes_db[winner_id]
    total_votes = sum(item["votes"] for item in votes_db.values())
    percentage = (winner_data["votes"] / total_votes * 100) if total_votes > 0 else 0
    
    return {
        "winner": {
            "item_id": winner_id,
            "name": winner_data["name"],
            "emoji": winner_data["emoji"],
            "votes": winner_data["votes"],
            "percentage": round(percentage, 1)
        }
    }
