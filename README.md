# Event Management Platform

A comprehensive web application for streamlining college event organization and volunteer management. This platform enables efficient event planning, volunteer coordination, and participant registration for college events.

## Features

- **User Authentication**
  - Secure login and registration
  - Role-based access control
  - Email verification

- **Event Management**
  - Create and manage events
  - Track event lifecycle
  - Resource allocation
  - Participant registration

- **Volunteer System**
  - Volunteer registration
  - Skill tracking
  - Availability management
  - Task assignment

- **Payment Integration**
  - Secure payment processing
  - Transaction history
  - Payment status tracking

## Tech Stack

### Backend
- Flask (Python web framework)
- SQLite (Database)
- Flask-Login (Authentication)
- Flask-Migrate (Database migrations)
- SQLAlchemy (ORM)

### Frontend
- React
- Tailwind CSS
- Axios
- Formik
- React Router

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Ktripathi2611/event-management-.git
   cd event-management
   ```

2. Create and activate virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

5. Initialize database
   ```bash
   flask db upgrade
   ```

6. Run the server
   ```bash
   flask run
   ```

### Frontend Setup
1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```

2. Start development server
   ```bash
   npm start
   ```

## Project Structure
```
event-management/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── migrations/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Security Features
- Password hashing
- JWT authentication
- CSRF protection
- Input validation
- Rate limiting

## Future Enhancements
- Real-time notifications
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- Academic system integration

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- Project Link: [https://github.com/Ktripathi2611/event-management-](https://github.com/Ktripathi2611/event-management-)