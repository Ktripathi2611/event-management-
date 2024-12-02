import sqlite3
from datetime import datetime

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('events.db')
        self.cursor = self.conn.cursor()
        self.setup_database()

    def setup_database(self):
        # Create events table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                date TEXT NOT NULL,
                location TEXT NOT NULL,
                description TEXT,
                image TEXT,
                price REAL,
                capacity INTEGER,
                created_at TEXT
            )
        ''')

        # Create bookings table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_id INTEGER,
                user_id INTEGER,
                booking_time TEXT,
                status TEXT,
                FOREIGN KEY (event_id) REFERENCES events (id)
            )
        ''')

        self.conn.commit()

    def create_booking(self, booking_data):
        query = '''
            INSERT INTO bookings (event_id, user_id, booking_time, status)
            VALUES (?, ?, ?, ?)
        '''
        self.cursor.execute(query, (
            booking_data['event_id'],
            booking_data['user_id'],
            booking_data['booking_time'],
            booking_data['status']
        ))
        self.conn.commit()
        return self.cursor.lastrowid

    def update_event_capacity(self, event_id):
        query = '''
            UPDATE events 
            SET capacity = capacity - 1 
            WHERE id = ? AND capacity > 0
        '''
        self.cursor.execute(query, (event_id,))
        self.conn.commit()

    def get_all_events(self):
        query = 'SELECT * FROM events'
        self.cursor.execute(query)
        columns = [description[0] for description in self.cursor.description]
        events = []
        
        for row in self.cursor.fetchall():
            event = dict(zip(columns, row))
            events.append(event)
            
        return events

    def create_event(self, event_data):
        query = '''
            INSERT INTO events (title, date, location, description, image, price, capacity, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        '''
        self.cursor.execute(query, (
            event_data['title'],
            event_data['date'],
            event_data['location'],
            event_data['description'],
            event_data['image'],
            event_data['price'],
            event_data['capacity'],
            datetime.now().isoformat()
        ))
        self.conn.commit()
        return self.cursor.lastrowid

    def __del__(self):
        self.conn.close()
