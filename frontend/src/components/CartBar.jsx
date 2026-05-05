import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartBar.css'

function CartBar() {
  const navigate = useNavigate()
  const { getItemCount, getTotal } = useCart()
  
  const itemCount = getItemCount()
  const total = getTotal()

  if (itemCount === 0) return null

  const handleClick = () => {
    // In a full app, this would open a cart modal or page
    // For now, we'll simulate placing an order
    navigate('/student/token/new')
  }

  return (
    <div className="cart-bar">
      <div className="container cart-bar-content">
        <div className="cart-info">
          <span className="cart-count">{itemCount} item{itemCount > 1 ? 's' : ''}</span>
          <span className="cart-dot">·</span>
          <span className="cart-total">₹{total}</span>
        </div>
        <button className="btn btn-primary cart-btn" onClick={handleClick}>
          View Cart & Pay →
        </button>
      </div>
    </div>
  )
}

export default CartBar
