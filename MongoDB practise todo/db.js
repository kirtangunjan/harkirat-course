const mongoose=require('mongoose');

//schema 
const Schema=mongoose.Schema
//import object id
// const ObjectId=mongoose.ObjectId;

const User=new Schema({
    email:{type:String, unique:true},
    password:String,
    name:String
});

const Todo=new Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    title:String,
    done:Boolean
})


//data model 
const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}