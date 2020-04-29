const cors = require('cors');
const express = require('express');

// TODO: all a stripe key
const stripe = require('stripe')("sk_test_pMnsLUnEaVRaaG0Cs0TTntRJ00WXVzaOyJ") //secret key
const uuid = require("uuid/v4")

const app = express();

//middlewares
app.use(express.json())
app.use(cors())

//route
app.get("/", (req,res) => {
    res.send("It works here")
})

app.post("/payment", (req,res) => {

    const {product, token} = req.body;
    console.log("Product : ", product);
    console.log("Product price: ", product.price);
    
    //unique key for each order
    const idempotencKey = uuid();

    //stripe object 
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipey_email: token.email,
            description: `Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listening
app.listen(8282, () => console.log("Listening at 8282"))
