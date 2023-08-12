import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SearchResult from "../../components/searchResult/SearchResult";
import Header from "../../components/header/Header";
import './properties.css'
import useSearch from "../../hooks/useSearch";
const Properties = () => {
    const {result,loading,error,refetch} = useSearch('http://localhost:3000/properties/search?city=London');
    const handleClick = () =>{
        alert("Component clicked")
    }
    if(loading){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        );
    }
    if(error){

    }
    console.log(result)
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="resultContainer">
                <>
                
                    {result.map((value)=> {
                        return <SearchResult key={value._id} name={value.name} type = {value.type} id = {value._id}
                        src = {value.imageURL[0]}/>
                    })}
                </>
                
               
            </div>


        </div>
    )

}

export default Properties;