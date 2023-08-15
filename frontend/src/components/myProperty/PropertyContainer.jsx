import React, { useState } from "react";
import './propertyContainer.css';
import axios from "axios";
import UserContainer from "../userContainer/UserContainer";
const PropertyContainer = (props) =>{
    const[requested,setRequested] = useState(false);
    const[users,setUsers] = useState([]);
    const[viewButtonText,setViewButtonText] = useState("View Interests")
const handleRequest = async () =>{
    setRequested(!requested);
    if(requested){
        setViewButtonText("View Interests")
    }
    else{
        setViewButtonText("Hide Interests")
    }
    try{

    
    const res = await axios.get(`http://localhost:3000/properties/${props.prop}/requests`);
    setUsers(res.data);
    
    }
    catch (e){
        console.log(e);
    }
    
}
return(
    <div>

    
        <div className="mypropertyContainer">
            <div className="propertyimageContainer">
                <img src="https://www.studentcastle.co.uk/media/2397/atkinson-twin-2.png?anchor=middlecenter&mode=crop&quality=75&format=png&scale=both&width=1200&height=750"
                    className="srImg" />
            </div>

            <div className="propertyInfo">
                <h4>{props.name}</h4>
                <h4>{props.type}</h4>
                <h4>{props.uni}</h4>
                <button class="btn btn-outline-success" type="submit" onClick={handleRequest}>
                    {viewButtonText}
                    </button>
                </div>
                </div>
                {requested ? (
                    <>
                    {users.map((value)=> {

                        return( <UserContainer name={value.name}
                            email={value.email}

                        ></UserContainer>)
                    })}
                    </>
                ):(
                    <>
                    </>
                )}
            
        
        </div>
  
);

}
export default PropertyContainer