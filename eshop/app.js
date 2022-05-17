const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))
require('dotenv').config()


const api = process.env.API_URL
//Routes
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

//middlewares
app.use(`/${api}/products`, productsRoutes)
app.use(`/${api}/categories`, categoriesRoutes)
app.use(`/${api}/users`, usersRoutes)
app.use(`/${api}/orders`, ordersRoutes)


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'e-shop-database'
})
    .then(() => {
        console.log('database connection is ready')
    }).catch(err => console.log(err))

app.listen(3000, () => {
    console.log('server is running at port 3000')
})