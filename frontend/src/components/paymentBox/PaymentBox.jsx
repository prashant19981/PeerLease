import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import './paymentBox.css';
import { useNavigate } from "react-router-dom";

const PaymentBox = () =>{
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const[message, setMessage] = useState(null);
    const [isProcessing,setIsProcessing] = useState(false);

    const handlePayment = async(event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsProcessing(true);
        const {error}  = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:`${window.location.origin}/payment/`,
            },
        });
        if(!error){
            navigate("/success",{state:{message:"payment"}});
        }
        if(error.type === "card_error" || error.type===" validation_error"){
            setMessage(error.message);
        }
        else{
            setMessage("An unexpected error occured.");
        }
        setIsProcessing(false);
    };
    return(
        <form id="payment-form" onSubmit={handlePayment}>
            <PaymentElement id="payment-element"/>
            <button className="paymentButton" disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
                {isProcessing? "Processing...":"Pay Now"}
            </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
            

        </form>
    );
}
export default PaymentBox;
