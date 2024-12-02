const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('Client connected');

    // Real-time event booking updates
    socket.on('bookEvent', async (data) => {
        // Call Python script for booking logic
        const pythonProcess = spawn('python', ['./scripts/process_booking.py', JSON.stringify(data)]);

        pythonProcess.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            // Broadcast booking update to all clients
            io.emit('bookingUpdate', result);
        });
    });

    // Real-time chat for event discussions
    socket.on('sendMessage', (data) => {
        io.emit('newMessage', {
            user: data.user,
            message: data.message,
            timestamp: new Date()
        });
    });

    // Live event updates
    socket.on('updateEventStatus', async (data) => {
        const pythonProcess = spawn('python', ['./scripts/update_event.py', JSON.stringify(data)]);

        pythonProcess.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            io.emit('eventStatusUpdate', result);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// API Routes
app.post('/api/events', (req, res) => {
    const pythonProcess = spawn('python', ['./scripts/create_event.py', JSON.stringify(req.body)]);

    pythonProcess.stdout.on('data', (data) => {
        res.json(JSON.parse(data.toString()));
    });
});

app.get('/api/events', (req, res) => {
    const pythonProcess = spawn('python', ['./scripts/get_events.py']);

    pythonProcess.stdout.on('data', (data) => {
        res.json(JSON.parse(data.toString()));
    });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
