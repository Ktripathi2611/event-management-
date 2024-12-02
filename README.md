# Event Management System

A full-stack web application for managing events, bookings, and payments. Built with Flask (Backend) and React (Frontend).

## Features

- User Authentication & Authorization
- Event Creation and Management
- Ticket Booking System
- Secure Payment Processing
- Event Search and Filtering
- User Dashboard
- Admin Panel for Event Management

## Tech Stack

### Backend
- Python 3.x
- Flask
- SQLite Database
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS

### Frontend
- React.js
- Material-UI
- Axios
- React Router
- React Context API

## Prerequisites

Before running the application, make sure you have:
- Python 3.x installed
- Node.js and npm installed
- Git (optional)

## Installation

1. **Clone the repository** (if using Git)
```bash
git clone [repository-url]
cd event-management
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
# For Windows
venv\Scripts\activate
# For Unix/MacOS
source venv/bin/activate

pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

## Configuration

1. **Backend Configuration**
- Create a `.env` file in the backend directory
```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///instance/events.db
JWT_SECRET_KEY=your-secret-key
```

2. **Frontend Configuration**
- The frontend configuration is preset in the `.env` file

## Running the Application

1. **Start the Backend Server**
```bash
cd backend
python app.py
```
The backend server will start at `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```
The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Events
- GET `/api/events` - Get all events
- GET `/api/events/<id>` - Get specific event
- POST `/api/events` - Create new event (Admin only)
- PUT `/api/events/<id>` - Update event (Admin only)
- DELETE `/api/events/<id>` - Delete event (Admin only)

### Bookings
- GET `/api/bookings` - Get user bookings
- POST `/api/bookings` - Create new booking
- GET `/api/bookings/<id>` - Get specific booking
- DELETE `/api/bookings/<id>` - Cancel booking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, email [support-email] or create an issue in the repository.