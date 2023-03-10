const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))


app.use('/admin', adminRoutes)
app.use(shopRoutes)


// not found page
app.use('/', (req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
app.listen(3000)


