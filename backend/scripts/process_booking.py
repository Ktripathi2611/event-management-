import sys
import json
from database import Database
from datetime import datetime

def process_booking(booking_data):
    try:
        # Initialize database connection
        db = Database()
        
        # Process the booking
        booking = {
            'event_id': booking_data['eventId'],
            'user_id': booking_data['userId'],
            'booking_time': datetime.now().isoformat(),
            'status': 'confirmed'
        }
        
        # Save to database
        booking_id = db.create_booking(booking)
        
        # Update event capacity
        db.update_event_capacity(booking_data['eventId'])
        
        return json.dumps({
            'success': True,
            'booking_id': booking_id,
            'message': 'Booking confirmed successfully'
        })
    except Exception as e:
        return json.dumps({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    # Get booking data from Node.js
    booking_data = json.loads(sys.argv[1])
    
    # Process the booking and return result
    result = process_booking(booking_data)
    print(result)  # This will be captured by Node.js
