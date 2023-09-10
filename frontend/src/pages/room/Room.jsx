import React, { useEffect, useState } from "react";
import './room.css'
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { faLocationDot, faSink, faHouse, faBasketShopping, faBed, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
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



    console.log(result);
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
                        <p className="city">{result.address}</p>
                    </div>

                    <div className="imgContainer">
                        <img src={result.imageURL}
                            className="propertyImage" />
                    </div>
                    <hr></hr>
                    <div className="accomodationName">
                        {/* <h3>Accomodation Details</h3> */}
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
                        <span><p>Grocery: {result.grocery} miles</p></span>
                        <span> <FontAwesomeIcon className="icon" icon={faSink} /></span>
                        <span> <p>Baths: {result.baths}</p></span>
                        <span> <FontAwesomeIcon className="icon" icon={faBed} /></span>
                        <span> <p>Rooms: {result.beds}</p></span>
                    </div>
                    {result.amenities &&
                        <div>
                            <h4>Amenities</h4>
                            <div className="dateContainer">
                                {result.amenities.split(',').map((value) =>
                                    <>
                                        <span><FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                                        <span><p>{value}</p></span>
                                    </>
                                )}
                                {/* <span><FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span><p>Bike Storage</p></span>
                            <span><FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span><p>Wifi</p></span>
                            <span> <FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span> <p>TV</p></span>
                            <span> <FontAwesomeIcon className="icon" icon={faFireFlameCurved} /></span>
                            <span> <p>Dryer</p></span> */}
                            </div>
                        </div>
                    }
                    <hr />
                    <div>
                        <p>
                            {result.desc}
                        </p>
                    </div>



                </div>
                <div className="priceContainer">
                    {isLoggedIn ? (
                        <>
                            <ReservationBox id={id} price={result.price}
                                date={result.date} deposit={result.deposit}
                                bills={result.bills}> </ReservationBox>
                            <div className="contactContainer">
                                <div class="card" style={{ width: '18rem' }}>

                                    <div class="card-body body-color">
                                        <h5 class="card-title">Contact Owner</h5>
                                        <p class="card-text">Get in Touch with the Owner via WhatsApp</p>
                                        <a href="https://wa.me/1234567890" target="_blank"><button class="btn btn-outline-success gap 10" type="submit">Whatsapp</button></a>

                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h4>Please Login to reserve property.</h4>
                    )}


                </div>
            </div>



        </div>
    )

}

export default Room;