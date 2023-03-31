const express = require('express');
const guideRoutes = express.Router();

// Require the 'register.model' module and assign it to the variable 'Customer'
let Guide = require('./guide.reg.model');
// Define a route for adding a new customer
guideRoutes.route('/guideAdd').post(function (req,res){
    // Create a new instance of the 'Customer' model with the data from the request body
    let guide = new Guide(req.body);
     // Save the new customer to the database
     guide.save()
        .then(guide => {
            // If the customer was saved successfully, return a success message
            res.status(200).json({'guide' : 'new guide is added successfull'});
        })
        .catch(err => {
             // If there was an error saving the customer, return an error message
            res.status(400).send("Unable to save database")
        });
});

// app.post("/uplodimage",async (req, res) => {
// const {base64} = req.body;
// try {
//     await Image.create({base64});
//     res.send({Status: "Success"});
// } catch (error) {
//     res.send({Status: "Error",data :error});
// })

guideRoutes.route('/upload').post(async (req, res) => {
    try {
        const {base64} = req.body;
        await Image.create({base64});
        res.status(200).json({'guide': 'new guide is added successfully'});
    } catch (error) {
        res.status(400).send('Unable to save to database');
    }
});


//get all details
// Define a route for getting all customers
guideRoutes.route('/guideGetAll').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    Guide.find(function(err, guide) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(guide);
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




guideRoutes.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    Guide.findById(id, function (err,register){
        res.json(register);
    });
});
// Define a route for updating a customer with a given id
guideRoutes.route('/guideUpdate/:id').post(function (req,res){
    // Get the id parameter from the request URL
    let id = req.params.id;
    // Find the customer with the given id in the database
    Guide.findById(id, function (err, guide){
        if(!guide)
         // If no guide was found with the given id, return a 404 error
            res.status(404).send("Data is not found??");
        else{
             // Update the guide's fields with the new data from the request body
            guide.firstName = req.body.firstName;
            guide.lastName = req.body.lastName;
            guide.email = req.body.email;
            guide.countryCode = req.body.countryCode;
            guide.phoneNu = req.body.phoneNu;
            guide.nic = req.body.nic;
            guide.address = req.body.address;
            guide.nationality = req.body.nationality;
            guide.country = req.body.country;
            guide.password = req.body.password;
            guide.cpassword = req.body.cpassword;

             // Save the updated guide to the database
            guide.save().then(business => {
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
guideRoutes.route('/guideDelete/:id').delete(function(req,res){
    // Use the 'findByIdAndRemove' method of the 'Customer' model to delete a customer by ID
    Guide.findByIdAndRemove({_id:req.params.id}, function (err, guide){
         // If there is an error, respond with the error message in JSON format
        if(err)res.json(err);
        // If the customer is successfully deleted, respond with a success message in JSON format
        else res.json('Successfully Removed');
    });
});




// Define a POST route at '/login'
guideRoutes.route('/login').post(function (req, res) {
    // Retrieve NIC and password from the request body
    let nic = req.body.nic;
    let password = req.body.password;
    // Log the login details for debugging purposes
    console.log("Your Login Details " + nic + " " + password);
    // Use the 'findOne' method of the 'Customer' model to find a customer with the specified NIC and password
    Customer.findOne({ nic: nic, password: password }, function (err, customer) {
        // If there is an error, respond with a 500 Internal Server Error message
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            // If no customer is found with the specified NIC and password, respond with a 401 Unauthorized message
        } else if (!customer) {
            res.status(401).send("Invalid Credentials");
            // If a customer is found with the specified NIC and password, respond with a 200 OK message and the customer object in JSON format
        } else {
            res.status(200).send({
                message: "Successful Login",
                customer: customer
            });
        }
    });
});


module.exports = guideRoutes;