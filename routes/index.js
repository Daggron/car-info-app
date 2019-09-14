const express = require('express');
let router = express.Router();
let api = require('car-registration-api-india');


const data = () =>{

}

router.get('/',(req,res)=>{
    
    res.render("index.ejs",({
        data : req.session.data
    }));
    req.session.number = null;
    req.session.data = null;
});

router.post('/submit',(req,res)=>{
    api.CheckCarRegistrationIndia(req.body.number,'Daggron',(data)=>{
        console.log(data);
        req.session.data = data;
        res.redirect('/');
    });
})


module.exports = router;