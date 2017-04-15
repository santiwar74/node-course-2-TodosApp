var {mongoose} = require('./../server/db/mongoose.js');
var {ToDo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');

id = "58f24c34970ea7582213a6a4"

ToDo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
       return console.log(`Id not found`);
    };
    console.log(JSON.stringify(todo,undefined,2));
    }).catch((e)=>{console.log(e)});