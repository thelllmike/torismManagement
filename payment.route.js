const express = require('express');
const paymentRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Payment = require('./payment.model');
// Define a route for adding a new customer
paymentRoutes.route('/paymentAdd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let payment = new Payment(req.body);
     // Save the new customer to the database
     payment.save()
        .then(guide => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'payment' : 'new guide is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all payment
paymentRoutes.route('/paymentGetAll').get(function(req, res) {
    // Find all documents in the 'payment' collection
    Payment.find(function(err, guide) {
        if (err) {
            // If there was an error finding payment, log the error to the console
            console.log(err);
            // If payment were found successfully, return them as a JSON response
        } else {
            res.json(guide);
        }
    });
});





paymentRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Payment.findById(id, function (err,payment){
        res.json(payment);
    });
});
// Define a route for updating a Guide with a given id
paymentRoutes.route('/paymentUpdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the Guide with the given id in the database
    Payment.findById(id, function (err, payment){
        if(!payment)
         // If no payment was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the payment's fields with the new data from the request body
            payment.cName = req.body.cName;
            payment.bName = req.body.bName;
            payment.cNumber = req.body.cNumber;
            payment.exMonth = req.body.exMonth;
            payment.expYear = req.body.expYear;
            payment.cvv = req.body.cvv;
            payment.amount = req.body.amount;

             // Save the updated payment to the database
            payment.save().then(business => {
               
                res.json('Update Complete');
            })
                .catch(err =>{
                   
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

paymentRoutes.route('/paymentDelete/:id').delete(function(req,res){
   
    Payment.findByIdAndRemove({_id:req.params.id}, function (err, payment){
        
        if(err)res.json(err);
       
        else res.json('Successfully Removed');
    });
});


  


module.exports = paymentRoutes;