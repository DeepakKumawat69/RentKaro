# RentKaro - Vehicle Rental Platform

A modern web application for renting two-wheelers and four-wheelers. Built with React + Vite for the frontend and Node.js/Express for the backend.

## Architecture

```
RentKaro/
├── src/                 # React frontend
│   ├── App.jsx         # Main component
│   ├── App.css         # Styling
│   ├── api.js          # API client utilities
│   └── main.jsx        # Entry point
├── backend/            # Node.js/Express backend
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   ├── .env           # Environment variables
│   └── README.md      # Backend documentation
├── index.html          # HTML template
├── package.json        # Frontend dependencies
└── vite.config.js      # Vite configuration
```

## Features

✅ Browse two-wheelers and four-wheelers
✅ Filter vehicles by type
✅ Book vehicles with date selection
✅ View booking history
✅ Responsive design (mobile-friendly)
✅ RESTful API with vehicle and booking endpoints
✅ In-memory database for development

## Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and go to `http://localhost:5173`

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

The API will be available at `http://localhost:5000/api`

## Available Vehicles

### Two-Wheelers
- Honda CB200 - ₹500/day
- Royal Enfield - ₹600/day
- Scooty Activa - ₹300/day

### Four-Wheelers
- Maruti Alto - ₹1500/day
- Mahindra XUV500 - ₹2500/day
- Hyundai Creta - ₹2000/day

## API Endpoints

### GET /api/vehicles
Get all vehicles or filter by type
```
/api/vehicles
/api/vehicles?type=two-wheeler
/api/vehicles?type=four-wheeler
```

### POST /api/bookings
Create a new booking
```json
{
  "vehicleId": 1,
  "startDate": "2024-03-15",
  "endDate": "2024-03-20",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

### GET /api/bookings
Get all bookings

### DELETE /api/bookings/:id
Cancel a specific booking

## Tech Stack

- **Frontend:** React 19, Vite, JavaScript (ES modules)
- **Backend:** Node.js, Express.js
- **Styling:** CSS3 with responsive design
- **Database:** In-memory (ready to upgrade to MongoDB)

## Future Enhancements

- User authentication and accounts
- Payment integration
- Real database (MongoDB/PostgreSQL)
- Email notifications
- Advanced search and filters
- Admin dashboard
- Vehicle availability calendar
- Review and rating system
- Multiple location support

## Development

To add new features:

1. **Frontend:** Modify `src/App.jsx` and add new components
2. **Backend:** Add new routes in `backend/server.js`
3. **API Integration:** Update functions in `src/api.js`

## License

MIT License - Feel free to use this project as you wish!

---

For more details, see the [Backend README](./backend/README.md)
