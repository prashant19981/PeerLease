import React from "react";
import Navbar from "../../components/navbar/Navbar";
import PropertyContainer from "../../components/myProperty/PropertyContainer"
import './myProperty.css';
import useSearch from "../../hooks/useSearch";
import UserContainer from "../../components/userContainer/UserContainer";
const MyProperty = () => {
    const URL = process.env.REACT_APP_WEB_URL;
    const { result, loading, error, refetch } = useSearch(`${URL}/users/my-property`);
    return (
        <div>
            <Navbar></Navbar>
            <div className="headerContainer">
                <h1>My Properties</h1>

            </div>

            <div className="propertyContainer">
                {loading || error ? (
                    <>
                        <h1>Loading...</h1>
                    </>
                ) : (
                    <>
                        {result.map((value) => {
                            // console.log(value);
                            return (
                                <>
                                    <PropertyContainer name = {value.name}
                                    type = {value.type}
                                    uni = {value.university}
                                    prop = {value._id}
                                    src = {value.imageURL}
                                    ></PropertyContainer>
                                    
                                
                            
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