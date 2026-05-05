import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function StudentNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/student/menu', label: 'Menu' },
    { path: '/student/orders', label: 'Orders' },
    { path: '/student/vote', label: 'Vote' }
  ]

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">🍽️</span>
          <span className="brand-text">ICAS</span>
        </div>
        
        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="user-info">
          <span className="username">{user?.name}</span>
          <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

function AdminNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/orders', label: 'Orders' },
    { path: '/admin/menu', label: 'Menu' },
    { path: '/admin/forecast', label: 'Forecast' }
  ]

  return (
    <nav className="navbar admin-navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">🍽️</span>
          <span className="brand-text">ICAS Admin</span>
        </div>
        
        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="user-info">
          <span className="username">{user?.name}</span>
          <div className="user-avatar admin">{user?.name?.charAt(0).toUpperCase()}</div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export { StudentNavbar, AdminNavbar }
