var {mongoose} = require('./../server/db/mongoose.js');
var {ToDo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');

var id ='58f13eeb3173d5b42137bb0b';

User.findById(id).then((user)=>{
    if(!user){
       return console.log(`User not found`);
    };
    console.log(JSON.stringify(user,undefined,2));
    }).catch((e)=>{console.log(e)});