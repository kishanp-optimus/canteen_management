import { AdminNavbar } from '../components/Navbar'
import { menuItems, mockOrderHistory } from '../utils/mockData'
import { exponentialSmoothing } from '../utils/aiLogic'
import './AdminForecast.css'

function AdminForecast() {
  // Calculate forecasts for all items
  const forecasts = menuItems.map(item => {
    const itemHistory = mockOrderHistory
      .filter(order => order.itemId === item.id)
      .map(order => order.quantity)
    const result = exponentialSmoothing(itemHistory)
    return {
      ...item,
      forecast: result.forecast,
      history: itemHistory
    }
  }).sort((a, b) => b.forecast - a.forecast)

  const maxForecast = Math.max(...forecasts.map(f => f.forecast))
  const totalPredicted = forecasts.reduce((sum, f) => sum + f.forecast, 0)

  return (
    <div className="admin-forecast-page">
      <AdminNavbar />
      
      <main className="forecast-content">
        <div className="container">
          <div className="page-header">
            <div>
              <h1>Demand Forecast</h1>
              <p className="page-subtitle">AI-powered predictions for tomorrow</p>
            </div>
            <div className="ai-info">
              <span className="ai-badge">🤖 Exponential Smoothing</span>
              <span className="alpha-badge">α = 0.35</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="forecast-summary">
            <div className="summary-card card">
              <span className="summary-icon">📊</span>
              <div className="summary-content">
                <span className="summary-value">{totalPredicted}</span>
                <span className="summary-label">Total Predicted Orders</span>
              </div>
            </div>
            <div className="summary-card card">
              <span className="summary-icon">🏆</span>
              <div className="summary-content">
                <span className="summary-value">{forecasts[0]?.name}</span>
                <span className="summary-label">Top Predicted Item</span>
              </div>
            </div>
            <div className="summary-card card">
              <span className="summary-icon">📈</span>
              <div className="summary-content">
                <span className="summary-value">7 Days</span>
                <span className="summary-label">Historical Data Used</span>
              </div>
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="card formula-section">
            <h3>📐 Algorithm Explanation</h3>
            <div className="formula-content">
              <div className="formula-box">
                <code>F(t+1) = α × D(t) + (1−α) × F(t)</code>
              </div>
              <div className="formula-details">
                <p><strong>Where:</strong></p>
                <ul>
                  <li><code>F(t+1)</code> = Forecast for tomorrow</li>
                  <li><code>D(t)</code> = Actual demand today</li>
                  <li><code>F(t)</code> = Previous forecast</li>
                  <li><code>α = 0.35</code> = Smoothing factor (higher = more weight to recent data)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="card forecast-chart-section">
            <h3>Predicted Demand by Item</h3>
            <div className="forecast-chart">
              {forecasts.map((item, index) => (
                <div key={item.id} className="forecast-row">
                  <span className="forecast-rank">{index + 1}</span>
                  <span className="forecast-emoji">{item.emoji}</span>
                  <span className="forecast-name">{item.name}</span>
                  <div className="forecast-bar-container">
                    <div 
                      className="forecast-bar"
                      style={{ width: `${(item.forecast / maxForecast) * 100}%` }}
                    >
                      <span className="forecast-bar-value">{item.forecast}</span>
                    </div>
                  </div>
                  <span className="forecast-trend">
                    {item.forecast > item.history[item.history.length - 1] ? '📈' : '📉'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Data Table */}
          <div className="card history-section">
            <h3>Last 7 Days Order Data</h3>
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Day 1</th>
                    <th>Day 2</th>
                    <th>Day 3</th>
                    <th>Day 4</th>
                    <th>Day 5</th>
                    <th>Day 6</th>
                    <th>Day 7</th>
                    <th>Predicted</th>
                  </tr>
                </thead>
                <tbody>
                  {forecasts.slice(0, 6).map(item => (
                    <tr key={item.id}>
                      <td className="item-cell">
                        <span>{item.emoji}</span>
                        <span>{item.name}</span>
                      </td>
                      {item.history.map((qty, idx) => (
                        <td key={idx}>{qty}</td>
                      ))}
                      <td className="predicted-cell">{item.forecast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminForecast
