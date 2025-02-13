const express =require('express');
const app=express()


const error=0

function isenoughage(req,res,next){
    const age =req.query.age;
    if(age>=14){
        next();
    }else{
        res.json({
            msg:'sorry you are not allowed'
        });
    }
}


//when we have to apply middleware for the whole app 
//app.use(isenoughage)


app.get('/ride1',isenoughage, function(req,res){
    res.json({
        msg:'you can enter r1'
    });
})

app.get('/ride2',isenoughage, function(req,res){
    res.json({
        msg:'you can enter r2'
    });
})




//error handler middleware -4 argument
app.use(function(err,req,res,next){
    res.status(404).send({})
    error=error+1;
})




app.listen(3000);