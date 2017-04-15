 
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


 var {mongoose} = require('./db/mongoose.js');
 var {ToDo} = require('./models/todo.js');
 var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

    var todo = new ToDo({
        text:req.body.text
    })

todo.save().then((doc)=>{
    res.send(doc);
},(e)=>{
    res.status(400).send(e);
});

});

app.get('/todos',(req,res)=>{

    ToDo.find().then((todos)=>{
        res.send({
            todos
        });
    },(e)=>{
 res.status(400).send(e);
    });

});

app.get('/todos/:id',(req,res)=>{

    var id = req.params.id;
    if(!ObjectID.isValid(id)){
    return res.status(400).send();
    }
    ToDo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send({});
        };
        res.send({
            todo
        });
    }).catch((e)=>{ res.status(400).send({});})

});



app.listen(3000,()=>{
    console.log(`Server started at port 3000`)
});

module.exports ={app}





