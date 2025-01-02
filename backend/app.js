import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.send("index page"); 
})





app.listen(3000);