import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEvents(response.data.filter(event => 
                    event.organizer === user?.id || 
                    event.participants.includes(user?.id) ||
                    event.volunteers.includes(user?.id)
                ));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchUserEvents();
    }, [user]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
                <p className="text-gray-600">Role: {user?.role}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Your Events</h3>
                    {events.length > 0 ? (
                        <ul className="space-y-4">
                            {events.map(event => (
                                <li key={event._id} className="border-b pb-4">
                                    <h4 className="font-medium">{event.title}</h4>
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(event.startDate).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No events found</p>
                    )}
                </div>

                {user?.role === 'organizer' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                            onClick={() => {/* Handle create event */}}
                        >
                            Create New Event
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
