import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Login from './pages/Login'
import StudentMenu from './pages/StudentMenu'
import TokenConfirmation from './pages/TokenConfirmation'
import OrderHistory from './pages/OrderHistory'
import VotingPage from './pages/VotingPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import AdminMenu from './pages/AdminMenu'
import AdminForecast from './pages/AdminForecast'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/student/menu" element={
              <ProtectedRoute role="student">
                <StudentMenu />
              </ProtectedRoute>
            } />
            <Route path="/student/token/:orderId" element={
              <ProtectedRoute role="student">
                <TokenConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/student/orders" element={
              <ProtectedRoute role="student">
                <OrderHistory />
              </ProtectedRoute>
            } />
            <Route path="/student/vote" element={
              <ProtectedRoute role="student">
                <VotingPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute role="admin">
                <AdminOrders />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute role="admin">
                <AdminMenu />
              </ProtectedRoute>
            } />
            <Route path="/admin/forecast" element={
              <ProtectedRoute role="admin">
                <AdminForecast />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
