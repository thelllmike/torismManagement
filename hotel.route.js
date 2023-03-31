const express = require('express');
const hotelRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Hotel = require('./hotel.model');
// Define a route for adding a new customer
hotelRoutes.route('/hotelAdd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let hotel = new Hotel(req.body);
     // Save the new customer to the database
     hotel.save()
        .then(hotel => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'hotel' : 'new hotel is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

//get all details
// Define a route for getting all customers
hotelRoutes.route('/hotelGetAll').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Hotel.find(function(err, hotel) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(hotel);
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




hotelRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Hotel.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
hotelRoutes.route('/hotelUpdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Hotel.findById(id, function (err, hotel){
        if(!hotel)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            hotel.hName = req.body.hName;
            hotel.address = req.body.address;
            hotel.pNumber = req.body.pNumber;
            hotel.email = req.body.email;
            hotel.password = req.body.password;
            hotel.cPassword = req.body.cPassword;
       // Save the updated hotel to the database
            hotel.save().then(business => {
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
hotelRoutes.route('/hotelDelete/:id').delete(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'Customer' model to delete a customer by ID
    Hotel.findByIdAndRemove({_id:req.params.id}, function (err, guide){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the customer is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});


 hotelRoutes.route('/:id').get(function (req, res){
     let email = req.params.id;
    
     Hotel.findOne({email : email},function (err,std){
        if(err)
             console.log(err);
       else{
             res.json(std)
       }
    });

});



// hotelRoutes.route('/:id').get(function (req, res){
//     let email = req.params.id;
    
//     Hotel.findOne({email : email}, function (err, hotel){
//         if(err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             if(hotel) {
//                 res.json(hotel);
//             } else {
//                 res.status(404).json({ error: 'Hotel not found' });
//             }
//         }
//     });
// });


hotelRoutes.route('/login').post(function (req, res){
    let email = req.body.email;
    let password = req.body.password;

    let hotel = new Hotel(req.body);

    Hotel.findOne({$and:[{email : email},{password : password}]})
        .then(hotel => {
            if(hotel){
                hotel.name = req.body.name;
                res.status(200).send({
                    message: "Successful Login"
                });
            }
            else{
                res.status(200).send({
                    message: "User Not Found"
                });
            }
        })
});

module.exports = hotelRoutes;