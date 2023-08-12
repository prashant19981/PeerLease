import React from "react";
import './propertyContainer.css';
const PropertyContainer = () =>{

return(
    
        <div className="mypropertyContainer">
            <div className="propertyimageContainer">
                <img src="https://www.studentcastle.co.uk/media/2397/atkinson-twin-2.png?anchor=middlecenter&mode=crop&quality=75&format=png&scale=both&width=1200&height=750"
                    className="srImg" />
            </div>

            <div className="propertyInfo">
                <h1>Name</h1>
                <h3>Type</h3>
                <h3>Price</h3>

            </div>
        </div>
  
);

}
export default PropertyContainer