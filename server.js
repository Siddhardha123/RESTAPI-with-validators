const express = require('express')
const mongoose = require('mongoose')
const UserData = require('./model')
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json())
const mongo = "mongodb+srv://sid123123:sid123123@cluster0.wzjydwy.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongo).then(()=>{
      console.log("database is connected")
}).catch((err)=>{
      console.log(err.message)
})

app.post('/addusers',
        
     body('phone').isLength({ max: 10,min:10 }),
     body('email').isEmail(),
     async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
     try{
         const newData = new UserData({
           username : req.body.username,
           email : req.body.email,
           phone: req.body.phone
         })
         await newData.save()
         return res.json(await UserData.find())
     }catch(err){
        console.log(err.message)
     }
})

app.get('/getusers',async (req,res)=>{
    try{
        const alldata = UserData.find()
        return res.json(await alldata)
    }catch(err){
        console.log(err.message)
    }
})
app.get('/getusers/:id',async (req,res)=>{
    try{
        const alldata = UserData.findById(req.params.id)
        return res.json( await alldata)
    }catch(err){
        console.log(err.message)
    }
})

app.delete('/deleteuser/:id',async (req,res)=>{
   try{
    await UserData.findByIdAndDelete(req.params.id)
    return  res.json(await UserData.find())
   }catch(err){
     console.log(err)
   }
})

app.listen(3000,()=>{
    console.log("server  started!!!")
})



