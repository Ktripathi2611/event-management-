import json
from database import Database

def get_events():
    try:
        # Initialize database connection
        db = Database()
        
        # Get all events
        events = db.get_all_events()
        
        return json.dumps({
            'success': True,
            'events': events
        })
    except Exception as e:
        return json.dumps({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    # Get events and return result
    result = get_events()
    print(result)  # This will be captured by Node.js
