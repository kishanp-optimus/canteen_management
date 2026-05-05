from pydantic import BaseModel
from typing import List

class VoteCreate(BaseModel):
    item_id: int
    order_id: str

class VoteItem(BaseModel):
    item_id: int
    name: str
    emoji: str
    votes: int
    percentage: float

class VotingResult(BaseModel):
    leaderboard: List[VoteItem]
    total_votes: int
    winner: VoteItem
