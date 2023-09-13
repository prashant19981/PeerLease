import { useEffect, useState } from "react";
import './Checkout.css';
import { Elements } from "@stripe/react-stripe-js";
import PaymentBox from "../../components/paymentBox/PaymentBox";
import { loadStripe } from "@stripe/stripe-js";
import useSearch from "../../hooks/useSearch";
import { useParams } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const URL = process.env.REACT_APP_WEB_URL;
  const { id } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { result, loading, error, refetch } = useSearch(`${URL}/properties/${id}`);

  useEffect(() => {
    const getStripe = async () => {
      try {
        const res = await axios.get(`${URL}/config`);
        const publishableKey = res.data.publishableKey;

        setStripePromise(loadStripe(publishableKey));
        console.log(stripePromise);
      }
      // fetch("/config").then(async (r) => {
      //   const { publishableKey } = await r.json();

      // });
      catch (e) {
        console.log(e);
      }
    }
    getStripe();
  }, []);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axios.post(`${URL}create-payment-intent`);
        var clientSecret = res.data.clientSecret;
        setClientSecret(clientSecret);
        console.log(clientSecret);
      }
      catch (e) {
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
  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="paymentContainer">

        <h1>Stripe Payment Gateway</h1>
      </div>
      <div className="paymentContainer">
        <div className="paymentProperty">
          <span className="d-flex justify-content-center m-3">
            <h4>{result.name}</h4>
          </span>
          <div className="imgContainer">
            <img src={result.imageURL}
              className="propertyImage" />
          </div>
          <span className="d-flex justify-content-center">
          <h4>Amount: £{result.deposit}</h4>
          </span>
          
        </div>
        
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