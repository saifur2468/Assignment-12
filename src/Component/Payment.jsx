import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe("your_stripe_publishable_key_here");

const Payment = () => {
  const location = useLocation();
  const paymentData = location.state;

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      <div className="mb-6 bg-indigo-50 p-4 rounded-xl">
        <p className="text-sm">Paying for: <b>{paymentData.month}</b></p>
        <p className="text-xl font-black text-indigo-600">Total: ${paymentData.payableAmount}</p>
      </div>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};

export default Payment;