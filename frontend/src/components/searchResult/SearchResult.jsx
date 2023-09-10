import React from "react";
import './searchResult.css'
import { useNavigate } from "react-router-dom";
import { faMoneyBill1Wave,faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const SearchResult = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/properties/${props.id}`)
    }
    return (
        <div className="detailsContainer" onClick={handleClick}>
            <div className="imageContainer">
                <img src={props.src}
                    className="srImg" />
            </div>
            <hr />
            <div className="srInfo">
                <h4>{props.name}</h4>
            
                
                <div className="type-price">
                <p>{props.type}</p>
                
                <div className="dateContainer">
                    <span><FontAwesomeIcon className="icon" icon={faMoneyBill1Wave} /></span>
                    <span><p>£{props.price}</p></span>

                </div>
                
                </div>
               
                <div className="result-date">
                    <span className="ml-3"><FontAwesomeIcon className="icon" icon={faCalendar} /></span>
                    <p>Move in date: {props.date} </p>
                </div>
            </div>
        </div>
    );


}
export default SearchResult;