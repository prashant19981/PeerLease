import React, { useState } from "react";
import './propertyContainer.css';
import axios from "axios";
import UserContainer from "../userContainer/UserContainer";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const PropertyContainer = (props) => {
    const [requested, setRequested] = useState(false);
    const [users, setUsers] = useState([]);
    const [viewButtonText, setViewButtonText] = useState("View Interests")
    const handleRequest = async () => {
        setRequested(!requested);
        if (requested) {
            setViewButtonText("View Interests")
        }
        else {
            setViewButtonText("Hide Interests")
        }
        try {


            const res = await axios.get(`http://localhost:3000/properties/${props.prop}/requests`);
            setUsers(res.data);

        }
        catch (e) {
            console.log(e);
        }

    }
    return (
        <div>


            <div className="mypropertyContainer">
                <div className="propertyimageContainer">
                    <img src="https://www.studentcastle.co.uk/media/2397/atkinson-twin-2.png?anchor=middlecenter&mode=crop&quality=75&format=png&scale=both&width=1200&height=750"
                        className="srImg" />
                </div>

                <div className="propertyInfo">
                    <h4 className="mt-3 mb-3">Name: {props.name}</h4>
                    <p>University: {props.uni}</p>
                    <button class="btn btn-outline-success mb-3" type="submit" onClick={handleRequest}>
                        {viewButtonText}
                    </button>
                </div>
                <div className="crudOptions">
                <div className="space"></div>
                <FontAwesomeIcon className="icon mt-3" icon={faPenToSquare} size="xl"/>
                <div className="space"></div>
                <FontAwesomeIcon className="icon mt-3 ml-3" icon={faTrashCan} size="xl"/>
                </div>
            </div>
            {requested ? (
                <>
                    {users.map((value) => {

                        return (
                            !value.isApproved && (
                                <UserContainer key={value._id} userId ={value._id} propId={props.prop} name={value.name}
                                    email={value.email}

                                ></UserContainer>
                            )
                        )
                    })}
                </>
            ) : (
                <>
                </>
            )}


        </div>

    );

}
export default PropertyContainer