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
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAdvancedTab,setShowAdvancedTab] = useState(false);
  const [arrowSymbol,setArrowSymbol] = useState("↓");
  const { city, university, date,minPrice,maxPrice,bills,gurantor } = useContext(SearchPageContext);
  console.log(bills);
  const [formValues, setFormValues] = useState({
    city: city,
    university: university,
    date: date,
    minPrice:minPrice,
    maxPrice:maxPrice,
    bills:bills,
    gurantor:gurantor 
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
    console.log(formValues);
  }
  const clickAdvanced = () =>{
    if(!showAdvancedTab){
      setShowAdvancedTab(true);
      setArrowSymbol("↑");
    }
    else{
      setShowAdvancedTab(false);
      setArrowSymbol("↓")
    }
    
  }
  function clickSearch() {
    console.log(formValues);
    dispatch({ type: "NEW", payload: { university: formValues.university, 
      city: formValues.city, 
      date: formValues.date, 
      minPrice:formValues.minPrice,
      maxPrice:formValues.maxPrice,
      bills:formValues.bills,
      gurantor:formValues.gurantor  } });
    navigate("/properties", { state: { university: formValues.university, 
      city: formValues.city, 
      date: formValues.date,
      minPrice:formValues.minPrice,
      maxPrice:formValues.maxPrice,
      bills:formValues.bills,
      gurantor:formValues.gurantor  } })

  }

  return (
<>
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
          onClick={() => setShowCalendar(!showCalendar)}
          type='text'
          name="date"
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

              setFormValues(prevFormDate => {
                const startDateForamatted = item.selection.startDate.toLocaleDateString('en-GB');
                const endDateFormatted = item.selection.endDate.toLocaleDateString('en-GB');
                if (startDateForamatted != endDateFormatted) {
                  setShowCalendar(false);
                }
                return {
                  ...prevFormDate,
                  date: startDateForamatted + '-' + endDateFormatted

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
      
      <div className="d-flex justify-content-center mt-3">
                <button class="btn btn-outline-success mb-4" type="submit" onClick={clickAdvanced}>Advanced Search <span>{arrowSymbol}</span></button>
            </div>
      {showAdvancedTab &&       
      <div className="advanceSearch">
      <form className="d-flex flex-row align-items-center">
        <div class="input-group">
          <span class="input-group-text">Min and Max Price</span>
          <input value={formValues.minPrice} onChange={handleChange} name="minPrice" type="text" aria-label="First name" class="form-control" />
          <input value={formValues.maxPrice} onChange={handleChange} name="maxPrice" type="text" aria-label="Last name" class="form-control" />
        </div>
        <div class="input-group">
          <span class="input-group-text ms-3">Bills</span>
          <select name="bills" value={formValues.bills} onChange={handleChange} class="form-select form-select-md align-self-center" aria-label="Small select example">
            <option selected>Bills Included?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>

          </select>

        </div>
        <div class="input-group">
          <span class="input-group-text ms-3">Gurantor</span>
          <select name="gurantor" value={formValues.gurantor} onChange={handleChange} class="form-select form-select-md align-self-center" aria-label="Small select example">
            <option selected>Gurantor Required?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>

          </select>

        </div>
        

      </form>
      </div>
      

    }
      </>
  )

}
export default Search;