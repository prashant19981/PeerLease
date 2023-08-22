import React, { useEffect, useState } from "react";
import './room.css'
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { faLocationDot, faSink, faHouse, faBasketShopping, faBed,faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import ReservationBox from "../../components/reservationBox/ReservationBox";
const Room = () => {

    const { id } = useParams();
    const { result, loading, error, refetch } = useSearch(`http://localhost:3000/properties/${id}`);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const checkLogin = async () => {


            try {
                const res = await axios.get("http://localhost:3000/users/checklogin", {
                    withCredentials: true,
                });
                // console.log(res);
                if (res.status === 200) {
                    setIsLoggedIn(true);
                }
            }
            catch (e) {
                setIsLoggedIn(false);
            }
        }
        checkLogin();
    });
    if (loading) {
        return (
            <div>
                <Navbar></Navbar>
               
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return;
    }
    



    return (

        <div>
            <Navbar></Navbar>
            <div className="main">
                <div className="roomContainer">
                    <div className="propertyName">
                        <h3>{result.name}</h3>
                    </div>
                    <div className="locationContainer">
                        <FontAwesomeIcon className="icon" icon={faLocationDot} />
                        <p className="city">{result.city}</p>
                    </div>

                    <div className="imgContainer">
                        <img src={result.imageURL}
                            className="propertyImage" />
                    </div>
                    <hr></hr>
                    <div className="accomodationName">
                        <h3>Accomodation Details</h3>
                    </div>
                    <div className="hotelDescContainer">

                        <span className="hotelDesc">

                            <h4>Nearest University: {result.university} (1 mile)</h4>


                        </span>

                    </div>
                    <div className="dateContainer">
                        <span><FontAwesomeIcon className="icon" icon={faHouse} /></span>
                        <span><p>{result.type}</p></span>
                        <span><FontAwesomeIcon className="icon" icon={faBasketShopping} /></span>
                        <span><p>Grocery: 2 miles</p></span>
                        <span> <FontAwesomeIcon className="icon" icon={faSink} /></span>
                        <span> <p>Baths: 2</p></span>
                        <span> <FontAwesomeIcon className="icon" icon={faBed} /></span>
                        <span> <p>Rooms: 2</p></span>
                    </div>
                    <div>
                        <h4>Amenities</h4>
                        <div className="dateContainer">
                            <span><FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span><p>Bike Storage</p></span>
                            <span><FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span><p>Wifi</p></span>
                            <span> <FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span> <p>TV</p></span>
                            <span> <FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span> <p>Dryer</p></span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    {/* {isLoggedIn ? (
                        <>
                            <span className="bookingButton">
                                <button className="btn btn-primary" onClick={handleReserve}>Reserve Property</button>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="bookingButton">
                                <p>Please Login to reserve property.</p>
                            </span>
                        </>
                    )


                    } */}



                </div>
                <div className="priceContainer">
                    {isLoggedIn ? (
                        <ReservationBox id={id}></ReservationBox>
                    ):(
                        <h4>Please Login to reserve property.</h4>
                    )}
                    
                </div>
            </div>
        </div>
    )

}

export default Room;