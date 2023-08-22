import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DateRange } from 'react-date-range';
import { faCity, faBuildingColumns, faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import "./search.css"
import { useNavigate } from "react-router-dom";
import { SearchPageContext } from "../../context/SearchPageContext";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
function Search() {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchPageContext)
  const [showCalendar,setShowCalendar] = useState(false);
  const {city, university, date} = useContext(SearchPageContext);
  console.log(university);
  const [formValues, setFormValues] = useState({
    city: city,
    university: university,
    date:date
  })
  const [dateRange, setDateRange] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }
  ]);

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
    console.log(formValues);
    dispatch({ type: "NEW", payload: { university: formValues.university, city: formValues.city, date: formValues.date } });
    navigate("/properties", { state: { university: formValues.university, city: formValues.city, date: formValues.date } })

  }
  
  return (

    <div className="search-bar">
      <div className="search-item">
        <FontAwesomeIcon icon={faCity} className="search-icon" />
        <input
          type='text'
          name='city'
          value={formValues.city}
          placeholder='Select City'
          onChange={handleChange}>

        </input>
      </div>
      <div className="search-item">
        <FontAwesomeIcon icon={faBuildingColumns} className="search-icon" />
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
        <FontAwesomeIcon icon={faCalendarDays} className="search-icon" />
        <input autoComplete="off"
        onClick={() =>setShowCalendar(!showCalendar)}
            type='text'
            name = "date"
            // value={formValues.room}
            value={formValues.date}
            placeholder='Select date range'
            onChange={handleChange}>

          </input>
          {showCalendar && 
         
          <DateRange
          editableDateInputs={true}
          onChange={item => {
            
            setDateRange([item.selection]);
            
            setFormValues(prevFormDate =>{
            const startDateForamatted = item.selection.startDate.toLocaleDateString('en-GB') ;
            const endDateFormatted = item.selection.endDate.toLocaleDateString('en-GB');
            if(startDateForamatted!=endDateFormatted){
              setShowCalendar(false);
            }
            return {
              ...prevFormDate,
              date: startDateForamatted+'-' + endDateFormatted
              
            }
            });
            
            // formValues.dateSelected = startDateForamatted + '-' + endDateFormatted;
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          className="dateRange"
          
        />
      }
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