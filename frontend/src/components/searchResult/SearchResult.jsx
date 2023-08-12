import React from "react";
import './searchResult.css'
import { useNavigate } from "react-router-dom";
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

            <div className="srInfo">
                <h1>{props.name}</h1>
                <h3>{props.type}</h3>
                <h3>Price</h3>

            </div>
        </div>
    );


}
export default SearchResult;