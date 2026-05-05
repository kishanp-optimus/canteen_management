import { useCart } from '../context/CartContext'
import './MenuCard.css'

function MenuCard({ item }) {
  const { addToCart, cartItems, updateQuantity } = useCart()
  
  const cartItem = cartItems.find(i => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  const getTagClass = (tag) => {
    switch (tag) {
      case 'chef': return 'tag-chef'
      case 'popular': return 'tag-popular'
      case 'demand': return 'tag-demand'
      default: return ''
    }
  }

  const getTagLabel = (tag) => {
    switch (tag) {
      case 'chef': return "Chef's Pick"
      case 'popular': return 'Popular'
      case 'demand': return 'High Demand'
      default: return tag
    }
  }

  return (
    <div className="menu-card">
      <div className="menu-card-image">
        <span className="dish-emoji">{item.emoji}</span>
      </div>
      
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="dish-name">{item.name}</h3>
          <span className="dish-price">₹{item.price}</span>
        </div>
        
        <p className="dish-description">{item.description}</p>
        
        <div className="menu-card-tags">
          {item.tags.map(tag => (
            <span key={tag} className={`tag ${getTagClass(tag)}`}>
              {getTagLabel(tag)}
            </span>
          ))}
        </div>
        
        <div className="menu-card-actions">
          {quantity === 0 ? (
            <button 
              className="btn btn-primary add-btn"
              onClick={() => addToCart(item)}
            >
              Add +
            </button>
          ) : (
            <div className="quantity-controls">
              <button 
                className="qty-btn"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuCard
