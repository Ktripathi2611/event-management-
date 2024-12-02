import React, { useState } from 'react';
import axios from 'axios';

const UPIPayment = ({ amount, eventId, onSuccess, onFailure }) => {
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionRef, setTransactionRef] = useState(null);

    const initiatePayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/initiate-payment', {
                amount,
                upi_id: upiId,
                event_id: eventId
            });

            setTransactionRef(response.data.payment_details.transaction_ref);
            
            // Show UPI payment details to user
            alert(`Please send payment of Rs. ${amount} to UPI ID: ${upiId}\nTransaction Reference: ${response.data.payment_details.transaction_ref}`);
            
        } catch (error) {
            onFailure(error.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/update-payment-status', {
                transaction_ref: transactionRef,
                status: 'completed'
            });

            if (response.data.status === 'success') {
                onSuccess(response.data.payment_details);
            }
        } catch (error) {
            onFailure(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upi-payment-container">
            {!transactionRef ? (
                <>
                    <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID"
                        className="upi-input"
                    />
                    <button 
                        onClick={initiatePayment}
                        disabled={loading || !upiId}
                        className="pay-button"
                    >
                        {loading ? 'Processing...' : 'Initiate Payment'}
                    </button>
                </>
            ) : (
                <button 
                    onClick={confirmPayment}
                    disabled={loading}
                    className="confirm-button"
                >
                    {loading ? 'Processing...' : 'Confirm Payment'}
                </button>
            )}
        </div>
    );
};

export default UPIPayment;
