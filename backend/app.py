from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_management.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')

    # Initialize extensions
    from models import db, init_db
    init_db(app)
    
    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    login_manager.login_view = 'auth.login'

    # Import models
    from models.user import User
    from models.event import Event
    from models.payment import Payment

    # Import and register blueprints
    from routes.payment_routes import payment_bp
    from routes.auth_routes import auth_bp
    from routes.event_routes import event_bp

    app.register_blueprint(payment_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(event_bp, url_prefix='/api')

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        from models import db
        db.create_all()
    app.run(debug=True)
