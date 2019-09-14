const express = require('express');
let router = express.Router();
let api = require('car-registration-api-india');
let redis = require('redis');



async function get_data(req,res,next){

    try{

    
        let number = req.body.number.replace(/\s/g , '');
        await  api.CheckCarRegistrationIndia(number,'Dinchu',(data)=>{
            
                console.log('fetching data');
                req.session.data = data;
                console.log(data);
                let dataSerialize = JSON.stringify(data);
                client.setex(req.body.number,3600,dataSerialize);
                res.redirect('/');
        });
    }
    catch{
        res.send(404);
    }  
   


}

function check(req,res,next){
   
    let number = req.body.number.replace(/\s/g , '');
    // console.log(number);
    client.get(number,(err,data)=>{

        if(err){
            res.status(404);
        }

        if(data !== null){
           
            let x = JSON.parse(data);

            console.log("Yaha dekh bhai");
            console.log(x);
            req.session.data = x;
            res.redirect('/');
        }
        else{
            next();
        }
    })

}


router.get('/',(req,res)=>{
    
    res.render("index.ejs",({
        data : req.session.data
    }));
    req.session.number = null;
    req.session.data = null;
});




router.post('/submit',check,get_data);


const redis_port = 6379;

const client = redis.createClient(redis_port);


module.exports = router;