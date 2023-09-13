import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ReservationContainer from "../../components/myReservation/ReservationContainer";
import useSearch from "../../hooks/useSearch";
const MyReservation = () => {
    const URL = process.env.REACT_APP_WEB_URL;
    const { result, loading, error, refetch } = useSearch(`${URL}/users/my-reservations`);
    return (
        <div>
            <Navbar></Navbar>
            <div className="headerContainer">
                <h1>My Reservations</h1>

            </div>
            <div className="propertyContainer">
                {loading || error ? (
                    <>
                        <h1>Loading</h1>
                    </>
                ) : (
                    <>
                        {console.log(result)}
                        {result.map((value) => {
                            return <ReservationContainer
                                name={value.property.name}
                                type={value.property.type}
                                uni={value.property.university}
                                approved={value.isApproved}
                                status={value.status}
                                id={value.property._id}
                                src={value.property.imageURL}>

                            </ReservationContainer>
                        })}

                    </>
                )}

            </div>

        </div>
    );


}
export default MyReservation;