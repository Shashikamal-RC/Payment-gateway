import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "Facebook"
  })

  //this token is generated automatically , just we need to specify prop as token
  const makePayment = token => {
    const body= {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch('http://localhost:8282/payment', {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE : ", response)
      const {status} = response;
      console.log("STATUS : ", status)
    })
    .catch(err => console.log(err))

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
          stripeKey= "pk_test_HlUmtazrlje0CILNIEFMYSy600oSgIw5IB"
          token=  {makePayment}
          name= "By React"
          amount= {product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large blue">
            By React from {product.price}
          </button>
        </StripeCheckout>

      </header>
    </div>
  );
}

export default App;
