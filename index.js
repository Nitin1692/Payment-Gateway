const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const app = express()
const instamojo = require('instamojo-nodejs')



const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const AUTH_KEY = process.env.AUTH_KEY
app.use(express.json())
app.use(express.urlencoded({extended: false}))

instamojo.setKeys(API_KEY, AUTH_KEY)
instamojo.isSandboxMode(true)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/pay', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var amount = req.body.amount;
    console.log(name)
    console.log(email)
    console.log(amount)
    var data = new instamojo.PaymentData();
    const REDIRECT_URL = "http://localhost:4500/success"
    data.setRedirectUrl(REDIRECT_URL)
    data.send_email = true
    data.purpose = "Test"
    data.name = name
    data.email = email
    data.amount = amount
    instamojo.createPayment(data, function(error, response) {
        if (error) {
          // some error
        } else {
            console.log(response);
            res.send("Please check your email to make payment")
        }
    });
})

app.get('/success', (req,res) => {
    res.send("Payment was successfull please your email to find invoice in pdf form")
})

app.listen(PORT, () => {
    console.log("Listening on Port:", PORT)
})