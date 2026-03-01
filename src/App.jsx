import { useState } from 'react'
import './App.css'

function App() {
  const [selectedType, setSelectedType] = useState(null)
  const [bookings, setBookings] = useState([])

  // Sample vehicle data
  const vehicles = [
    // Two-wheelers
    { id: 1, name: 'Honda CB200', type: 'two-wheeler', price: 500, image: '🏍️', description: 'Bike - Perfect for daily commute' },
    { id: 2, name: 'Royal Enfield', type: 'two-wheeler', price: 600, image: '🏍️', description: 'Bike - Great for long rides' },
    { id: 3, name: 'Scooty Activa', type: 'two-wheeler', price: 300, image: '🛵', description: 'Scooter - Easy to ride' },
    // Four-wheelers
    { id: 4, name: 'Maruti Alto', type: 'four-wheeler', price: 1500, image: '🚗', description: 'Compact car - Economy friendly' },
    { id: 5, name: 'Mahindra XUV500', type: 'four-wheeler', price: 2500, image: '🚙', description: 'SUV - Spacious and comfortable' },
    { id: 6, name: 'Hyundai Creta', type: 'four-wheeler', price: 2000, image: '🚗', description: 'Sedan - Premium comfort' },
  ]

  const filteredVehicles = selectedType ? vehicles.filter(v => v.type === selectedType) : vehicles

  const handleBook = (vehicle) => {
    const booking = {
      id: Math.random(),
      vehicleName: vehicle.name,
      date: new Date().toLocaleDateString(),
      days: 1,
      totalCost: vehicle.price
    }
    setBookings([...bookings, booking])
    alert(`${vehicle.name} booked successfully!`)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🚗 RentKaro</h1>
        <p>Rent Two-Wheelers & Four-Wheelers Easily</p>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <h2>Find Your Perfect Vehicle</h2>
        <div className="filters">
          <button
            className={`filter-btn ${selectedType === null ? 'active' : ''}`}
            onClick={() => setSelectedType(null)}
          >
            All Vehicles
          </button>
          <button
            className={`filter-btn ${selectedType === 'two-wheeler' ? 'active' : ''}`}
            onClick={() => setSelectedType('two-wheeler')}
          >
            Two-Wheelers 🏍️
          </button>
          <button
            className={`filter-btn ${selectedType === 'four-wheeler' ? 'active' : ''}`}
            onClick={() => setSelectedType('four-wheeler')}
          >
            Four-Wheelers 🚗
          </button>
        </div>
      </section>

      {/* Vehicles Listing */}
      <section className="vehicles-section">
        <h2>Available Vehicles</h2>
        <div className="vehicles-grid">
          {filteredVehicles.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-image">{vehicle.image}</div>
              <h3>{vehicle.name}</h3>
              <p className="vehicle-desc">{vehicle.description}</p>
              <p className="price">₹{vehicle.price}/day</p>
              <button
                className="book-btn"
                onClick={() => handleBook(vehicle)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings Section */}
      {bookings.length > 0 && (
        <section className="bookings-section">
          <h2>Your Bookings ({bookings.length})</h2>
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <p><strong>{booking.vehicleName}</strong></p>
                <p>Date: {booking.date}</p>
                <p>Days: {booking.days}</p>
                <p className="total">Total: ₹{booking.totalCost}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose RentKaro?</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">✅</span>
            <h3>Easy Booking</h3>
            <p>Book your vehicle in just a few clicks</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💳</span>
            <h3>Safe Payment</h3>
            <p>Secure payment options available</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔧</span>
            <h3>Well Maintained</h3>
            <p>All vehicles are regularly serviced</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📞</span>
            <h3>24/7 Support</h3>
            <p>Customer support available round the clock</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 RentKaro. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
