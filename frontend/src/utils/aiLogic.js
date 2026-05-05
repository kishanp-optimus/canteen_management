// AI Logic for Queue Prediction and Demand Forecasting

/**
 * Queue Wait Time Prediction
 * Formula: waitTime = pendingOrders × avgPrepTime + buffer
 */
export function predictWaitTime(pendingOrders, avgPrepTime = 40, buffer = 30) {
  // avgPrepTime in seconds, buffer in seconds
  const waitTimeSeconds = (pendingOrders * avgPrepTime) + buffer
  const waitTimeMinutes = Math.ceil(waitTimeSeconds / 60)
  return {
    seconds: waitTimeSeconds,
    minutes: waitTimeMinutes,
    formula: `T = N×t + buffer = ${pendingOrders}×${avgPrepTime}s + ${buffer}s`
  }
}

/**
 * Exponential Smoothing for Demand Forecasting
 * Formula: F(t+1) = α × D(t) + (1−α) × F(t)
 * α = 0.35 (smoothing factor)
 */
export function exponentialSmoothing(historicalData, alpha = 0.35) {
  if (!historicalData || historicalData.length === 0) {
    return 0
  }
  
  // Initialize forecast with first observation
  let forecast = historicalData[0]
  
  // Apply exponential smoothing
  for (let i = 1; i < historicalData.length; i++) {
    forecast = alpha * historicalData[i] + (1 - alpha) * forecast
  }
  
  // Predict next period
  const nextForecast = Math.round(alpha * historicalData[historicalData.length - 1] + (1 - alpha) * forecast)
  
  return {
    forecast: nextForecast,
    alpha,
    formula: `F(t+1) = α × D(t) + (1−α) × F(t) = ${alpha} × D(t) + ${(1 - alpha).toFixed(2)} × F(t)`
  }
}

/**
 * Calculate demand forecast for all menu items
 */
export function forecastAllItems(menuItems, orderHistory) {
  const forecasts = {}
  
  menuItems.forEach(item => {
    // Get last 7 days of order data for this item
    const itemHistory = orderHistory
      .filter(order => order.itemId === item.id)
      .slice(-7)
      .map(order => order.quantity)
    
    if (itemHistory.length > 0) {
      forecasts[item.id] = exponentialSmoothing(itemHistory)
    } else {
      forecasts[item.id] = { forecast: item.avgDailyOrders || 10, alpha: 0.35 }
    }
  })
  
  return forecasts
}

/**
 * Calculate queue position and serving info
 */
export function getQueueInfo(currentToken, userToken, avgPrepTime = 40) {
  const ordersAhead = Math.max(0, userToken - currentToken - 1)
  const waitTime = predictWaitTime(ordersAhead, avgPrepTime)
  
  return {
    currentlyServing: currentToken,
    ordersAhead,
    estimatedWait: waitTime.minutes,
    formula: waitTime.formula
  }
}
