const express = require('express')

const initModels = require('./models/initModels')
const db = require('./utils/database')
const app = express()
const config = require('./config')
const productsRouter = require('./products/products.routers')

db.authenticate()
   .then(() => console.log('BD authentixation succesfull'))
   .catch((err) => console.log(err))

db.sync()
   .then(() => console.log('DataBase synced'))
   .catch((err) => console.log(err))

initModels()

app.use(express.json())

app.get('/', (req, res) => {
   res.status(200).json({message: 'OK!'})
})

app.use('/products', productsRouter)

app.listen(config.port, () =>{
   console.log(`server started at port ${config.port}`)
})