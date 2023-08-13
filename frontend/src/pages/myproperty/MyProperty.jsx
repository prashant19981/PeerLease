import React from "react";
import Navbar from "../../components/navbar/Navbar";
import PropertyContainer from "../../components/myProperty/PropertyContainer"
import './myProperty.css';
import useSearch from "../../hooks/useSearch";
import UserContainer from "../../components/userContainer/UserContainer";
const MyProperty = () => {
    const { result, loading, error, refetch } = useSearch('http://localhost:3000/users/my-property');
    return (
        <div>
            <Navbar></Navbar>
            <div className="headerContainer">
                <h1>My Properties</h1>

            </div>

            <div className="propertyContainer">
                {loading || error ? (
                    <>
                        <h1>Loading</h1>
                    </>
                ) : (
                    <>
                        {result.map((value) => {
                            return (
                                <>
                                    <PropertyContainer></PropertyContainer>
                                    {/* {value.interestedUser.map((data) => {
                                        return (
                                            <div className="userInfoContainer">
                                                <UserContainer>

                                                </UserContainer>
                                            </div>

                                        )
                                    })} */}

                                </>
                            )

                        })}
                    </>
                )
                }

            </div>

        </div>
    );


}

export default MyProperty;