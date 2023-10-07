const express =  require('express');
const app = express() ;
const layout = require('express-ejs-layouts');
// const methodOverride = require('method-override');
const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const path = require("path")

app.use(express.static("public"))
app.use(layout)

app.set('layout','./layout/home')
app.set('view engine','ejs');

// app.use(methodOverride('_method'));
app.use('/', router)



app.listen(3000,()=>{
    console.log('server started')
})