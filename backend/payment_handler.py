import razorpay
from flask import jsonify, request
from dotenv import load_load_dotenv
import os

load_dotenv()

# Initialize Razorpay client
razorpay_client = razorpay.Client(
    auth=(os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_KEY_SECRET'))
)

def create_upi_order(amount):
    """
    Create a new payment order
    amount: in paise (1 rupee = 100 paise)
    """
    try:
        order_data = {
            'amount': amount,
            'currency': 'INR',
            'payment_capture': 1,  # Auto-capture payment
        }
        order = razorpay_client.order.create(data=order_data)
        return order
    except Exception as e:
        return {'error': str(e)}

def verify_payment(payment_id, order_id, signature):
    """
    Verify the payment signature
    """
    try:
        razorpay_client.utility.verify_payment_signature({
            'razorpay_payment_id': payment_id,
            'razorpay_order_id': order_id,
            'razorpay_signature': signature
        })
        return True
    except Exception:
        return False
