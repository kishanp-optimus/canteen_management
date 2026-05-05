import { useState } from 'react'
import { StudentNavbar } from '../components/Navbar'
import MenuCard from '../components/MenuCard'
import CartBar from '../components/CartBar'
import { useCart } from '../context/CartContext'
import { menuItems } from '../utils/mockData'
import { predictWaitTime } from '../utils/aiLogic'
import './StudentMenu.css'

function StudentMenu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { orderType, setOrderType } = useCart()

  // Mock pending orders for wait time calculation
  const pendingOrders = 12
  const waitTime = predictWaitTime(pendingOrders)

  const categories = [
    { id: 'all', label: 'All' },
    { id: "Today's Specials", label: "Today's Specials" },
    { id: 'Meals', label: 'Meals' },
    { id: 'Snacks & Beverages', label: 'Snacks & Beverages' }
  ]

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="student-menu-page">
      <StudentNavbar />
      
      <main className="menu-content">
        <div className="container">
          {/* Order Type Toggle */}
          <div className="order-type-section">
            <div className="toggle-group order-toggle">
              <button 
                className={`toggle-btn ${orderType === 'dine-in' ? 'active' : ''}`}
                onClick={() => setOrderType('dine-in')}
              >
                🍽️ Dine-In
              </button>
              <button 
                className={`toggle-btn ${orderType === 'takeaway' ? 'active' : ''}`}
                onClick={() => setOrderType('takeaway')}
              >
                📦 Takeaway
              </button>
            </div>
          </div>

          {/* Wait Time Info Bar */}
          <div className="info-bar">
            <span className="info-bar-icon">⏱️</span>
            <span>Estimated wait time: <strong>~{waitTime.minutes} min</strong></span>
            <span className="info-separator">|</span>
            <span><strong>{pendingOrders}</strong> orders ahead</span>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Sections */}
          {activeCategory === 'all' ? (
            Object.entries(groupedItems).map(([category, items]) => (
              <section key={category} className="menu-section">
                <h2 className="section-title">{category}</h2>
                <div className="menu-grid">
                  {items.map(item => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <section className="menu-section">
              <h2 className="section-title">{activeCategory}</h2>
              <div className="menu-grid">
                {filteredItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <CartBar />
    </div>
  )
}

export default StudentMenu
