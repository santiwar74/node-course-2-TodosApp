 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


 var {mongoose} = require('./db/mongoose.js');
 var {ToDo} = require('./models/todo.js');
 var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT ||3000;

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

app.delete('/todos/:id',(req,res)=>{

    var id = req.params.id;
    if(!ObjectID.isValid(id)){
    return res.status(400).send();
    }
    ToDo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        };
        res.send({todo});
    }).catch((e)=>{ res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res)=>{
 var id = req.params.id;
 var body = _.pick(req.body,['text','completed']);

if(!ObjectID.isValid(id)){
    return res.status(400).send();
}

if(_.isBoolean(body.completed) && body.completed)
{
    body.completedAt = new Date().getTime();
}
else{
    body.completed = false;
    body.completedAt = null;
}

ToDo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
}).catch((e)=>{
    res.status(400).send(e);
});

});



app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
});

module.exports ={app}





