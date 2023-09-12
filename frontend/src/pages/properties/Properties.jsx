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
    const { university, city, date,bills,gurantor } = useContext(SearchPageContext);
    const searchQuery = `http://localhost:3000/properties/search?city=${city}&university=${university}&date=${date}&bills=${bills}&gurantor=${gurantor}`;
    const { result, loading, error, refetch } = useSearch(searchQuery);
    
    // const {city} = location.state.formValues;
    console.log(city);
   
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