import { useState } from 'react'
import { AdminNavbar } from '../components/Navbar'
import { mockDashboardMetrics, mockLiveOrders, menuItems, mockOrderHistory } from '../utils/mockData'
import { exponentialSmoothing } from '../utils/aiLogic'
import './AdminDashboard.css'

function AdminDashboard() {
  const [liveOrders, setLiveOrders] = useState(mockLiveOrders)
  const metrics = mockDashboardMetrics

  // Calculate demand forecasts
  const forecasts = menuItems.map(item => {
    const itemHistory = mockOrderHistory
      .filter(order => order.itemId === item.id)
      .map(order => order.quantity)
    const result = exponentialSmoothing(itemHistory)
    return {
      ...item,
      forecast: result.forecast
    }
  }).sort((a, b) => b.forecast - a.forecast).slice(0, 6)

  const maxForecast = Math.max(...forecasts.map(f => f.forecast))

  const updateOrderStatus = (orderId, newStatus) => {
    setLiveOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  const getNextStatus = (currentStatus) => {
    const flow = { confirmed: 'preparing', preparing: 'ready', ready: 'collected' }
    return flow[currentStatus] || currentStatus
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <main className="dashboard-content">
        <div className="container">
          {/* Metrics Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon" style={{ background: '#e3f2fd' }}>📦</div>
              <div className="metric-value">{metrics.totalOrders}</div>
              <div className="metric-label">Total Orders</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon" style={{ background: '#e8f5e9' }}>💰</div>
              <div className="metric-value">₹{metrics.revenue.toLocaleString()}</div>
              <div className="metric-label">Revenue</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon" style={{ background: '#fff3e0' }}>⏳</div>
              <div className="metric-value">{metrics.pendingOrders}</div>
              <div className="metric-label">Pending Orders</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon" style={{ background: '#ffebee' }}>🗑️</div>
              <div className="metric-value">{metrics.wastage} kg</div>
              <div className="metric-label">Wastage</div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Live Orders Panel */}
            <div className="card live-orders-panel">
              <h3>Live Orders 🔴</h3>
              <div className="orders-list">
                {liveOrders.map(order => (
                  <div key={order.id} className="live-order-item">
                    <div className="order-header">
                      <span className="order-token">Token {order.token}</span>
                      <span className="order-time">{order.time}</span>
                    </div>
                    <div className="order-items">
                      {order.items.join(', ')}
                    </div>
                    <div className="order-actions">
                      <span 
                        className={`badge badge-${order.status} clickable`}
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        title="Click to update status"
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demand Forecast Panel */}
            <div className="card forecast-panel">
              <div className="forecast-header">
                <h3>Demand Forecast (Tomorrow) 📊</h3>
                <span className="ai-badge">AI · α=0.35</span>
              </div>
              <div className="bar-chart">
                {forecasts.map(item => (
                  <div key={item.id} className="bar-item">
                    <span className="bar-emoji">{item.emoji}</span>
                    <span className="bar-label">{item.name}</span>
                    <div className="bar-container">
                      <div 
                        className="bar-fill"
                        style={{ width: `${(item.forecast / maxForecast) * 100}%` }}
                      ></div>
                    </div>
                    <span className="bar-value">{item.forecast}</span>
                  </div>
                ))}
              </div>
              <p className="forecast-note">
                * Predictions based on exponential smoothing of last 7 days
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
