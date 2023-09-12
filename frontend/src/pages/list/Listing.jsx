import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import './listing.css'
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useNavigate } from "react-router-dom";
const Listing = () => {
    const navigate = useNavigate();
    
    const [uploadedFile, setUploadedFile] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showCalender, setShowCalender] = useState(false);
    const [dateRangeField, setDateRangeField] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    ]);
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
    const handleSubmit = async (event) => {
        setLoadingAnimation(true); 
        event.preventDefault();
        const formData = new FormData();
        
        for (const file of uploadedFile) {
            formData.append('imageURL', file);
        }
       
        formData.append('name', event.target.name.value)
        formData.append('type', event.target.type.value)
        formData.append('city', event.target.city.value)
        formData.append('university', event.target.university.value)
        formData.append('address',event.target.address.value)
        formData.append('desc', event.target.desc.value)
        formData.append('grocery', event.target.grocery.value)
        formData.append('bills',event.target.bills.value )
        formData.append('price',event.target.price.value )
        formData.append('amenities', event.target.amenities.value)
        formData.append('beds', event.target.beds.value)
        formData.append('baths', event.target.baths.value)
        formData.append('date', event.target.date.value)
        formData.append('gurantor', event.target.gurantor.value)
        formData.append('deposit', event.target.deposit.value)
        
        try {
            const res = await axios.post("http://localhost:3000/properties/", formData,{
                withCredentials:true
            })
            
            console.log(res);
            if(res.status === 200){
                setLoadingAnimation(false);
                navigate("/success",{state:{message:"listed"}});
            }
        }
        catch (e) {
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
                        
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Property Name:</label>
                            <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name'/>
                            <div id="emailHelp" class="form-text">Please enter the property name.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Deposit Amount</label>
                            <input name='deposit'  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the deposit amount here.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter City</label>
                            <input name='city'  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the city name.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Bills Included?</label>
                            <select name="bills" class="form-select" aria-label="Default select example">
                                <option selected>select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Gurantor Required?</label>
                            <select name="gurantor" class="form-select" aria-label="Default select example">
                                <option selected>select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>

                            </select>
                        </div>
                        <div class="mb-3 ca">
                            <label for="exampleInputEmail1" class="form-label">Move-in date</label>
                            <input autoComplete="off" name="date" onClick={() => setShowCalender(!showCalender)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={dateRangeField} />
                            <div id="emailHelp" class="form-text">Please enter the Move-In date and tenancy end date.</div>
                            {showCalender &&
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => {

                                        setDateRange([item.selection]);
                                        const startDateForamatted = item.selection.startDate.toLocaleDateString('en-GB');
                                        const endDateFormatted = item.selection.endDate.toLocaleDateString('en-GB');
                                        setDateRangeField(startDateForamatted + '-' + endDateFormatted);
                                        if(startDateForamatted!=endDateFormatted){
                                            setShowCalender(false);
                                        }
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                    className="dateRangeProp"

                                />
                            }
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Select property type</label>
                            <select name="type" class="form-select" aria-label="Default select example">
                                <option selected>select</option>
                                <option value="Single Room">Single Room</option>
                                <option value="Double Room">Double Room</option>
                                <option value="En-Suite">En-Suite</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Property address</label>
                            <input name="address"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the address of the property.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter University</label>
                            <input name="university"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the nearest university to the accomodation.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter number beds</label>
                            <input name="beds"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the total number of beds in the property.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter number of baths</label>
                            <input name="baths"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the total number of baths in the property.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">List top 5 amenities</label>
                            <input name="amenities"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter 5 amenities sperated by comma and no spaces</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Upload photos</label>
                            <input className="form-control"
                                type='File'
                                name='images'
                                multiple
                                placeholder='Enter property name'
                                id="propertyName"
                                onChange={handleFileUpload}
                            >

                            </input>
                            <div id="emailHelp" class="form-text">Please upload the pictures of the accomodation. MAX:1</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Weekly price (£)</label>
                            <input name="price"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter weekly price.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nearest Grocery</label>
                            <input name="grocery" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Please enter the distance to the nearest grocery store.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter short description of property</label>
                            <textarea name="desc" class="form-control" placeholder="Enter a short description here" id="floatingTextarea2" style={{height: '100px'}}></textarea>
                            
                        </div>
                        

                        <div className="buttonContainer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        {loadingAnimation && (
                            <div class="d-flex justify-content-center mb-4">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            </div>
                        )}
                        

                    </form>
                </div>

            </div>
        </div>
    )
}
export default Listing;