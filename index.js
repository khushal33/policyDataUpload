const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
const { connect } = require('mongoose');

global.env  = process.env.NODE_ENV
const {dataBase: { dbConnectionString }} = require('./config').config[env]
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

/**Routes  */
const userRouter = require('./router/users')
const accountRouter = require('./router/account')
const policyRouter = require('./router/policy')

app.use('/api/users',userRouter)
app.use('/api/account',accountRouter)
app.use('/api/policy',policyRouter)

//
const startServer = async () =>{

    /** Node server  */
    let PORT = process.env.PORT
    if(env == 'LOCAL'){
        app.listen(PORT,async ()=>{
            console.log("Server is running on port ",PORT)
        })
    }

    /** Mongo server */
    await connect(
        dbConnectionString,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
    ).then(() => console.log('MongoDB connection established.'))
}


startServer()

module.exports = app;