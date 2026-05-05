import { useState } from 'react'
import { AdminNavbar } from '../components/Navbar'
import { menuItems as initialMenuItems } from '../utils/mockData'
import './AdminMenu.css'

function AdminMenu() {
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [editingItem, setEditingItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const categories = ["Today's Specials", 'Meals', 'Snacks & Beverages']

  const handleToggleAvailability = (itemId) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, available: item.available === false ? true : false }
          : item
      )
    )
  }

  const handleUpdatePrice = (itemId, newPrice) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, price: parseInt(newPrice) }
          : item
      )
    )
    setEditingItem(null)
  }

  return (
    <div className="admin-menu-page">
      <AdminNavbar />
      
      <main className="menu-content">
        <div className="container">
          <div className="page-header">
            <h1>Menu Management</h1>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              + Add Item
            </button>
          </div>

          {categories.map(category => (
            <section key={category} className="menu-category">
              <h2 className="category-title">{category}</h2>
              <div className="menu-items-grid">
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className={`menu-item-card card ${item.available === false ? 'unavailable' : ''}`}>
                    <div className="item-header">
                      <span className="item-emoji">{item.emoji}</span>
                      <div className="item-availability">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={item.available !== false}
                            onChange={() => handleToggleAvailability(item.id)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      
                      <div className="item-tags">
                        {item.tags.map(tag => (
                          <span key={tag} className={`tag tag-${tag}`}>
                            {tag === 'chef' ? "Chef's Pick" : tag === 'demand' ? 'High Demand' : 'Popular'}
                          </span>
                        ))}
                      </div>
                      
                      <div className="item-price-row">
                        {editingItem === item.id ? (
                          <input
                            type="number"
                            defaultValue={item.price}
                            className="price-input"
                            onBlur={(e) => handleUpdatePrice(item.id, e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleUpdatePrice(item.id, e.target.value)}
                            autoFocus
                          />
                        ) : (
                          <span 
                            className="item-price" 
                            onClick={() => setEditingItem(item.id)}
                            title="Click to edit"
                          >
                            ₹{item.price}
                          </span>
                        )}
                        <span className="daily-orders">
                          ~{item.avgDailyOrders}/day
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Add Item Modal (simplified) */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <h2>Add New Menu Item</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input type="text" className="form-input" placeholder="e.g., Veg Biryani" />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input type="number" className="form-input" placeholder="e.g., 80" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows="3" placeholder="Brief description..."></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMenu
