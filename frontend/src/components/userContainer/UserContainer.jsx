import React, { useEffect, useState } from "react";
import './userContainer.css';
import axios from "axios";
const UserContainer = (props) => {
    const URL = process.env.REACT_APP_WEB_URL;
    const [isApproved, setIsApproved] = useState(false);
    const [status,setStatus] = useState('Requested');
    
    const  handleApprove = async () =>{
        try{
            
            const res = await axios.post(`${URL}/properties/${props.userId}/${props.propId}/approve`,null, {
                withCredentials: true,
            }
            );
            if (res.status === 200) {
                setStatus("Approved")
                }
            console.log(res);
            
        }
        catch(e){
            console.log(e);
        }
    }
    const  handleReject = async () =>{
        try{
            
            const res = await axios.post(`${URL}/properties/${props.userId}/${props.propId}/reject`,null, {
                withCredentials: true,
            }
            );
            if (res.status === 200) {
                setStatus("Rejected")
                }
            console.log(res);
            
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        const checkStatus = async () => {


            try {
                //ADD user parameter as well
                const res = await axios.get(`${URL}/request/${props.userId}/${props.propId}/status`);
                console.log(res.data);
                
                setStatus(res.data);
                
            }
            catch (e) {
                // setIsLoggedIn(false);
            }
        }
        checkStatus();
    });
    return (
        <div class="card border-info mb-3" style={{ maxWidth: '18rem' }}>
            <div class="card-header">{props.name}</div>
            <div class="card-body">
                <h5 class="card-title">Email: {props.email}</h5>

            </div>
            <div class="card-footer bg-transparent border-info ">
                {status === 'Requested'?(
                    <>
                    <span style={{ margin: '10px' }}>
                    <button onClick={handleApprove} class="btn btn-outline-success gap 10" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >Approve</button>
                </span>
                <span>
                    <button class="btn btn-outline-success gap 10" type="submit" onClick={handleReject}>Reject</button>
                </span>
                </>
                ):(
                    
                    <button class="btn btn-outline-success" type="submit" >{status}</button>
                
                )}
                
            </div>
            
        </div>
    );

}

export default UserContainer;