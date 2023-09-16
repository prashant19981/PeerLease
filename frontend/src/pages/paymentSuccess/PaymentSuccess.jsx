import React from 'react';
import './paymentSuccess.css';
import { Button, Result } from 'antd'; //Referenced from Ant Design documentaiton. Found at: https://ant.design/docs/react/introduce
import { useNavigate } from "react-router-dom";


const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleHome = () =>{
        navigate("/");
    }
return(
  <Result
    status="success"
    title="Payment Successful!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button onClick={handleHome} type="primary" key="console">
        Go to Home
      </Button>,
    //   <Button key="buy">Buy Again</Button>,
    ]}
  />
)
};

export default PaymentSuccess;