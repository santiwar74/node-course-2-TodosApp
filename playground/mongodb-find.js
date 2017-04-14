 const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Users').insertOne({
    //     Name:'Andy Smith',
    //     Age:40,
    //     Location:'Chicago'
    // },(err,result)=>{
    //     if(err){
    //        return console.log('Insert row failed with error',err)
    //     }
    //    console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('ToDos').find().toArray().then((docs)=>{
    //  console.log('Todos');
    //  console.log(docs)
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // })

    db.collection('Users').find({Name:"Sanjay Tiwari"}).count().then((count)=>{
     console.log(`sally count: ${count}`);
    // console.log(docs)
    },(err)=>{
        console.log('Unable to fetch todos',err);
    })


    // db.close();
});

