import React,{useState} from "react";

function Search(){
    const [formValues, setFormValues] = useState({
      city: '',
      university: '',
      room: ''
    })

    function handleChange(event) {
      const{name,value} = event.target;
      setFormValues ( prevData =>{
        return {
          ...prevData,
          [name]: value
        }
        
      });
      
    }

    function clickSearch () {
      console.log("Search clicked")
      console.log(formValues)

    }
    return (
        <div>
          <form>
            <input 
              type='text' 
              name = 'city' 
              value = {formValues.city} 
              placeholder='Select City'
              onChange={handleChange}>
            
            </input>
            <input 
              type='text' 
              name ='university' 
              value = {formValues.university} 
              placeholder='Select University'
              onChange={handleChange}
            >

            </input>
            <input 
            type='text' 
            name = 'room' 
            value = {formValues.room} 
            placeholder='Select Room type'
            onChange={handleChange}>

            </input>
            <button 
              className="btn btn-primary" 
              type="submit"
              onClick={clickSearch}
              >Search
            </button>
          </form>
          
        </div>
    )

}
export default Search;