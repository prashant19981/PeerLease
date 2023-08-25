import React from "react";
import './searchResult.css'
import { useNavigate } from "react-router-dom";
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import useSearch from "../../hooks/useSearch";
const SearchResult = (props) => {
    // const [result, loading, error, refetch] = useSearch()
    const navigate = useNavigate();
    const handleClick = () => {
        // console.log(props.id);
        navigate(`/properties/${props.id}`)
        // alert(props.id);
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
                    <span className="ml-3"><FontAwesomeIcon className="icon" icon={faMoneyBill1Wave} /></span>
                    <p>Move in date: {props.date} </p>
                </div>
            </div>
        </div>
    );


}
export default SearchResult;