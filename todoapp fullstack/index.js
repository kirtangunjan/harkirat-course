//require stuffs
const express=require('express');
const jwt=require('jsonwebtoken')
const JWT_SECRET="hello";
const app=express();
const cors = require('cors');
app.use(cors());

//middleware
app.use(express.json())

//middleware auth
function auth(req,res,next){
    const token=req.headers.token;
    const decodedata=jwt.verify(token,JWT_SECRET)
    if(decodedata.username){
        req.username=decodedata.username
        next()
    }
    else{
        res.json({
            message:'you are not logged in'
        })
    }
}










//create a db 
users=[]



app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
//create routes
app.post('/signup',(req,res)=>{
    //take data from the user
    let username=req.body.username;
    let password=req.body.password;

    if(users.find(user=>username===user.username)){
        res.json({
            message:'you are already sign-in'
        })
    }

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:'you are sign-in'
    })
})

app.post('/signin',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const user=users.find(function(user){
        if(username===user.username && password===user.password){
            return true
        }else{
            return false
        }
    })

    if(user){
        let token=jwt.sign({
            username:user.username
        },JWT_SECRET)
        res.json({
            token:token
        })
    }else{
        req.json({
            message:"not found"
        })
    }



})
app.get('/me',auth,(req,res)=>{
    const currentuser=req.username
    let user=users.find(user=>user.username===currentuser)
    if(user){
        res.json({
            username:user.username,
            password:user.password
        })

    }else{
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})




app.listen(3000)