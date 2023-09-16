import React from "react"
import 'bootstrap/dist/css/bootstrap.css'; // // Referenced from Bootstrap documentation. Found at: https://getbootstrap.com/docs/5.3/getting-started/introduction/ 
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