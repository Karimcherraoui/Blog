const express =  require('express');
const app = express() ;
const layout = require('express-ejs-layouts');
const router = require('./routes');



app.use(express.static("public"))
app.use(layout)

app.set('layout','./layout/home')
app.set('view engine','ejs');

app.use('/', router)



app.listen(3000,()=>{
    console.log('server started')
})