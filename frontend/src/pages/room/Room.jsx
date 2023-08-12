import React, { useEffect, useState } from "react";
import './room.css'
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import axios from "axios";
const Room = () => {

    const { id } = useParams();
    const { result, loading, error, refetch } = useSearch(`http://localhost:3000/properties/${id}`);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const checkLogin = async () => {


            try {
                const res = await axios.get("http://localhost:3000/users/checklogin",{
                    withCredentials:true,
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
                <h1>Loading</h1>
            </div>
        );
    }
    if (error) {
        return;
    }
    const handleReserve = async()=>{
        try{
            const res = await axios.post(`http://localhost:3000/properties/${id}/reserve`,null,{
                withCredentials: true,
            }
            );
            const responseData = JSON.parse(res.data);
            console.log(responseData);
        }
        catch(e){
            console.log(e);
        }
    }



    return (

        <div>
            <Navbar></Navbar>
            <div className="roomContainer">
                <div className="propertyName">
                    <h1>{result.name}</h1>
                </div>

                <p>{result.city}</p>
                <div className="imgContainer">
                    <img src={result.imageURL}
                        className="propertyImage" />
                </div>
                <div className="hotelDescContainer">
                    <span className="hotelDesc">
                        <h1>{result.university}</h1>
                        <p>{result.type}</p>
                    </span>
                    {isLoggedIn ? (
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


                    }
                </div>


            </div>
        </div>
    )

}

export default Room;