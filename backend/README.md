# RentKaro Backend API

This is the Node.js/Express backend API for the RentKaro vehicle rental service.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles (supports `?type=two-wheeler` or `?type=four-wheeler` filters)
- `GET /api/vehicles/available` - Get available vehicles only
- `GET /api/vehicles/:id` - Get vehicle details by ID

### Bookings
- `POST /api/bookings` - Create a new booking
  - Body: `{ vehicleId, startDate, endDate, customerName, customerEmail }`
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking details
- `DELETE /api/bookings/:id` - Cancel a booking

### Health Check
- `GET /api/health` - API health check

## Database
Currently uses in-memory storage. For production, integrate with MongoDB or your preferred database.

## Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
