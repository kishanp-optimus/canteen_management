import { useState } from 'react'
import { StudentNavbar } from '../components/Navbar'
import { mockVotingData } from '../utils/mockData'
import './VotingPage.css'

function VotingPage() {
  const [selectedDish, setSelectedDish] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [votingData, setVotingData] = useState(mockVotingData)

  // Items from current order (mock)
  const orderItems = [
    { id: 1, name: 'Veg Thali', emoji: '🍱' },
    { id: 4, name: 'Masala Chai', emoji: '☕' }
  ]

  const totalVotes = votingData.reduce((sum, item) => sum + item.votes, 0)
  const winner = votingData[0]

  const handleVote = () => {
    if (!selectedDish) return
    
    setVotingData(prev => 
      prev.map(item => 
        item.itemId === selectedDish 
          ? { ...item, votes: item.votes + 1 }
          : item
      ).sort((a, b) => b.votes - a.votes)
    )
    setHasVoted(true)
  }

  const getPercentage = (votes) => {
    return ((votes / totalVotes) * 100).toFixed(1)
  }

  return (
    <div className="voting-page">
      <StudentNavbar />
      
      <main className="voting-content">
        <div className="container">
          {/* Winner Banner */}
          <div className="winner-banner">
            <h3>🏆 Best Dish of the Day: {winner.name}</h3>
            <p>Winning with {getPercentage(winner.votes)}% votes!</p>
          </div>

          <div className="voting-grid">
            {/* Voting Section */}
            <div className="card voting-section">
              <div className="section-header">
                <h2>Best Dish of the Day 🏆</h2>
                <p className="section-subtitle">Vote from items in your order · One vote per order</p>
              </div>

              {!hasVoted ? (
                <>
                  <div className="vote-options">
                    {orderItems.map(item => (
                      <div 
                        key={item.id}
                        className={`vote-card ${selectedDish === item.id ? 'selected' : ''}`}
                        onClick={() => setSelectedDish(item.id)}
                      >
                        <span className="vote-emoji">{item.emoji}</span>
                        <span className="vote-name">{item.name}</span>
                        {selectedDish === item.id && (
                          <span className="check-mark">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="btn btn-primary vote-btn"
                    onClick={handleVote}
                    disabled={!selectedDish}
                  >
                    Submit Vote
                  </button>
                </>
              ) : (
                <div className="vote-success">
                  <span className="success-icon">✅</span>
                  <h3>Thanks for voting!</h3>
                  <p>Your vote for {orderItems.find(i => i.id === selectedDish)?.name} has been recorded.</p>
                </div>
              )}
            </div>

            {/* Leaderboard */}
            <div className="card leaderboard-section">
              <h3>Live Leaderboard 📊</h3>
              
              <div className="leaderboard">
                {votingData.map((item, index) => (
                  <div key={item.itemId} className="leaderboard-item">
                    <span className="leaderboard-rank">{index + 1}</span>
                    <span className="leaderboard-emoji">{item.emoji}</span>
                    <span className="leaderboard-name">{item.name}</span>
                    <div className="leaderboard-bar">
                      <div 
                        className="leaderboard-bar-fill"
                        style={{ width: `${getPercentage(item.votes)}%` }}
                      ></div>
                    </div>
                    <span className="leaderboard-percent">{getPercentage(item.votes)}%</span>
                  </div>
                ))}
              </div>

              <div className="total-votes">
                Total votes: <strong>{totalVotes}</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VotingPage
