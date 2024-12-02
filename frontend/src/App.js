import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15-17, 2024",
      location: "Central Park Arena",
      description: "Three days of non-stop music featuring top artists from around the world. Experience amazing performances, food stalls, and unforgettable moments.",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
      price: "$199",
      facilities: [
        "VIP Lounge Access",
        "Food & Beverage Stalls",
        "Premium Seating",
        "Meet & Greet Opportunities",
        "Free Parking",
        "Medical Support"
      ],
      detailedDescription: "Join us for an unforgettable weekend of music, art, and culture. Our state-of-the-art sound system and multiple stages ensure you never miss a beat. VIP packages include exclusive lounge access and artist meet-and-greets."
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "August 5, 2024",
      location: "Digital Convention Center",
      description: "Join industry leaders and innovators for a day of cutting-edge technology discussions, demonstrations, and networking opportunities.",
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      price: "$299",
      facilities: [
        "High-speed WiFi",
        "Workshop Areas",
        "Networking Zones",
        "Tech Demo Spaces",
        "Catered Lunch",
        "Recording Services"
      ],
      detailedDescription: "Immerse yourself in the future of technology. Featured talks on AI, blockchain, and sustainable tech. Hands-on workshops and exclusive product demonstrations from leading tech companies."
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      date: "September 10-12, 2024",
      location: "Riverside Gardens",
      description: "Savor exquisite cuisines and fine wines from renowned chefs and wineries. Includes cooking demonstrations and tasting sessions.",
      image: "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg",
      price: "$150",
      facilities: [
        "Tasting Stations",
        "Cooking Workshop Areas",
        "Wine Cellar Tours",
        "Chef Meet & Greets",
        "Outdoor Seating",
        "Souvenir Shop"
      ],
      detailedDescription: "A gastronomic journey featuring over 50 premium wines and signature dishes from Michelin-starred chefs. Participate in exclusive cooking masterclasses and wine pairing sessions."
    }
  ];

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleBooking = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <div className={`login-container ${isLoading ? 'loading' : ''}`}>
          <div className="login-box">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="login-button">
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className={`home-container ${isVisible ? 'visible' : ''}`}>
          <div className="welcome-section">
            <h2>Welcome, {username}! 👋</h2>
            <p>Discover and book amazing events happening near you.</p>
          </div>
          
          <div className="event-grid">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="card-info">
                  <div className="event-content">
                    <div className="event-image-container">
                      <img src={event.image} alt={event.title} className="event-image" />
                    </div>
                    <div className="event-details">
                      <h3 className="title">{event.title}</h3>
                      <p className="event-date">{event.date}</p>
                      <p className="event-location">{event.location}</p>
                      <div className="event-footer">
                        <span className="event-price">{event.price}</span>
                        <button className="book-button" onClick={() => handleBooking(event)}>
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showModal && selectedEvent && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>×</button>
                <h2>{selectedEvent.title}</h2>
                <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
                <div className="modal-details">
                  <p className="modal-date">{selectedEvent.date}</p>
                  <p className="modal-location">{selectedEvent.location}</p>
                  <div className="modal-description">
                    <h3>About This Event</h3>
                    <p>{selectedEvent.detailedDescription}</p>
                  </div>
                  <div className="facilities-section">
                    <h3>Facilities & Amenities</h3>
                    <div className="facilities-grid">
                      {selectedEvent.facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <span className="modal-price">{selectedEvent.price}</span>
                    <button className="modal-book-button" onClick={closeModal}>
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
