const express = require('express');
const app = express();
const path = require('path');
const redis = require('redis');
let favicon = require('serve-favicon');
let bodyparser = require('body-parser');
let expressSession = require('express-session');
let index = require('./routes/index');



app.set("view engine","ejs");
app.set(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'/public')));



app.use(expressSession({
    secret:"A keyboard cat",
    saveUninitialized:false,
    resave:true
}));

app.use('/',index);

app.use((req,res)=>{
    res.status(404);
    res.render('error.ejs');
});

app.use((error,req,res,next)=>{
    res.status(500);
    res.send('Internal server error');
})

const port = 3000;


app.listen(port,()=>{
    console.log(`Server Started on port ${port}`); 
});

