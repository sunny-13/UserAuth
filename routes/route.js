const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const userAuthDetails = require('../db/model');


route.post('/',async (req,res)=>{
    try{
        const username=(req.body.username);
        const password=(req.body.password);
        const user= await userAuthDetails.findOne({username:username});
        if(!user){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password, salt);
            await userAuthDetails.create({username:username,password:hashedPassword});
            res.status(200).send('User created');

        }
        else{
            res.status(401).send('Username taken');
        }
    }
    catch(error){
        res.send('failed')
    }
    
})

route.get('/login',async (req,res)=>{
    const username=(req.body.username);
    const password=(req.body.password);
    const user= await userAuthDetails.findOne({username:username});
    if(!user){
        res.status(404).send('User does not exist');
    }
    else{
        bcrypt.compare(password,user.password, (error,result)=>{
            if(error){ res.status(401).send('Something went wrong'); }
            if(result){
                res.status(200).send('Logged in successfully');
            }
            else{
                res.status(402).send('Password is incorrect');
            }
        })
    }
})

module.exports = route;