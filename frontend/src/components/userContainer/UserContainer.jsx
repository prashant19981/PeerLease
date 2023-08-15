import React from "react";
import './userContainer.css';
const UserContainer = (props) => {

    return (
        // <div className="userContainer">

        //     <div className="srInfo">
        //         <h4>{props.name}</h4>
        //         <h4>{props.email}</h4>
        //         <h4>Price</h4>
        //         <div className>
        //             <span>
        //             <button class="btn btn-outline-success gap 10" type="submit" >Approve</button>
        //             </span>
        //             <span>
        //             <button class="btn btn-outline-success gap 10" type="submit" >Reject</button>
        //             </span>
        //         </div>

        //     </div>
        // </div>
        <div class="card border-info mb-3" style={{ maxWidth: '18rem' }}>
            <div class="card-header">{props.name}</div>
            <div class="card-body">
                <h5 class="card-title">Email: {props.email}</h5>
                
            </div>
            <div class="card-footer bg-transparent border-info">
            <span style={{margin: '10px'}}>
                    <button class="btn btn-outline-success gap 10" type="submit" >Approve</button>
                     </span>
                     <span>
                     <button class="btn btn-outline-success gap 10" type="submit" >Reject</button>
                     </span>
                </div>
        </div>
    );

}

export default UserContainer;