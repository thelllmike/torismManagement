const express = require('express');
const vehicleRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Vehicle = require('./vehicle.model');
// Define a route for adding a new customer
vehicleRoutes.route('/vehicleAdd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let vehicle = new Vehicle(req.body);
     // Save the new customer to the database
     vehicle.save()
        .then(vehicle => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'vehicle' : 'new vehicle is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all customers
vehicleRoutes.route('/vehicleGetAll').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Vehicle.find(function(err, vehicle) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(vehicle);
        }
    });
});





vehicleRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Vehicle.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
vehicleRoutes.route('/vehicleUpdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Vehicle.findById(id, function (err, vehicle){
        if(!vehicle)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            vehicle.vName = req.body.vName;
            vehicle.vType = req.body.vType;
            vehicle.vprice = req.body.vprice;
            vehicle.image = req.body.image;
            vehicle.description = req.body.description;
            vehicle.cNumber = req.body.cNumber;
       // Save the updated vehicle to the database
            vehicle.save().then(business => {
                // If the customer was updated successfully, return a success message
                res.json('Update Complete');
            })
                .catch(err =>{
                    // If there was an error updating the customer, return an error message
                    res.status(400).send("Unable to update data");
                });
        }
    });
});

// Define a DELETE route at '/delete/:id'
vehicleRoutes.route('/vehicleDelete/:id').delete(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'Customer' model to delete a customer by ID
    Vehicle.findByIdAndRemove({_id:req.params.id}, function (err, guide){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the customer is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});

module.exports = vehicleRoutes;