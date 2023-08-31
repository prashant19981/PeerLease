import React from "react";
import './reservationContainer.css'
import { useNavigate } from "react-router-dom";
const ReservationContainer = (props) => {
    const navigate = useNavigate();

    const handlePayment= ()=>{

        navigate(`/checkout/${props.id}`)
    }

    return (<div>
        <div className="reservationContainer">
            <div className="imageContainer">
                <img src="https://www.studentcastle.co.uk/media/2397/atkinson-twin-2.png?anchor=middlecenter&mode=crop&quality=75&format=png&scale=both&width=1200&height=750"
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

            </div>
        </div>
    </div>)

}

export default ReservationContainer;