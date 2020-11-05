//WHERE ALL OUR SERVER SIDE WILL RUN


if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config();
}



const stripeSecretKey= process.env.SRIPE_SECRET_KEY
const stripePublicKey= process.env.SRIPE_SECRET_KEY

// console.log(stripeSecretKey,stripePublicKey);

// import express
const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser')
const stripe = require('stripe')(stripeSecretKey);

//initialize express
const app = express();
 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json())

app.use( express.static('public'))
app.set('view engine' ,'ejs');



app.get('/store' , (req,res)=>{

    fs.readFile('items.json', function(error,data){
        if(error){
            res.status(500).end()
        }else{
            res.render('store.ejs',{
                stripePublicKey : stripePublicKey,
                items:JSON.parse(data)
            } )
        }
        //     const itemsJson = JSON.parse(data)
        //     const itemsArray =itemsJson.music.conct(itemsJson.merch)

        //     let total = 0
        //     req.body.items.forEach(function(item){
        //         const itemsJson = itemsArray.find(function(i){
        //             return i.id ==item.id
        //         })
        //         total =total + itemsJson.price *quantity
        //     })

        //     stripe.charges.create({
        //         amount:total,
        //         source:req.body.stripeTokenId,
        //         currency:'usd'
        //     }).then(function(){
        //         console.log('charge successful')
        //         res.json({message:'Successfully purchased items'})
        //     }).catch(function(){
        //         console.log('charge fail')
        //         res.status(500).end()
        //     })
        // }
    })

})

var port = 3000;
app.listen( port, function(){
    console.log("Server is running...On port" + port);
})
