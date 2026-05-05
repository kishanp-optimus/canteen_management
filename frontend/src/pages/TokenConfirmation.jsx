import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentNavbar } from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { getQueueInfo } from '../utils/aiLogic'
import './TokenConfirmation.css'

function TokenConfirmation() {
  const navigate = useNavigate()
  const { cartItems, getTotal, orderType, clearCart } = useCart()
  const [orderStatus, setOrderStatus] = useState('ordered') // ordered, payment, preparing, ready, collected
  const [tokenNumber, setTokenNumber] = useState(47)
  
  // Simulated queue info
  const currentlyServing = 35
  const queueInfo = getQueueInfo(currentlyServing, tokenNumber)

  const progressSteps = [
    { id: 'ordered', label: 'Ordered', icon: '📝' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { id: 'ready', label: 'Ready', icon: '✅' },
    { id: 'collected', label: 'Collected', icon: '🎉' }
  ]

  const getStepStatus = (stepId) => {
    const stepIndex = progressSteps.findIndex(s => s.id === stepId)
    const currentIndex = progressSteps.findIndex(s => s.id === orderStatus)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'active'
    return 'pending'
  }

  const getProgressWidth = () => {
    const currentIndex = progressSteps.findIndex(s => s.id === orderStatus)
    return `${(currentIndex / (progressSteps.length - 1)) * 100}%`
  }

  // Simulate status progression (demo purposes)
  useEffect(() => {
    if (cartItems.length === 0) {
      // Demo mode - show sample data
      return
    }

    const statusSequence = ['ordered', 'payment', 'preparing', 'ready']
    let currentIdx = 0

    const interval = setInterval(() => {
      if (currentIdx < statusSequence.length - 1) {
        currentIdx++
        setOrderStatus(statusSequence[currentIdx])
      } else {
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Demo order items if cart is empty
  const orderItems = cartItems.length > 0 ? cartItems : [
    { id: 1, name: 'Veg Thali', price: 60, quantity: 1 },
    { id: 4, name: 'Masala Chai', price: 15, quantity: 2 }
  ]

  const total = cartItems.length > 0 ? getTotal() : orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="token-page">
      <StudentNavbar />
      
      <main className="token-content">
        <div className="container">
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-line">
              <div className="progress-line-fill" style={{ width: getProgressWidth() }}></div>
            </div>
            {progressSteps.map((step) => (
              <div key={step.id} className={`progress-step ${getStepStatus(step.id)}`}>
                <div className="progress-circle">
                  {getStepStatus(step.id) === 'completed' ? '✓' : step.icon}
                </div>
                <span className="progress-label">{step.label}</span>
              </div>
            ))}
          </div>

          <div className="token-grid">
            {/* Token Card */}
            <div className="card token-card">
              <div className="token-header">
                <span className="token-label">Your Token</span>
                <span className={`badge badge-${orderType === 'dine-in' ? 'confirmed' : 'preparing'}`}>
                  {orderType === 'dine-in' ? '🍽️ Dine-In' : '📦 Takeaway'}
                </span>
              </div>
              <div className="token-number">
                Token {tokenNumber}
              </div>
              <div className="token-status">
                Status: <span className={`status-text status-${orderStatus}`}>
                  {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card order-summary">
              <h3>Order Summary</h3>
              <div className="order-items">
                {orderItems.map(item => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.name} × {item.quantity}</span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total</span>
                <span className="total-amount">₹{total}</span>
              </div>
            </div>

            {/* Queue Prediction Panel */}
            <div className="card queue-panel">
              <h3>🔮 Queue Prediction</h3>
              <div className="queue-info">
                <div className="queue-item">
                  <span className="queue-label">Now Serving</span>
                  <span className="queue-value serving">Token {queueInfo.currentlyServing}</span>
                </div>
                <div className="queue-item">
                  <span className="queue-label">Orders Ahead</span>
                  <span className="queue-value">{queueInfo.ordersAhead}</span>
                </div>
                <div className="queue-item highlight">
                  <span className="queue-label">Estimated Wait</span>
                  <span className="queue-value time">~{queueInfo.estimatedWait} min</span>
                </div>
              </div>
              <div className="formula-box">
                <span className="formula-label">AI Formula:</span>
                <code>{queueInfo.formula}</code>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-outline" onClick={() => navigate('/student/menu')}>
              Order More
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/student/orders')}>
              View All Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TokenConfirmation
