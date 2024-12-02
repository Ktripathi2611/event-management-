from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.payment import Payment
from models import db

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/payment', methods=['POST'])
@login_required
def create_payment():
    data = request.get_json()
    
    payment = Payment(
        amount=data['amount'],
        payment_method=data['payment_method'],
        status='pending',
        user_id=current_user.id,
        event_id=data['event_id']
    )
    
    db.session.add(payment)
    db.session.commit()
    
    return jsonify({'message': 'Payment initiated', 'payment': payment.to_dict()}), 201

@payment_bp.route('/payment/<int:payment_id>', methods=['GET'])
@login_required
def get_payment(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    
    if payment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
        
    return jsonify(payment.to_dict()), 200

@payment_bp.route('/payments', methods=['GET'])
@login_required
def get_user_payments():
    payments = Payment.query.filter_by(user_id=current_user.id).all()
    return jsonify([payment.to_dict() for payment in payments]), 200
