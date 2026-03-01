export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const fetchVehicles = async (type = null) => {
  try {
    const url = type ? `${API_BASE_URL}/vehicles?type=${type}` : `${API_BASE_URL}/vehicles`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch vehicles')
    return await response.json()
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
}

export const getVehicleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`)
    if (!response.ok) throw new Error('Failed to fetch vehicle')
    return await response.json()
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return null
  }
}

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
    if (!response.ok) throw new Error('Failed to create booking')
    return await response.json()
  } catch (error) {
    console.error('Error creating booking:', error)
    return null
  }
}

export const getBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`)
    if (!response.ok) throw new Error('Failed to fetch bookings')
    return await response.json()
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to cancel booking')
    return await response.json()
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return null
  }
}
