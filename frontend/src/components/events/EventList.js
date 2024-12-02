import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch events');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            <div className="text-sm text-gray-500">
                                <p><span className="font-medium">Type:</span> {event.type}</p>
                                <p><span className="font-medium">Date:</span> {new Date(event.startDate).toLocaleDateString()}</p>
                                <p><span className="font-medium">Venue:</span> {event.venue}</p>
                                <p><span className="font-medium">Capacity:</span> {event.capacity}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                                    onClick={() => {/* Handle registration */}}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
