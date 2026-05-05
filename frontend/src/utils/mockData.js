// Mock Data for ICAS Application

export const menuItems = [
  {
    id: 1,
    name: 'Veg Thali',
    price: 60,
    emoji: '🍱',
    category: 'Meals',
    tags: ['chef'],
    description: 'Complete meal with roti, dal, sabzi, rice, and pickle',
    avgDailyOrders: 45
  },
  {
    id: 2,
    name: 'Paneer Bowl',
    price: 75,
    emoji: '🥘',
    category: 'Meals',
    tags: ['demand'],
    description: 'Creamy paneer curry with rice',
    avgDailyOrders: 35
  },
  {
    id: 3,
    name: 'Noodles',
    price: 50,
    emoji: '🍜',
    category: 'Snacks & Beverages',
    tags: ['popular'],
    description: 'Spicy hakka noodles with vegetables',
    avgDailyOrders: 40
  },
  {
    id: 4,
    name: 'Masala Chai',
    price: 15,
    emoji: '☕',
    category: 'Snacks & Beverages',
    tags: [],
    description: 'Hot masala chai',
    avgDailyOrders: 80
  },
  {
    id: 5,
    name: 'Veg Sandwich',
    price: 35,
    emoji: '🥪',
    category: 'Snacks & Beverages',
    tags: [],
    description: 'Grilled veg sandwich with chutney',
    avgDailyOrders: 30
  },
  {
    id: 6,
    name: 'Cold Coffee',
    price: 40,
    emoji: '🧋',
    category: 'Snacks & Beverages',
    tags: [],
    description: 'Chilled coffee with ice cream',
    avgDailyOrders: 25
  },
  {
    id: 7,
    name: 'Samosa',
    price: 15,
    emoji: '🥟',
    category: "Today's Specials",
    tags: ['chef'],
    description: 'Crispy samosa with chutney',
    avgDailyOrders: 60
  },
  {
    id: 8,
    name: 'Chole Bhature',
    price: 55,
    emoji: '🫓',
    category: "Today's Specials",
    tags: ['popular', 'demand'],
    description: 'Spicy chole with fluffy bhature',
    avgDailyOrders: 38
  }
]

