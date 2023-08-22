import { useEffect, useState } from "react";
import './Checkout.css';
import { Elements } from "@stripe/react-stripe-js";
import PaymentBox from "../../components/paymentBox/PaymentBox";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = () =>{
    const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getStripe = async() =>{
        try{
            const res = await axios.get("http://localhost:3000/config");
            const publishableKey = res.data.publishableKey;
            
            setStripePromise(loadStripe(publishableKey));
            console.log(stripePromise);
        }
        // fetch("/config").then(async (r) => {
        //   const { publishableKey } = await r.json();
          
        // });
        catch(e){
            console.log(e);
        }
    }
    getStripe();
  }, []);

  useEffect(() => {
    const createIntent = async() =>{
        try{
            const res = await axios.post("http://localhost:3000/create-payment-intent");
            var clientSecret = res.data.clientSecret;
            setClientSecret(clientSecret);
            console.log(clientSecret);
        }
        catch(e){
            console.log(e);
        }
    }
    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   body: JSON.stringify({}),
    // }).then(async (result) => {
    //   var { clientSecret } = await result.json();
    //   setClientSecret(clientSecret);
    // });
    createIntent();
  }, []);

  return (
    <>
    <div className="paymentContainer">
    
      <h1>React Stripe and the Payment Element</h1>
      </div>
      <div className="paymentContainer">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentBox />
        </Elements>
      )}
      </div>
      </>
 
  );
}
export default Checkout;