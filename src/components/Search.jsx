import React,{useState} from "react";

function Search(){
    const [formValues, setFormValues] = useState({
      city: '',
      university: '',
      room: ''
    })

    const clickSearch = () => {
      console.log("Search clicked")

    }
    return (
        <div>
          <form>
            <input type='text' name = 'city' value = {formValues.city} placeholder='Select City'></input>
            <input type='text' name ='university' value = {formValues.university} placeholder='Select University'></input>
            <input type='text' name = 'room' value = {formValues.room} placeholder='Select Room type'></input>
            <button 
              class="btn btn-primary" 
              type="submit"
              onClick={clickSearch}
              >Search
            </button>
          </form>
          
        </div>
    )

}
export default Search;