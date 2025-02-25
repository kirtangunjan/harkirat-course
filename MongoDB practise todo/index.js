const express=require('express');
const jwt=require('jsonwebtoken');
const {UserModel,TodoModel}=require('./db');
const { default: mongoose } = require('mongoose');
const JWT_SECRET='keyiskey';
const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/todos-fullstack-practise");

//middlewares
app.use(express.json());


//routes

//auth routes 
app.post('/sign-up', async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password
    const name=req.body.name
    
    const user=await UserModel.create({
        email:email,
        password:password,
        name:name
    });

    res.json({
        message:'you are logged-in'
    });
});

app.post('/sign-in',async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password

    const user= await UserModel.findOne({
        email:email,
        password:password
    });
    if(user){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:'incorrect credentials'
        })
    } 

});

app.post('/todo',auth,async(req,res)=>{
    const userId=req.userId;
    const title=req.body.title;
    await TodoModel.create({
        userId
    })
    res.json({
        message:'todo created'
    })
});


app.get('/todos',auth,async(req,res)=>{
    const userId=req.userId;
    const todos=await TodoModel.find({
        userId
    })
    res.json({ 
        todos
    })
});




//middleware
function auth(req,res,next){
    const token=req.headers.token;
    const decodeddata=jwt.verify(token,JWT_SECRET);

    if(decodeddata){
        req.userId=decodeddata.id;
        next();
    }else{
        res.status(403).json({
            messsage:'incorrect credentials'
        })
    }
}

app.listen(3000);
