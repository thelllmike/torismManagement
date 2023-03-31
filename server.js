const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const PORT = 4000;
const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./DB.js');

const businessRoute = require('./register.route');
const guideRoute = require('./guide.reg.route');
const paymentRoute = require('./payment.route');
const hotelRoute = require('./hotel.route');
const vehicleRoute = require('./vehicle.route');
const roomRoute = require('./room.route');
const ayurvedicRoute = require('./ayurwedicReg.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true}).then(
    ()=> {console.log('Database is connected')},
        err =>{console.log('Can not connect database'+err)}
);

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/tourist',businessRoute);
app.use('/guide',guideRoute);
app.use('/payment',paymentRoute);
app.use('/hotel',hotelRoute);
app.use('/vehicle',vehicleRoute);
app.use('/room',roomRoute);
app.use('/ayurvedic',ayurvedicRoute);

app.listen(PORT, function(){
    console.log('Server is running on port: ',PORT);
});