import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCity,faBuildingColumns,faBed } from '@fortawesome/free-solid-svg-icons';
import "./search.css"
import { useNavigate } from "react-router-dom";
import { SearchPageContext } from "../../context/SearchPageContext";
function Search() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    city: '',
    university: '',
    room: ''
  })

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues(prevData => {
      return {
        ...prevData,
        [name]: value
      }

    });

  }

  function clickSearch() {
    dispatch({type:"NEW",payload:{university:formValues.university,city:formValues.city,roomType:formValues.room}});
    navigate("/properties",{state:{university:formValues.university,city:formValues.city,roomType:formValues.room}})

  }
  const {dispatch} = useContext(SearchPageContext)
  return (
      
      <div className="search-bar"> 
        <div className="search-item">
          <FontAwesomeIcon icon={faCity} className="search-icon"/>
          <input
            type='text'
            name='city'
            value={formValues.city}
            placeholder='Select City'
            onChange={handleChange}>

          </input>
        </div>
        <div className="search-item">
          <FontAwesomeIcon icon={faBuildingColumns} className="search-icon"/>
          <input
            type='text'
            name='university'
            value={formValues.university}
            placeholder='Select University'
            onChange={handleChange}
          >

          </input>
        </div>
        <div className="search-item">
        <FontAwesomeIcon icon={faBed} className="search-icon"/>
          <input
            type='text'
            name='room'
            value={formValues.room}
            placeholder='Select Room type'
            onChange={handleChange}>

          </input>
        </div>
        <div className="search-item">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={clickSearch}
        >Search
        </button>
        </div>
        
        </div>
       
     
  )

}
export default Search;