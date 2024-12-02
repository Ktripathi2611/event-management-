from app import create_app
from models import db
from models.user import User
from models.event import Event
from models.payment import Payment
from werkzeug.security import generate_password_hash

def init_database():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Create a test admin user
        admin = User.query.filter_by(email='admin@example.com').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                password_hash=generate_password_hash('admin123')
            )
            db.session.add(admin)
        
        # Create some test events
        if Event.query.count() == 0:
            events = [
                Event(
                    title='Summer Music Festival',
                    description='A weekend of live music performances',
                    date='2024-07-15',
                    price=1500,
                    image='https://source.unsplash.com/random/800x600/?concert'
                ),
                Event(
                    title='Tech Conference 2024',
                    description='Learn about the latest technology trends',
                    date='2024-08-20',
                    price=2000,
                    image='https://source.unsplash.com/random/800x600/?technology'
                ),
                Event(
                    title='Food & Wine Festival',
                    description='Taste exotic cuisines and fine wines',
                    date='2024-09-10',
                    price=1200,
                    image='https://source.unsplash.com/random/800x600/?food'
                )
            ]
            for event in events:
                db.session.add(event)
        
        # Commit all changes
        db.session.commit()

if __name__ == '__main__':
    init_database()
    print("Database initialized successfully!")
