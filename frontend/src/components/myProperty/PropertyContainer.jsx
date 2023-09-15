import React, { useState } from "react";
import './propertyContainer.css';
import axios from "axios";
import UserContainer from "../userContainer/UserContainer";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
const PropertyContainer = (props) => {
    const URL = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const [requested, setRequested] = useState(false);
    const [users, setUsers] = useState([]);
    const [viewButtonText, setViewButtonText] = useState("View Interests")
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setModalText('Are you sure you want to delete this property?');
        setOpen(true);
        
    };
    const handleOk = async () => {
        
        setConfirmLoading(true);
        try{
            const res = await axios.post(`${URL}/${props.prop}/delete`,null,{
                withCredentials:true
            })
            setConfirmLoading(false);
            setOpen(false);
            window.location.reload();
        }
        catch(e){
            console.log(e);
        }
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }, 2000);
    };
    const handleEdit =() => {
        navigate(`/edit/${props.prop}`);
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleRequest = async () => {
        setRequested(!requested);
        if (requested) {
            setViewButtonText("View Interests")
        }
        else {
            setViewButtonText("Hide Interests")
        }
        try {


            const res = await axios.get(`${URL}/properties/${props.prop}/requests`);
            setUsers(res.data);

        }
        catch (e) {
            console.log(e);
        }

    }
    return (
        <div>
            <Modal
                title="Confirm Deletion"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Yes"
            >

                <p>{modalText}</p>
            </Modal>


            <div className="mypropertyContainer">
                <div className="propertyimageContainer">
                    <img src={props.src}
                        className="srImg" />
                </div>

                <div className="propertyInfo">
                    <h4 className="mt-3 mb-3">Name: {props.name}</h4>
                    <p>University: {props.uni}</p>
                    <button class="btn btn-outline-success mb-3" type="submit" onClick={handleRequest}>
                        {viewButtonText}
                    </button>
                </div>
                <div className="crudOptions">
                    <div className="crud-buttons">
                        <div className="space"></div>
                        <FontAwesomeIcon className="icon mt-3" icon={faPenToSquare} onClick={handleEdit} size="xl" />
                        <div className="space"></div>
                        <FontAwesomeIcon className="icon mt-3 ml-3" onClick={showModal} icon={faTrashCan} size="xl" />
                    </div>

                </div>
            </div>
            {requested ? (
                <>
                    {users.map((value) => {

                        return (
                            !value.isApproved && (
                                <UserContainer key={value._id} userId={value._id} propId={props.prop} name={value.name}
                                    email={value.email}

                                ></UserContainer>
                            )
                        )
                    })}
                </>
            ) : (
                <>
                </>
            )}


        </div>

    );

}
export default PropertyContainer