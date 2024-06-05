import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

function PaymentForm({ handlePlaceOrder }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    try {
      // Call handlePlaceOrder with stripe and elements
      await handlePlaceOrder(stripe, elements);
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error gracefully (e.g., display a message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}

PaymentForm.propTypes = {
  handlePlaceOrder: PropTypes.func.isRequired,
};

export default PaymentForm;
