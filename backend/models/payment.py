from datetime import datetime
from . import db

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    upi_id = db.Column(db.String(50), nullable=False)
    transaction_ref = db.Column(db.String(100), nullable=False, unique=True)
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'upi_id': self.upi_id,
            'transaction_ref': self.transaction_ref,
            'status': self.status,
            'timestamp': self.timestamp.isoformat(),
            'user_id': self.user_id,
            'event_id': self.event_id
        }
