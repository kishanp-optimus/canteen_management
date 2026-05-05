import { useState } from 'react'
import { AdminNavbar } from '../components/Navbar'
import { mockLiveOrders } from '../utils/mockData'
import './AdminOrders.css'

function AdminOrders() {
  const [orders, setOrders] = useState(mockLiveOrders)
  const [filter, setFilter] = useState('all')

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  const statusOptions = ['confirmed', 'preparing', 'ready', 'collected']

  return (
    <div className="admin-orders-page">
      <AdminNavbar />
      
      <main className="orders-content">
        <div className="container">
          <div className="page-header">
            <h1>Order Management</h1>
            <div className="filter-tabs">
              {['all', 'confirmed', 'preparing', 'ready'].map(f => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f !== 'all' && (
                    <span className="count">
                      {orders.filter(o => o.status === f).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="orders-table-container card">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="token-cell">
                      <span className="token-badge">{order.token}</span>
                    </td>
                    <td>{order.id}</td>
                    <td className="items-cell">{order.items.join(', ')}</td>
                    <td>{order.time}</td>
                    <td>
                      <span className={`badge badge-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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

export default AdminOrders
