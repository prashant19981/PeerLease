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
            <hr />
            <div className="srInfo">
                <h4>{props.name}</h4>
            
                
                
                <h4>{props.type}</h4>
                <p>£21 pw</p>

            </div>
        </div>
    );


}
export default SearchResult;