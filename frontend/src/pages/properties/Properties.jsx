import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SearchResult from "../../components/searchResult/SearchResult";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import './properties.css'
import useSearch from "../../hooks/useSearch";
import { useContext } from "react";
import { SearchPageContext } from "../../context/SearchPageContext";
const Properties = () => {
    const { university, city, date } = useContext(SearchPageContext);
    console.log(university);
    const searchQuery = `http://localhost:3000/properties/search?city=${city}&university=${university}&date=${date}`;
    const { result, loading, error, refetch } = useSearch(searchQuery);
    const [showAdvancedTab, setShowAdvancedTab] = useState(false);
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const[reqGurantor,setReqGurantor] =useState(undefined);
    const[bills,setBills] = useState(undefined);
    // const {city} = location.state.formValues;
    console.log(city);
    const handleClick = () => {
        alert("Component clicked")
    }
    if (loading) {
        return (
            <div>
                <Navbar></Navbar>
                <Header></Header>
                {/* <h1>Loading...</h1> */}
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {

    }
    console.log(result)
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="searchContainer">
                <Search></Search>

            </div>
            {/* <div className="d-flex justify-content-center">
                <button class="btn btn-outline-success mb-4" type="submit" >Advanced Search <span>&#x2193;</span></button>
            </div>
            <div className="advanceSearch">
                <form className="d-flex flex-row align-items-center">
                    <div class="input-group">
                        <span class="input-group-text">Min and Max Price</span>
                        <input name="minPrice" type="text" aria-label="First name" class="form-control" />
                        <input name="maxPrice" type="text" aria-label="Last name" class="form-control" />
                    </div>
                    <div class="input-group">
                    <span class="input-group-text ms-3">Bills</span>
                    <select class="form-select form-select-md align-self-center" aria-label="Small select example">
                        <option selected>Bills Included?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        
                    </select>

                    </div>
                    <div class="input-group">
                    <span class="input-group-text ms-3">Gurantor</span>
                    <select class="form-select form-select-md align-self-center" aria-label="Small select example">
                        <option selected>Gurantor Required?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        
                    </select>

                    </div>
                    
                </form>
            </div> */}


            <hr />
            <div className="parentContainer">

                {result.length != 0 ? (
                    <div className="resultContainer">
                        <>

                            {result.map((value) => {
                                return <SearchResult key={value._id} name={value.name} type={value.type} id={value._id}
                                    src={value.imageURL[0]} 
                                    date = {value.date.split("-")[0]}
                                    price = {value.price}/>

                            })}
                        </>


                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-center">
                            <h4>No search results found.</h4>
                        </div>
                    </>

                )}
            </div>

        </div>
    )

}

export default Properties;