const express = require('express');
const roomRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Room = require('./room.model');
// Define a route for adding a new customer
roomRoutes.route('/roomAdd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let room = new Room(req.body);
     // Save the new customer to the database
     room.save()
        .then(room => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'room' : 'new room is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all customers
roomRoutes.route('/roomGetAll').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Room.find(function(err, room) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(room);
        }
    });
});

// guideRoutes.route('/:id').get(function (req, res){
//     let campusid = req.params.id;
//     console.log("yuor campus id is " +campusid);
//     Student.findOne({$and:[{campusid : campusid}]},function (err,std){
//         if(err)
//             console.log(err);
//         else{
//             res.json(std)
//         }
//     });

// });




roomRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Room.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
roomRoutes.route('/roomUpdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Room.findById(id, function (err, room){
        if(!room)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            room.rId = req.body.rId;
            room.rType = req.body.rType;
            room.bType = req.body.bType;
            room.capacity = req.body.capacity;
       // Save the updated room to the database
            room.save().then(business => {
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
roomRoutes.route('/roomDelete/:id').delete(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'Customer' model to delete a customer by ID
    Room.findByIdAndRemove({_id:req.params.id}, function (err, guide){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the customer is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});






module.exports = roomRoutes;