const express = require('express')
const cors = require('cors');
const { myServer } = require('./configs/db');
const { userRoutes } = require('./routes/User.routes');
 
require('dotenv').config()


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)




app.listen(PORT, async ()=> {
    try {
        await myServer;
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
    }
console.log(`server started at` +' '+PORT);
})