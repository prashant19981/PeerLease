import React from "react";
import './userContainer.css';
const UserContainer = () =>{

    return(
        <div className="userContainer">

            <div className="srInfo">
                <h3>Username</h3>
                <h3>Contact</h3>
                <h3>Price</h3>
                <div className>
                    <span>
                    <button class="btn btn-outline-success gap 10" type="submit" >Approve</button>
                    </span>
                    <span>
                    <button class="btn btn-outline-success gap 10" type="submit" >Reject</button>
                    </span>
                </div>

            </div>
        </div>
    );

}

export default UserContainer;