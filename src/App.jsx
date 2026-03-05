import { useState, useEffect } from 'react'
import './App.css'
import { getPaymentMethods, addPaymentMethod, deletePaymentMethod } from './api'

function App() {
  const [selectedType, setSelectedType] = useState(null)
  const [bookings, setBookings] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Credit Card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [bookingFormData, setBookingFormData] = useState({
    customerName: '',
    customerEmail: '',
    startDate: '',
    endDate: ''
  })

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

  // Load payment methods on component mount
  useEffect(() => {
    loadPaymentMethods()
  }, [])

  const loadPaymentMethods = async () => {
    const methods = await getPaymentMethods()
    setPaymentMethods(methods)
  }

  const filteredVehicles = selectedType ? vehicles.filter(v => v.type === selectedType) : vehicles

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault()
    
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      alert('Please fill all payment method fields')
      return
    }

    const result = await addPaymentMethod(formData)
    
    if (result) {
      alert('Payment method added successfully!')
      setPaymentMethods([...paymentMethods, result])
      setFormData({
        type: 'Credit Card',
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
      })
      setShowPaymentForm(false)
    } else {
      alert('Failed to add payment method')
    }
  }

  const handleDeletePaymentMethod = async (paymentMethodId) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      const result = await deletePaymentMethod(paymentMethodId)
      if (result) {
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodId))
        alert('Payment method deleted successfully!')
      } else {
        alert('Failed to delete payment method')
      }
    }
  }

  const handleBook = (vehicle) => {
    if (paymentMethods.length === 0) {
      alert('Please add a payment method first!')
      setShowPaymentForm(true)
      return
    }

    setSelectedVehicleForBooking(vehicle)
    setShowBookingModal(true)
  }

  const handleConfirmBooking = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method')
      return
    }

    if (!bookingFormData.customerName || !bookingFormData.customerEmail || !bookingFormData.startDate || !bookingFormData.endDate) {
      alert('Please fill all booking details')
      return
    }

    const start = new Date(bookingFormData.startDate)
    const end = new Date(bookingFormData.endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

    if (days <= 0) {
      alert('End date must be after start date')
      return
    }

    const booking = {
      id: Math.random(),
      vehicleName: selectedVehicleForBooking.name,
      customerName: bookingFormData.customerName,
      customerEmail: bookingFormData.customerEmail,
      startDate: bookingFormData.startDate,
      endDate: bookingFormData.endDate,
      days,
      totalCost: selectedVehicleForBooking.price * days,
      paymentMethod: selectedPaymentMethod.type
    }

    setBookings([...bookings, booking])
    alert(`${selectedVehicleForBooking.name} booked successfully with ${selectedPaymentMethod.type}!`)
    
    // Reset form
    setShowBookingModal(false)
    setSelectedVehicleForBooking(null)
    setSelectedPaymentMethod(null)
    setBookingFormData({
      customerName: '',
      customerEmail: '',
      startDate: '',
      endDate: ''
    })
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🚗 RentKaro</h1>
        <p>Rent Two-Wheelers & Four-Wheelers Easily</p>
      </header>

      {/* Payment Methods Section */}
      <section className="payment-section">
        <div className="payment-header">
          <h2>💳 Payment Methods ({paymentMethods.length})</h2>
          <button 
            className="add-payment-btn"
            onClick={() => setShowPaymentForm(!showPaymentForm)}
          >
            {showPaymentForm ? 'Cancel' : '+ Add Payment Method'}
          </button>
        </div>

        {showPaymentForm && (
          <form className="payment-form" onSubmit={handleAddPaymentMethod}>
            <div className="form-group">
              <label>Payment Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
                <option>UPI</option>
              </select>
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.cardHolder}
                onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength="4"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Add Payment Method</button>
          </form>
        )}

        {paymentMethods.length > 0 && (
          <div className="payment-methods-list">
            {paymentMethods.map(method => (
              <div key={method.id} className="payment-card">
                <div className="payment-info">
                  <p className="payment-type">{method.type}</p>
                  <p className="card-details">{method.cardHolder} • {method.cardNumber}</p>
                  <p className="expiry">Expires: {method.expiryDate}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePaymentMethod(method.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

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

      {/* Booking Modal */}
      {showBookingModal && selectedVehicleForBooking && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book {selectedVehicleForBooking.name}</h2>
              <button className="close-btn" onClick={() => setShowBookingModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="vehicle-info">
                <p className="vehicle-icon">{selectedVehicleForBooking.image}</p>
                <p className="vehicle-name">{selectedVehicleForBooking.name}</p>
                <p className="vehicle-price">₹{selectedVehicleForBooking.price}/day</p>
              </div>

              <form className="booking-form">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={bookingFormData.customerName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, customerName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={bookingFormData.customerEmail}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, customerEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    value={bookingFormData.startDate}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    value={bookingFormData.endDate}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, endDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Payment Method *</label>
                  <div className="payment-methods-selector">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className={`payment-option ${selectedPaymentMethod?.id === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPaymentMethod(method)}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod?.id === method.id}
                          onChange={() => setSelectedPaymentMethod(method)}
                        />
                        <span>{method.type} • {method.cardNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowBookingModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      {bookings.length > 0 && (
        <section className="bookings-section">
          <h2>Your Bookings ({bookings.length})</h2>
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <p><strong>{booking.vehicleName}</strong></p>
                <p>Name: {booking.customerName}</p>
                <p>Email: {booking.customerEmail}</p>
                <p>Dates: {booking.startDate} to {booking.endDate}</p>
                <p>Days: {booking.days}</p>
                <p>Payment: {booking.paymentMethod}</p>
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
