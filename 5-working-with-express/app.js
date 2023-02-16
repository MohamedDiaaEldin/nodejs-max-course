const express = require('express')
const bodyParser = require('body-parser')
// const bodyParser = require('./myParser')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.use('/add-product', (req, res, next)=>{    
    res.send('<body> <form method="POST" action="/product"> <input type="text" name="title"> <input type="number" name="price"> <button type="submit">Add</button> </form> </body>')
})

app.use('/product', (req, res, next)=>{    
    
    console.log(req.body)    
    res.redirect('/')    
})

app.use('/', (req, res, next)=>{
    console.log('root middleware')
    res.send('root middle')
})

app.listen(3000)


