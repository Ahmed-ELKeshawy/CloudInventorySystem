const dotenv = require("dotenv").config({path: './config/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./routes/userRoute")
const productsRoute = require("./routes/productsRoute")
const PORT = process.env.PORT 
const intiateDBConnection = require('./config/db');
const errorHandler = require("./middleWare/errorMiddleware")
const cron = require('node-cron');
const checkInventoryAndGenerateAlerts = require('./scripts/Alerts');


//middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
cron.schedule('0 0 * * *', checkInventoryAndGenerateAlerts);
app.use(cors());

//routes middleware
app.use("/api/users",userRoute)
app.use("/api/products",productsRoute)


//routes
app.get('/', (req, res)=>{
    res.send('Home Page')
})

//error handleing
app.use(errorHandler);

//starts server
app.listen(PORT, async () => {
    console.log('Now listening on port ', PORT);

    await intiateDBConnection();
});
