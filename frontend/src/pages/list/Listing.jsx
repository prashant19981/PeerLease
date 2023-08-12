import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import './listing.css'
import axios from 'axios';
const Listing = () => {
    const [uploadedFile, setUploadedFile] = useState([]);
    const[imagePreviews, setImagePreviews] = useState([]);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setUploadedFile(filesArray);

        const imagePreviewsArray = [];
        uploadedFile.forEach((image) => {
            const reader = new FileReader();
            reader.onload = () => {
                imagePreviewsArray.push(reader.result);
                setImagePreviews(imagePreviewsArray);
            };
            reader.readAsDataURL(image);
        });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const formData =  new FormData();

        for (const file of uploadedFile){
            formData.append('imageURL',file);
        }
        formData.append('name',event.target.name.value)
        formData.append('type',event.target.type.value)
        formData.append('city',event.target.city.value)
        formData.append('university',event.target.university.value)
        // for( const entry of formData.entries()){
        //     console.log(entry[0], entry[1]);
        // }
        try{
            const res =  await axios.post("http://localhost:3000/properties/",formData);
            console.log(res);
        }
        catch(e){
            console.log(e)
        }
    }    
    
 
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="formContainer">
                <h1>Please add the property details below</h1>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="formData">
                            <label htmlFor="propertyName" className="label-single-line">Property Name:</label>
                            <input className="form-control"
                                type='text'
                                name='name'
                                placeholder='Enter property name'
                                id="propertyName"
                            >

                            </input>

                        </div>

                        <div className="formData">
                            <label htmlFor="propertyAddress" className="label-single-line">Property Type:</label>
                            <input className="form-control"
                                type='text area'
                                name='type'
                                placeholder='Enter property name'
                                id="propertyName"
                            >

                            </input>

                        </div>
                        <div className="formData">
                            <label htmlFor="propertyAddress" className="label-single-line">Enter City:</label>
                            <input className="form-control"
                                type='text area'
                                name='city'
                                placeholder='Enter property name'
                                id="propertyName"
                            >

                            </input>

                        </div>
                        <div className="formData">
                            <label htmlFor="propertyAddress" className="label-single-line">Enter Univeresity</label>
                            <input className="form-control"
                                type='text area'
                                name='university'
                                placeholder='Enter property name'
                                id="propertyName"
                            >

                            </input>

                        </div>
                        <div className="formData">
                            <label htmlFor="propertyAddress" className="label-single-line">Property Images:</label>
                            <input className="form-control"
                                type='File'
                                name='images'
                                multiple
                                placeholder='Enter property name'
                                id="propertyName"
                                onChange={handleFileUpload}
                            >

                            </input>

                        </div>
                       
                        <div className="buttonContainer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
export default Listing;