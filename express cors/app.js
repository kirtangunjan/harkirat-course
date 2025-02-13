const express=require("express");
const app=express();
const cors=require("cors")
app.use(express.json());
app.use(cors())


//want to restrict domain
// app.use(cors({
//     domains:['https://google.com']
// }))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post('/sum',(req,res)=>{
  const a=parseInt(req.body.a);
  const b=parseInt(req.body.b);

  res.json({
    ans:a+b
  });
  
});




app.listen(3001);