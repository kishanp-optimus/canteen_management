import { useState } from 'react'
import { StudentNavbar } from '../components/Navbar'
import './OrderHistory.css'

function OrderHistory() {
  const [filter, setFilter] = useState('all')

  // Mock order history
  const orders = [
    {
      id: 'ORD047',
      token: 47,
      date: '2026-05-05',
      time: '12:30 PM',
      items: ['Veg Thali', 'Masala Chai × 2'],
      total: 90,
      status: 'preparing',
      orderType: 'dine-in'
    },
    {
      id: 'ORD045',
      token: 45,
      date: '2026-05-04',
      time: '1:15 PM',
      items: ['Paneer Bowl', 'Cold Coffee'],
      total: 115,
      status: 'collected',
      orderType: 'takeaway'
    },
    {
      id: 'ORD042',
      token: 42,
      date: '2026-05-03',
      time: '12:45 PM',
      items: ['Chole Bhature', 'Masala Chai'],
      total: 70,
      status: 'collected',
      orderType: 'dine-in'
    },
    {
      id: 'ORD038',
      token: 38,
      date: '2026-05-02',
      time: '1:00 PM',
      items: ['Noodles', 'Veg Sandwich'],
      total: 85,
      status: 'collected',
      orderType: 'takeaway'
    }
  ]

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  const getStatusBadge = (status) => {
    const badges = {
      preparing: { class: 'badge-preparing', label: 'Preparing' },
      ready: { class: 'badge-ready', label: 'Ready' },
      collected: { class: 'badge-collected', label: 'Collected' }
    }
    return badges[status] || { class: '', label: status }
  }

  return (
    <div className="order-history-page">
      <StudentNavbar />
      
      <main className="history-content">
        <div className="container">
          <div className="page-header">
            <h1>Order History</h1>
            <div className="filter-tabs">
              {['all', 'preparing', 'ready', 'collected'].map(f => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">{order.id}</span>
                    <span className="order-token">Token #{order.token}</span>
                  </div>
                  <div className="order-meta">
                    <span className={`badge ${getStatusBadge(order.status).class}`}>
                      {getStatusBadge(order.status).label}
                    </span>
                    <span className={`order-type ${order.orderType}`}>
                      {order.orderType === 'dine-in' ? '🍽️' : '📦'}
                    </span>
                  </div>
                </div>
                
                <div className="order-body">
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="order-item-tag">{item}</span>
                    ))}
                  </div>
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-value">₹{order.total}</span>
                  </div>
                </div>
                
                <div className="order-footer">
                  <span className="order-date">{order.date} at {order.time}</span>
                  {order.status !== 'collected' && (
                    <button className="btn btn-outline btn-sm">Track Order</button>
                  )}
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">📋</span>
                <p>No orders found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrderHistory
