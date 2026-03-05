import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory database (for development)
let vehicles = [
  { id: 1, name: 'Honda CB200', type: 'two-wheeler', price: 500, status: 'available', description: 'Bike - Perfect for daily commute' },
  { id: 2, name: 'Royal Enfield', type: 'two-wheeler', price: 600, status: 'available', description: 'Bike - Great for long rides' },
  { id: 3, name: 'Scooty Activa', type: 'two-wheeler', price: 300, status: 'available', description: 'Scooter - Easy to ride' },
  { id: 4, name: 'Maruti Alto', type: 'four-wheeler', price: 1500, status: 'available', description: 'Compact car - Economy friendly' },
  { id: 5, name: 'Mahindra XUV500', type: 'four-wheeler', price: 2500, status: 'available', description: 'SUV - Spacious and comfortable' },
  { id: 6, name: 'Hyundai Creta', type: 'four-wheeler', price: 2000, status: 'available', description: 'Sedan - Premium comfort' },
]

let bookings = []
let nextBookingId = 1

// Payment methods storage
let paymentMethods = []
let nextPaymentMethodId = 1

// Routes

// Get all vehicles
app.get('/api/vehicles', (req, res) => {
  const { type } = req.query

  let filteredVehicles = vehicles
  if (type) {
    filteredVehicles = vehicles.filter(v => v.type === type)
  }

  res.json(filteredVehicles)
})

// Get available vehicles
app.get('/api/vehicles/available', (req, res) => {
  const availableVehicles = vehicles.filter(v => v.status === 'available')
  res.json(availableVehicles)
})

// Get vehicle by ID
app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === parseInt(req.params.id))

  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' })
  }

  res.json(vehicle)
})

// Create booking
app.post('/api/bookings', (req, res) => {
  const { vehicleId, startDate, endDate, customerName, customerEmail, paymentMethodId } = req.body

  // Validation
  if (!vehicleId || !startDate || !endDate || !customerName || !customerEmail || !paymentMethodId) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const vehicle = vehicles.find(v => v.id === vehicleId)
  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' })
  }

  const paymentMethod = paymentMethods.find(pm => pm.id === paymentMethodId)
  if (!paymentMethod) {
    return res.status(404).json({ message: 'Payment method not found' })
  }

  // Calculate cost
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  const totalCost = vehicle.price * days

  const booking = {
    id: nextBookingId++,
    vehicleId,
    vehicleName: vehicle.name,
    startDate,
    endDate,
    days,
    totalCost,
    customerName,
    customerEmail,
    paymentMethodId,
    paymentMethodType: paymentMethod.type,
    status: 'confirmed',
    createdAt: new Date()
  }

  bookings.push(booking)

  // Mark vehicle as unavailable (in a real app, check for overlapping dates)
  vehicle.status = 'booked'

  res.status(201).json(booking)
})

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings)
})

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id))

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  res.json(booking)
})

// Cancel booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id))

  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  const booking = bookings[bookingIndex]
  bookings.splice(bookingIndex, 1)

  // Mark vehicle as available again
  const vehicle = vehicles.find(v => v.id === booking.vehicleId)
  if (vehicle) {
    vehicle.status = 'available'
  }

  res.json({ message: 'Booking cancelled successfully' })
})

// Payment Methods Routes
// Get all payment methods
app.get('/api/payment-methods', (req, res) => {
  res.json(paymentMethods)
})

// Add payment method
app.post('/api/payment-methods', (req, res) => {
  const { type, cardNumber, cardHolder, expiryDate, cvv } = req.body

  // Validation
  if (!type || !cardNumber || !cardHolder || !expiryDate || !cvv) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // Validate card number (basic check - 16 digits)
  if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
    return res.status(400).json({ message: 'Invalid card number' })
  }

  // Validate CVV (3-4 digits)
  if (!/^\d{3,4}$/.test(cvv)) {
    return res.status(400).json({ message: 'Invalid CVV' })
  }

  const paymentMethod = {
    id: nextPaymentMethodId++,
    type,
    cardNumber: cardNumber.slice(-4).padStart(cardNumber.length, '*'), // Mask the card number
    cardHolder,
    expiryDate,
    createdAt: new Date()
  }

  paymentMethods.push(paymentMethod)
  res.status(201).json(paymentMethod)
})

// Delete payment method
app.delete('/api/payment-methods/:id', (req, res) => {
  const methodIndex = paymentMethods.findIndex(pm => pm.id === parseInt(req.params.id))

  if (methodIndex === -1) {
    return res.status(404).json({ message: 'Payment method not found' })
  }

  paymentMethods.splice(methodIndex, 1)
  res.json({ message: 'Payment method deleted successfully' })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`RentKaro API server is running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

export default app
