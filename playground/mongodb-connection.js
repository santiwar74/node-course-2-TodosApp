// const MongoClient = require('mongodb').MongoClient;
 const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // db.collection('ToDos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //        return console.log('Insert row failed with error',err)
    //     }
    //    console.log(JSON.stringify(result.ops,undefined,2));
    // });

    db.collection('Users').insertOne({
        Name:'Andy Smith',
        Age:40,
        Location:'Chicago'
    },(err,result)=>{
        if(err){
           return console.log('Insert row failed with error',err)
        }
       console.log(JSON.stringify(result.ops,undefined,2));
    });
    db.close();
});


