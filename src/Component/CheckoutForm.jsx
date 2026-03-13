import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CheckoutForm = ({ paymentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { payableAmount, email, month } = paymentData;

  useEffect(() => {
    if (payableAmount > 0) {
      axios.post("http://localhost:5000/create-payment-intent", { price: payableAmount })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [payableAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card });

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: card, billing_details: { email: email } },
      });

      if (paymentIntent.status === "succeeded") {
       
        const paymentRecord = {
          ...paymentData,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        
        await axios.post("http://localhost:5000/api/payments", paymentRecord);
        Swal.fire("Success!", "Payment Completed Successfully", "success");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-xl bg-slate-50">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button 
        type="submit" 
        disabled={!stripe || !clientSecret}
        className="btn bg-indigo-600 w-full text-white"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;