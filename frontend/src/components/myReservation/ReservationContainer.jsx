import React from "react";
import './reservationContainer.css'
import { useNavigate } from "react-router-dom";
const ReservationContainer = (props) => {
    const navigate = useNavigate();

    const handlePayment= ()=>{

        navigate(`/checkout/${props.id}`)
    }
    const viewProperty = () =>{
        navigate(`/properties/${props.id}`)
    }
    return (<div>
        <div className="reservationContainer">
            <div className="imageContainer">
                <img src={props.src}
                    className="srImg" />
            </div>

            {/* <div className="srInfo">
                <h3>{props.name}</h3>
                <h4>{props.type}</h4>
                <h4>{props.uni}</h4>

            </div> */}
            <div className="propertyInfo">
                    <h4 className="mt-3 mb-3">Name: {props.name}</h4>
                    <p>University: {props.uni}</p>
                    
                </div>
            <div className="buttonContainer">
                {props.approved ? (
                    <button class="btn btn-outline-success" type="submit" onClick={handlePayment} >Make Payment</button>
                ) : (
                    <button class="btn btn-outline-success" type="submit" >{props.status}</button>
                )}
                <button class="btn btn-outline-success mt-4" type="submit" onClick={viewProperty} >View Property</button>

            </div>
        </div>
    </div>)

}

export default ReservationContainer;