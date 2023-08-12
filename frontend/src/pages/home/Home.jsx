import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import Search from "../../components/search/Search.jsx"
import Navbar from '../../components/navbar/Navbar.jsx';
import Header from '../../components/header/Header.jsx'
const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <Search></Search>
        </div>)
}
export default Home;