// Mock order history for last 7 days (for AI forecasting)
export const mockOrderHistory = [
  // Day 1
  { itemId: 1, quantity: 42, date: '2026-04-28' },
  { itemId: 2, quantity: 30, date: '2026-04-28' },
  { itemId: 3, quantity: 38, date: '2026-04-28' },
  { itemId: 4, quantity: 75, date: '2026-04-28' },
  { itemId: 5, quantity: 28, date: '2026-04-28' },
  { itemId: 6, quantity: 22, date: '2026-04-28' },
  { itemId: 7, quantity: 55, date: '2026-04-28' },
  { itemId: 8, quantity: 35, date: '2026-04-28' },
  // Day 2
  { itemId: 1, quantity: 48, date: '2026-04-29' },
  { itemId: 2, quantity: 35, date: '2026-04-29' },
  { itemId: 3, quantity: 42, date: '2026-04-29' },
  { itemId: 4, quantity: 82, date: '2026-04-29' },
  { itemId: 5, quantity: 32, date: '2026-04-29' },
  { itemId: 6, quantity: 28, date: '2026-04-29' },
  { itemId: 7, quantity: 62, date: '2026-04-29' },
  { itemId: 8, quantity: 40, date: '2026-04-29' },
  // Day 3
  { itemId: 1, quantity: 44, date: '2026-04-30' },
  { itemId: 2, quantity: 33, date: '2026-04-30' },
  { itemId: 3, quantity: 36, date: '2026-04-30' },
  { itemId: 4, quantity: 78, date: '2026-04-30' },
  { itemId: 5, quantity: 26, date: '2026-04-30' },
  { itemId: 6, quantity: 20, date: '2026-04-30' },
  { itemId: 7, quantity: 58, date: '2026-04-30' },
  { itemId: 8, quantity: 36, date: '2026-04-30' },
  // Day 4
  { itemId: 1, quantity: 50, date: '2026-05-01' },
  { itemId: 2, quantity: 38, date: '2026-05-01' },
  { itemId: 3, quantity: 45, date: '2026-05-01' },
  { itemId: 4, quantity: 85, date: '2026-05-01' },
  { itemId: 5, quantity: 30, date: '2026-05-01' },
  { itemId: 6, quantity: 26, date: '2026-05-01' },
  { itemId: 7, quantity: 65, date: '2026-05-01' },
  { itemId: 8, quantity: 42, date: '2026-05-01' },
  // Day 5
  { itemId: 1, quantity: 46, date: '2026-05-02' },
  { itemId: 2, quantity: 36, date: '2026-05-02' },
  { itemId: 3, quantity: 40, date: '2026-05-02' },
  { itemId: 4, quantity: 80, date: '2026-05-02' },
  { itemId: 5, quantity: 28, date: '2026-05-02' },
  { itemId: 6, quantity: 24, date: '2026-05-02' },
  { itemId: 7, quantity: 60, date: '2026-05-02' },
  { itemId: 8, quantity: 38, date: '2026-05-02' },
  // Day 6
  { itemId: 1, quantity: 52, date: '2026-05-03' },
  { itemId: 2, quantity: 40, date: '2026-05-03' },
  { itemId: 3, quantity: 48, date: '2026-05-03' },
  { itemId: 4, quantity: 88, date: '2026-05-03' },
  { itemId: 5, quantity: 34, date: '2026-05-03' },
  { itemId: 6, quantity: 30, date: '2026-05-03' },
  { itemId: 7, quantity: 68, date: '2026-05-03' },
  { itemId: 8, quantity: 45, date: '2026-05-03' },
  // Day 7 (today)
  { itemId: 1, quantity: 47, date: '2026-05-04' },
  { itemId: 2, quantity: 37, date: '2026-05-04' },
  { itemId: 3, quantity: 43, date: '2026-05-04' },
  { itemId: 4, quantity: 83, date: '2026-05-04' },
  { itemId: 5, quantity: 31, date: '2026-05-04' },
  { itemId: 6, quantity: 27, date: '2026-05-04' },
  { itemId: 7, quantity: 63, date: '2026-05-04' },
  { itemId: 8, quantity: 41, date: '2026-05-04' }
]

// Mock live orders for admin dashboard
export const mockLiveOrders = [
  { id: 'ORD001', token: 35, items: ['Veg Thali', 'Masala Chai'], status: 'ready', time: '12:45 PM' },
  { id: 'ORD002', token: 36, items: ['Paneer Bowl'], status: 'preparing', time: '12:47 PM' },
  { id: 'ORD003', token: 37, items: ['Noodles', 'Cold Coffee'], status: 'preparing', time: '12:48 PM' },
  { id: 'ORD004', token: 38, items: ['Chole Bhature', 'Masala Chai'], status: 'confirmed', time: '12:50 PM' },
  { id: 'ORD005', token: 39, items: ['Samosa', 'Veg Sandwich'], status: 'confirmed', time: '12:52 PM' },
  { id: 'ORD006', token: 40, items: ['Veg Thali'], status: 'confirmed', time: '12:53 PM' },
  { id: 'ORD007', token: 41, items: ['Paneer Bowl', 'Cold Coffee'], status: 'confirmed', time: '12:55 PM' },
  { id: 'ORD008', token: 42, items: ['Noodles'], status: 'confirmed', time: '12:56 PM' }
]

// Mock voting data
export const mockVotingData = [
  { itemId: 1, name: 'Veg Thali', votes: 78, emoji: '🍱' },
  { itemId: 8, name: 'Chole Bhature', votes: 65, emoji: '🫓' },
  { itemId: 2, name: 'Paneer Bowl', votes: 52, emoji: '🥘' },
  { itemId: 7, name: 'Samosa', votes: 48, emoji: '🥟' },
  { itemId: 3, name: 'Noodles', votes: 35, emoji: '🍜' }
]

// Admin dashboard metrics
export const mockDashboardMetrics = {
  totalOrders: 156,
  revenue: 8450,
  pendingOrders: 12,
  wastage: 2.3
}
