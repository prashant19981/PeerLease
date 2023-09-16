import react, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import axios from "axios";

const Navbar = () => {
    const URL = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const { result, loading, error, refetch } = useSearch(`${URL}/users/getname`);


    function addListing() {
        if(result.name){
        navigate("/listing");
        }
        else{
            navigate("/login");
        }
    }
    function homePage() {
        navigate("/");
    }
    function handleLogin() {
        navigate("/login");
    }
    function handleSignup() {
        navigate("/signup");
    }
    function handleMyReservations(){
        navigate("/myreservation")
    }
    function handleMyProperties(){
        navigate("/myproperty")
    }
    const handleLogout = async () => {
        try {

            const res = await axios.post(`${URL}/auth/logout`, null, {
                withCredentials: true,
            });
            console.log(res);
            navigate("/login");


        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary custom-background">
            <div class="container-fluid">
                <a class="navbar-brand navbar-elements" href="#" onClick={homePage}>PeerLease</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    {loading || error ? (
                        <></>
                    ) : (

                        <div class="navbar-nav">

                            <a class="nav-link active navbar-elements" aria-current="page" href="#" onClick={handleMyProperties}>My Properties</a>
                            <a class="nav-link navbar-elements" href="#" onClick={handleMyReservations}>My Reservations</a>
                            

                        </div>
                    )
                    }
                    <div className="navbar-nav ms-auto">
                        <a class="nav-link navbar-elements" href="#" onClick={addListing}>List your property?</a>
                        {loading || error ? (
                            <>
                                <button class="btn btn-outline-success mr-4" type="submit" onClick={handleLogin}>Login</button>
                                <button class="btn btn-outline-success ml-3" type="submit" onClick={handleSignup}>Signup</button>
                            </>
                        ) :
                            (
                                <>
                                    <a class="nav-link navbar-elements" href="#">Hi {result.name}</a>
                                    <button class="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>
                                    

                                </>


                            )}

                    </div>
                </div>
            </div>
        </nav>
    )

}
export default Navbar;