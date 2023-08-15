import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SearchResult from "../../components/searchResult/SearchResult";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import './properties.css'
import useSearch from "../../hooks/useSearch";
import { useContext } from "react";
import { SearchPageContext } from "../../context/SearchPageContext";
const Properties = () => {
    const {uni,city,type} = useContext(SearchPageContext);
    const { result, loading, error, refetch } = useSearch(`http://localhost:3000/properties/search?city=${city}`);
    
    
    // const {city} = location.state.formValues;
    console.log(city);
    const handleClick = () => {
        alert("Component clicked")
    }
    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
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

            {result.length !=0 ? (
                <div className="resultContainer">
                    <>
                        
                        {result.map((value) => {
                            return <SearchResult key={value._id} name={value.name} type={value.type} id={value._id}
                                src={value.imageURL[0]} />
                            
                        })}
                    </>


                </div>
                ):(
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