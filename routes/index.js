const express = require('express');
let router = express.Router();
let api = require('car-registration-api-india');
let redis = require('redis');



async function get_data(req,res,next){

    try{

            
        await  api.CheckCarRegistrationIndia(req.body.number,'Madarchod',(data)=>{
                console.log('fetching data');
                req.session.data = data;
                console.log(data);
                let dataSerialize = JSON.stringify(data);
                client.setex(req.body.number,3600,dataSerialize);
                res.redirect('/');
        });
    }
    catch{
        res.status(404).redirect('/404');
    }


}

function check(req,res,next){
    client.get(req.body.number,(err,data)=>{

        if(err) throw err;

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

router.get('/404',(req,res)=>{
    res.render('error.ejs');
})

const redis_port = 6379;

const client = redis.createClient(redis_port);


module.exports = router;