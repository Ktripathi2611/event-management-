import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UPIPayment from './UPIPayment';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        // Fetch events when component mounts
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data.events || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleBookEvent = (event) => {
        setSelectedEvent(event);
        setShowPayment(true);
    };

    const handlePaymentSuccess = (paymentDetails) => {
        console.log('Payment successful:', paymentDetails);
        setShowPayment(false);
        setSelectedEvent(null);
        // You might want to refresh the events list or update UI
    };

    const handlePaymentFailure = (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed: ' + error);
    };

    return (
        <div className="event-list-container">
            <h2>Available Events</h2>
            <div className="event-grid">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p className="event-date">
                            Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="event-price">Price: ₹{event.price}</p>
                        <button 
                            onClick={() => handleBookEvent(event)}
                            className="book-button"
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {showPayment && selectedEvent && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <h3>Payment for {selectedEvent.title}</h3>
                        <UPIPayment 
                            amount={selectedEvent.price}
                            eventId={selectedEvent.id}
                            onSuccess={handlePaymentSuccess}
                            onFailure={handlePaymentFailure}
                        />
                        <button 
                            onClick={() => setShowPayment(false)}
                            className="close-button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;
